"use client";

import { useState } from "react";
import { Clock, User, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { bookingStatusBadge, paymentStatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatThaiCurrency } from "@/lib/utils";
import type { BookingWithServiceAndCustomer } from "@/types";

interface BookingRowProps {
  booking: BookingWithServiceAndCustomer;
  onStatusChange?: (bookingId: string, status: string) => void;
}

export function BookingRow({ booking, onStatusChange }: BookingRowProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
      {/* Main row */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-brand-50 shrink-0">
          <span className="text-xs font-bold text-brand-700">{booking.startTime}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900 truncate">{booking.customer.name}</span>
            {bookingStatusBadge(booking.status)}
          </div>
          <p className="text-sm text-gray-500 truncate">{booking.service.name}</p>
        </div>

        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="text-sm font-semibold text-gray-900">
            {formatThaiCurrency(booking.paymentAmount ?? booking.service.price)}
          </span>
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-400" />
          )}
        </div>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-gray-100 px-4 pb-4 pt-3 space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">เวลา</p>
              <p className="font-medium text-gray-900 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-gray-400" />
                {booking.startTime} – {booking.endTime}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">โทรศัพท์</p>
              <p className="font-medium text-gray-900 flex items-center gap-1">
                <User className="h-3.5 w-3.5 text-gray-400" />
                {booking.customer.phone}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">ชำระเงิน</p>
              <div>{paymentStatusBadge(booking.paymentStatus)}</div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">ราคา</p>
              <p className="font-semibold text-gray-900">
                {formatThaiCurrency(booking.paymentAmount ?? booking.service.price)}
              </p>
            </div>
          </div>

          {booking.note && (
            <div className="flex gap-2 rounded-xl bg-amber-50 px-3 py-2.5">
              <FileText className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">{booking.note}</p>
            </div>
          )}

          {onStatusChange && booking.status === "pending" && (
            <div className="flex gap-2 pt-1">
              <Button
                size="sm"
                onClick={() => onStatusChange(booking.id, "confirmed")}
                className="flex-1"
              >
                ยืนยัน
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onStatusChange(booking.id, "cancelled")}
              >
                ยกเลิก
              </Button>
            </div>
          )}

          {onStatusChange && booking.status === "confirmed" && (
            <div className="flex gap-2 pt-1">
              <Button
                size="sm"
                variant="success"
                onClick={() => onStatusChange(booking.id, "completed")}
                className="flex-1"
              >
                เสร็จสิ้น
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onStatusChange(booking.id, "no_show")}
              >
                ไม่มา
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
