"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BUSINESS_TYPES, WORK_DAYS } from "@/lib/constants";
import { CheckCircle2 } from "lucide-react";
import type { Merchant } from "@/types";

interface Props {
  merchant: Merchant;
}

export function SettingsClient({ merchant: initial }: Props) {
  const [merchant, setMerchant] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const update = (field: string, value: unknown) => {
    setMerchant((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const toggleWorkDay = (day: string) => {
    const current = merchant.workDays;
    const next = current.includes(day)
      ? current.filter((d) => d !== day)
      : [...current, day];
    update("workDays", next);
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(`/api/merchants/${merchant.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: merchant.name,
        businessType: merchant.businessType,
        phone: merchant.phone,
        email: merchant.email,
        address: merchant.address,
        description: merchant.description,
        openTime: merchant.openTime,
        closeTime: merchant.closeTime,
        workDays: merchant.workDays,
        isPublished: merchant.isPublished,
      }),
    });
    if (res.ok) {
      const updated = await res.json();
      setMerchant(updated);
      setSaved(true);
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6 max-w-lg">
      <h1 className="text-xl font-bold text-gray-900">ตั้งค่าร้าน</h1>

      {/* Status */}
      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4">
        <div>
          <p className="font-semibold text-gray-900">สถานะร้าน</p>
          <p className="text-sm text-gray-500">
            {merchant.isPublished ? "เปิดให้ลูกค้าจองได้แล้ว" : "ร้านยังไม่เผยแพร่"}
          </p>
        </div>
        <button
          onClick={() => update("isPublished", !merchant.isPublished)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            merchant.isPublished ? "bg-brand-600" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
              merchant.isPublished ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Shop info */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-4">
        <h2 className="font-semibold text-gray-900">ข้อมูลร้าน</h2>

        <Input
          label="ชื่อร้าน"
          value={merchant.name}
          onChange={(e) => update("name", e.target.value)}
          required
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">ประเภทธุรกิจ</label>
          <select
            value={merchant.businessType}
            onChange={(e) => update("businessType", e.target.value)}
            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {BUSINESS_TYPES.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <Input
          label="เบอร์โทรศัพท์"
          type="tel"
          value={merchant.phone}
          onChange={(e) => update("phone", e.target.value)}
          required
        />
        <Input
          label="อีเมล (ไม่บังคับ)"
          type="email"
          value={merchant.email ?? ""}
          onChange={(e) => update("email", e.target.value)}
        />
        <Input
          label="ที่อยู่"
          value={merchant.address ?? ""}
          onChange={(e) => update("address", e.target.value)}
        />
        <Textarea
          label="แนะนำร้าน"
          value={merchant.description ?? ""}
          onChange={(e) => update("description", e.target.value)}
        />
      </div>

      {/* Hours */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-4">
        <h2 className="font-semibold text-gray-900">เวลาทำการ</h2>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="เปิด"
            type="time"
            value={merchant.openTime}
            onChange={(e) => update("openTime", e.target.value)}
          />
          <Input
            label="ปิด"
            type="time"
            value={merchant.closeTime}
            onChange={(e) => update("closeTime", e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">วันทำการ</label>
          <div className="flex gap-2 flex-wrap">
            {WORK_DAYS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => toggleWorkDay(value)}
                className={`h-9 w-9 rounded-full text-sm font-medium transition-colors ${
                  merchant.workDays.includes(value)
                    ? "bg-brand-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="flex items-center gap-3">
        <Button size="lg" onClick={handleSave} disabled={saving} className="flex-1">
          {saving ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}
        </Button>
        {saved && (
          <div className="flex items-center gap-1.5 text-emerald-600 text-sm font-medium">
            <CheckCircle2 className="h-4 w-4" />
            บันทึกแล้ว
          </div>
        )}
      </div>
    </div>
  );
}
