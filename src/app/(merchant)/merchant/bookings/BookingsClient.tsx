"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { BookingRow } from "@/components/merchant/BookingRow";
import { Button } from "@/components/ui/button";
import { formatThaiDate, formatThaiDateShort } from "@/lib/utils";
import type { BookingWithServiceAndCustomer } from "@/types";

interface Props {
  bookings: BookingWithServiceAndCustomer[];
  initialDate: string;
  initialStatus?: string;
  merchantId: string;
}

export function BookingsClient({ bookings: initialBookings, initialDate, initialStatus, merchantId }: Props) {
  const router = useRouter();
  const [bookings, setBookings] = useState(initialBookings);
  const [currentDate, setCurrentDate] = useState(initialDate);

  const navigateDate = (direction: -1 | 1) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + direction);
    const newDate = d.toISOString().split("T")[0];
    setCurrentDate(newDate);
    router.push(`/merchant/bookings?date=${newDate}`);
  };

  const setToday = () => {
    const today = new Date().toISOString().split("T")[0];
    setCurrentDate(today);
    router.push(`/merchant/bookings?date=${today}`);
  };

  const handleStatusChange = async (bookingId: string, status: string) => {
    const res = await fetch(`/api/bookings/${bookingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const updated = await res.json();
      setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, ...updated } : b)));
    }
  };

  const todayStr = new Date().toISOString().split("T")[0];
  const isToday = currentDate === todayStr;

  // Group by status for summary
  const pending = bookings.filter((b) => b.status === "pending").length;
  const confirmed = bookings.filter((b) => b.status === "confirmed").length;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">การจอง</h1>
        {!isToday && (
          <Button size="sm" variant="outline" onClick={setToday}>
            วันนี้
          </Button>
        )}
      </div>

      {/* Date navigator */}
      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-3">
        <button
          onClick={() => navigateDate(-1)}
          className="rounded-xl p-2 hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="text-center">
          <p className="font-semibold text-gray-900">{formatThaiDate(currentDate)}</p>
          {isToday && <p className="text-xs text-brand-600 font-medium">วันนี้</p>}
        </div>

        <button
          onClick={() => navigateDate(1)}
          className="rounded-xl p-2 hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Summary pills */}
      {bookings.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
            ทั้งหมด {bookings.length}
          </span>
          {pending > 0 && (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
              รอยืนยัน {pending}
            </span>
          )}
          {confirmed > 0 && (
            <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-700">
              ยืนยันแล้ว {confirmed}
            </span>
          )}
        </div>
      )}

      {/* Bookings list */}
      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white py-16 text-center">
          <CalendarDays className="mx-auto h-12 w-12 text-gray-200 mb-4" />
          <p className="text-gray-500">ไม่มีการจองในวันนี้</p>
          <p className="text-sm text-gray-400 mt-1">เลื่อนดูวันอื่น หรือแชร์ลิงก์ให้ลูกค้าจอง</p>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking) => (
            <BookingRow
              key={booking.id}
              booking={booking}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
