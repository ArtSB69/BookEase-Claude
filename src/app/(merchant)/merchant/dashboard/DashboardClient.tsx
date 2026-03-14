"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarDays, TrendingUp, Clock, ArrowRight, AlertCircle } from "lucide-react";
import { StatsCard } from "@/components/merchant/StatsCard";
import { BookingRow } from "@/components/merchant/BookingRow";
import { Button } from "@/components/ui/button";
import { formatThaiCurrency, formatThaiDate } from "@/lib/utils";
import type { Merchant } from "@/types";
import type { BookingWithServiceAndCustomer } from "@/types";

interface Props {
  merchant: Merchant;
  todayBookings: BookingWithServiceAndCustomer[];
  stats: {
    todayCount: number;
    pendingCount: number;
    monthRevenue: number;
    totalCustomers: number;
  };
}

export function DashboardClient({ merchant, todayBookings: initialBookings, stats }: Props) {
  const [bookings, setBookings] = useState(initialBookings);

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

  const today = new Date();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">สวัสดี 👋</h1>
        <p className="text-gray-500 text-sm mt-0.5">{merchant.name} · {formatThaiDate(today)}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <StatsCard
          label="จองวันนี้"
          value={stats.todayCount}
          icon={CalendarDays}
          color="blue"
        />
        <StatsCard
          label="รอยืนยัน"
          value={stats.pendingCount}
          icon={Clock}
          color={stats.pendingCount > 0 ? "amber" : "default"}
        />
        <StatsCard
          label="รายได้เดือนนี้"
          value={formatThaiCurrency(stats.monthRevenue)}
          icon={TrendingUp}
          color="green"
          sub="การจองที่สำเร็จ"
        />
      </div>

      {/* Pending alert */}
      {stats.pendingCount > 0 && (
        <div className="flex items-center gap-3 rounded-2xl bg-amber-50 border border-amber-100 px-4 py-3">
          <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" />
          <p className="text-sm text-amber-800 flex-1">
            มี <span className="font-semibold">{stats.pendingCount} การจอง</span> รอยืนยัน
          </p>
          <Link href="/merchant/bookings?status=pending">
            <Button size="sm" className="bg-amber-500 hover:bg-amber-600 shrink-0">ดูเลย</Button>
          </Link>
        </div>
      )}

      {/* Today's bookings */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-900">
            การจองวันนี้ ({bookings.length})
          </h2>
          <Link href="/merchant/bookings" className="flex items-center gap-1 text-sm text-brand-600 font-medium">
            ทั้งหมด
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white py-12 text-center">
            <CalendarDays className="mx-auto h-10 w-10 text-gray-300 mb-3" />
            <p className="text-gray-500 text-sm">ยังไม่มีการจองวันนี้</p>
            <Link href="/merchant/share" className="mt-3 inline-block">
              <Button size="sm" variant="outline">แชร์ลิงก์จอง</Button>
            </Link>
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

      {/* Quick links */}
      {!merchant.isPublished && (
        <div className="rounded-2xl border-2 border-dashed border-brand-200 bg-brand-50 p-5">
          <p className="font-semibold text-brand-900">ร้านยังไม่ได้เผยแพร่</p>
          <p className="text-sm text-brand-700 mt-1">เผยแพร่ร้านเพื่อให้ลูกค้าจองได้</p>
          <Link href="/merchant/settings">
            <Button size="sm" className="mt-3">ตั้งค่าและเผยแพร่</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
