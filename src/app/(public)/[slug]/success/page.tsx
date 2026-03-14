import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { CheckCircle2, CalendarDays, Clock, ArrowLeft, Share2 } from "lucide-react";
import { formatThaiCurrency, formatThaiDate, formatDuration } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "จองสำเร็จ" };

export default async function SuccessPage(props: any) {
  const { params, searchParams } = props as {
    params: { slug: string };
    searchParams: { bookingId?: string };
  };
  if (!searchParams.bookingId) notFound();

  const booking = await prisma.booking.findUnique({
    where: { id: searchParams.bookingId },
    include: { service: true, customer: true, merchant: true },
  });

  if (!booking || booking.merchant.slug !== params.slug) notFound();

  const endTime = (() => {
    const [h, m] = booking.startTime.split(":").map(Number);
    const total = h * 60 + m + booking.service.durationMinutes;
    return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
  })();

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-12 px-4">
      <div className="w-full max-w-sm text-center">
        {/* Success icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-10 w-10 text-emerald-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900">จองสำเร็จ!</h1>
        <p className="mt-2 text-gray-500">
          เราได้รับการจองของคุณแล้ว<br />
          ทางร้านจะติดต่อยืนยันอีกครั้ง
        </p>

        {/* Booking summary card */}
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 text-left space-y-4">
          <div>
            <p className="text-xs text-gray-500">ร้าน</p>
            <p className="font-semibold text-gray-900">{booking.merchant.name}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">บริการ</p>
            <p className="font-semibold text-gray-900">{booking.service.name}</p>
            <p className="text-sm text-gray-500">{formatDuration(booking.service.durationMinutes)}</p>
          </div>

          <div className="flex items-start gap-2">
            <CalendarDays className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-gray-500">วันนัด</p>
              <p className="font-medium text-gray-900">{formatThaiDate(booking.bookingDate)}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-gray-500">เวลา</p>
              <p className="font-medium text-gray-900">{booking.startTime}–{endTime} น.</p>
            </div>
          </div>

          <div className="border-t border-gray-50 pt-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">ยอดชำระ</p>
            <p className="text-lg font-bold text-gray-900">
              {formatThaiCurrency(booking.paymentAmount ?? booking.service.price)}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <Link href={`/${params.slug}`}>
            <Button variant="outline" className="w-full">
              <ArrowLeft className="h-4 w-4" />
              กลับหน้าร้าน
            </Button>
          </Link>
          <Link href="/account/bookings">
            <Button variant="ghost" className="w-full text-gray-500">
              ดูการจองทั้งหมดของฉัน
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          หมายเลขการจอง: {booking.id.slice(-8).toUpperCase()}
        </p>
      </div>
    </div>
  );
}
