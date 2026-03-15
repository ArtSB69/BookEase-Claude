import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ServiceCard } from "@/components/booking/ServiceCard";
import {
  MapPin,
  Phone,
  Clock,
  Star,
  CalendarPlus,
  ChevronRight,
} from "lucide-react";
import { formatThaiCurrency, formatDuration, getBusinessTypeLabel } from "@/lib/utils";
import type { Metadata } from "next";
import { StorefrontClient } from "./StorefrontClient";

export async function generateMetadata(props: any): Promise<Metadata> {
  const { params } = props as { params: { slug: string } };
  const merchant = await prisma.merchant.findUnique({ where: { slug: params.slug } });
  if (!merchant) return { title: "ไม่พบร้าน" };
  return {
    title: merchant.name,
    description: merchant.description ?? `จองบริการที่ ${merchant.name}`,
  };
}

export default async function StorefrontPage(props: any) {
  const { params } = props as { params: { slug: string } };
  const merchant = await prisma.merchant.findUnique({
    where: { slug: params.slug, isPublished: true },
    include: {
      services: {
        where: { isActive: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      },
    },
  });

  if (!merchant) notFound();

  // Group services by category
  const categories = Array.from(new Set(merchant.services.map((s) => s.category ?? "บริการ")));

  const isOpen = (() => {
    const now = new Date();
    const dayMap = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const today = dayMap[now.getDay()];
    if (!merchant.workDays.includes(today)) return false;
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const [oh, om] = merchant.openTime.split(":").map(Number);
    const [ch, cm] = merchant.closeTime.split(":").map(Number);
    return currentMinutes >= oh * 60 + om && currentMinutes < ch * 60 + cm;
  })();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover image */}
      <div className="relative h-52 sm:h-64 md:h-72 bg-gradient-to-br from-navy-700 via-navy-800 to-cyan-500">
        {merchant.coverImageUrl && (
          <Image
            src={merchant.coverImageUrl}
            alt={merchant.name}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Shop identity card */}
      <div className="mx-auto max-w-xl px-4">
        <div className="-mt-16 relative z-10 rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
          <div className="flex items-start gap-4">
            {/* Logo */}
            <div className="relative h-16 w-16 shrink-0 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              {merchant.logoUrl ? (
                <Image src={merchant.logoUrl} alt={merchant.name} fill className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-brand-50">
                  <span className="text-2xl font-bold text-brand-600">
                    {merchant.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h1 className="text-xl font-bold text-gray-900 leading-tight">{merchant.name}</h1>
                  <p className="text-sm text-gray-500">{getBusinessTypeLabel(merchant.businessType)}</p>
                </div>
                <Badge variant={isOpen ? "success" : "secondary"} className="shrink-0 mt-0.5">
                  {isOpen ? "เปิดอยู่" : "ปิดแล้ว"}
                </Badge>
              </div>

              <div className="mt-2.5 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-medium text-gray-700">4.9</span>
                  <span>(128)</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3.5 w-3.5" />
                  {merchant.openTime}–{merchant.closeTime}
                </div>
              </div>
            </div>
          </div>

          {merchant.description && (
            <p className="mt-4 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
              {merchant.description}
            </p>
          )}

          <div className="mt-3 flex flex-col gap-2">
            {merchant.address && (
              <div className="flex items-start gap-2 text-xs text-gray-500">
                <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                <span>{merchant.address}</span>
              </div>
            )}
            {merchant.phone && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Phone className="h-3.5 w-3.5 shrink-0" />
                <span>{merchant.phone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Services */}
        <div className="mt-6 pb-28">
          {merchant.services.length === 0 ? (
            <div className="text-center py-12 text-gray-400">ยังไม่มีบริการ</div>
          ) : (
            <StorefrontClient merchant={merchant} categories={categories} />
          )}
        </div>
      </div>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100 p-4">
        <div className="mx-auto max-w-xl">
          <Link href={`/${params.slug}/book`}>
            <Button size="lg" className="w-full text-base">
              <CalendarPlus className="h-5 w-5" />
              จองบริการ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
