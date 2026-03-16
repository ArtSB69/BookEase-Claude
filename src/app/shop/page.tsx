import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBusinessTypeLabel } from "@/lib/utils";
import { Clock, MapPin, Store, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ร้านค้าทั้งหมด | BookEase",
  description: "ค้นหาและจองบริการจากร้านที่ใช้ BookEase ทั่วประเทศไทย",
};

export const dynamic = "force-dynamic";

interface SearchParams {
  type?: string;
}

export default async function ShopPage(props: { searchParams: Promise<SearchParams> }) {
  const searchParams = await props.searchParams;
  const selectedType = searchParams.type ?? "";

  const merchants = await prisma.merchant.findMany({
    where: {
      isPublished: true,
      ...(selectedType ? { businessType: selectedType as any } : {}),
    },
    include: {
      services: {
        where: { isActive: true },
        select: { id: true, price: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const businessTypes = await prisma.merchant.groupBy({
    by: ["businessType"],
    where: { isPublished: true },
    _count: true,
    orderBy: { _count: { businessType: "desc" } },
  });

  const isOpen = (merchant: { workDays: string[]; openTime: string; closeTime: string }) => {
    const now = new Date();
    const dayMap = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const today = dayMap[now.getDay()];
    if (!merchant.workDays.includes(today)) return false;
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const [oh, om] = merchant.openTime.split(":").map(Number);
    const [ch, cm] = merchant.closeTime.split(":").map(Number);
    return currentMinutes >= oh * 60 + om && currentMinutes < ch * 60 + cm;
  };

  const minPrice = (services: { price: number }[]) => {
    if (services.length === 0) return null;
    return Math.min(...services.map((s) => s.price));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <BrandLogo withLink size="sm" />
          <div className="flex items-center gap-2">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">เข้าสู่ระบบ</Button>
            </Link>
            <Link href="/merchant/onboarding">
              <Button size="sm">เปิดร้านฟรี</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* Hero */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-navy-950 md:text-4xl">
            ค้นหาร้านและจองบริการ
          </h1>
          <p className="mt-2 text-gray-500">
            ร้านค้าที่ใช้ BookEase ทั้งหมด {merchants.length} ร้าน
          </p>
        </div>

        {/* Filter by business type */}
        <div className="mb-6 flex flex-wrap gap-2">
          <Link href="/shop">
            <button
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                !selectedType
                  ? "bg-navy-900 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-navy-300"
              }`}
            >
              ทั้งหมด
            </button>
          </Link>
          {businessTypes.map(({ businessType, _count }) => (
            <Link key={businessType} href={`/shop?type=${businessType}`}>
              <button
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedType === businessType
                    ? "bg-navy-900 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-navy-300"
                }`}
              >
                {getBusinessTypeLabel(businessType)} ({_count.businessType})
              </button>
            </Link>
          ))}
        </div>

        {/* Merchant grid */}
        {merchants.length === 0 ? (
          <div className="py-20 text-center text-gray-400">
            <Store className="mx-auto mb-3 h-10 w-10 opacity-30" />
            <p>ไม่พบร้านในหมวดหมู่นี้</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {merchants.map((merchant) => {
              const open = isOpen(merchant);
              const startingPrice = minPrice(merchant.services);
              return (
                <Link
                  key={merchant.id}
                  href={`/${merchant.slug}`}
                  className="group block rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  {/* Cover */}
                  <div className="relative h-36 overflow-hidden rounded-t-2xl bg-gradient-to-br from-navy-700 via-navy-800 to-cyan-500">
                    {merchant.coverImageUrl && (
                      <Image
                        src={merchant.coverImageUrl}
                        alt={merchant.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <Badge variant={open ? "success" : "secondary"} className="text-xs">
                        {open ? "เปิดอยู่" : "ปิดแล้ว"}
                      </Badge>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      {/* Logo */}
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                        {merchant.logoUrl ? (
                          <Image src={merchant.logoUrl} alt={merchant.name} fill className="object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-navy-50">
                            <span className="text-lg font-bold text-navy-700">
                              {merchant.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h2 className="truncate font-bold text-gray-900">{merchant.name}</h2>
                        <p className="text-xs text-gray-500">
                          {getBusinessTypeLabel(merchant.businessType)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {merchant.openTime}–{merchant.closeTime}
                      </span>
                      {merchant.address && (
                        <span className="flex items-center gap-1 truncate">
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{merchant.address}</span>
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {merchant.services.length} บริการ
                        {startingPrice !== null && (
                          <> · เริ่ม ฿{startingPrice.toLocaleString()}</>
                        )}
                      </span>
                      <span className="flex items-center gap-0.5 text-xs font-medium text-cyan-700 group-hover:underline">
                        ดูร้าน <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>

      <footer className="mt-12 border-t border-gray-100 bg-white py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:text-left">
          <BrandLogo withLink size="sm" />
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} BookEase by Atiz · ระบบรับจองสำหรับธุรกิจบริการในไทย
          </p>
        </div>
      </footer>
    </div>
  );
}
