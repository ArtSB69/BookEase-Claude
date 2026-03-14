"use client";

import Link from "next/link";
import { ArrowLeft, CreditCard } from "lucide-react";

export default function PaymentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/account">
          <button className="rounded-xl p-2 hover:bg-gray-100 text-gray-500">
            <ArrowLeft className="h-5 w-5" />
          </button>
        </Link>
        <h1 className="text-xl font-bold text-gray-900">ประวัติการชำระ</h1>
      </div>

      <div className="text-center py-16">
        <CreditCard className="mx-auto h-12 w-12 text-gray-200 mb-4" />
        <p className="text-gray-500">ยังไม่มีประวัติการชำระ</p>
        <p className="text-sm text-gray-400 mt-1">การชำระเงินจะแสดงที่นี่</p>
      </div>
    </div>
  );
}
