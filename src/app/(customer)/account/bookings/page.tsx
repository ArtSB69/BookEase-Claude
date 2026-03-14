"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, ArrowLeft, Clock } from "lucide-react";
import { bookingStatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { formatThaiDate, formatThaiCurrency } from "@/lib/utils";

interface BookingItem {
  id: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  status: string;
  paymentAmount?: number;
  service: { name: string; price: number };
  merchant: { name: string; slug: string };
}

export default function CustomerBookingsPage() {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/customers/bookings")
      .then((r) => r.json())
      .then((data) => {
        setBookings(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/account">
          <button className="rounded-xl p-2 hover:bg-gray-100 text-gray-500">
            <ArrowLeft className="h-5 w-5" />
          </button>
        </Link>
        <h1 className="text-xl font-bold text-gray-900">การจองของฉัน</h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-16">
          <CalendarDays className="mx-auto h-12 w-12 text-gray-200 mb-4" />
          <p className="text-gray-500">ยังไม่มีประวัติการจอง</p>
          <p className="text-sm text-gray-400 mt-1">เลือกบริการและจองได้เลย</p>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-2xl border border-gray-100 bg-white p-4"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-semibold text-gray-900">{booking.service.name}</p>
                  <p className="text-sm text-gray-500">{booking.merchant.name}</p>
                </div>
                {bookingStatusBadge(booking.status)}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {formatThaiDate(booking.bookingDate)}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {booking.startTime} น.
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <p className="font-semibold text-gray-900">
                  {formatThaiCurrency(booking.paymentAmount ?? booking.service.price)}
                </p>
                <Link href={`/${booking.merchant.slug}`}>
                  <Button size="sm" variant="outline">จองอีกครั้ง</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
