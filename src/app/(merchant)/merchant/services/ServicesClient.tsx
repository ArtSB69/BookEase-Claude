"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Clock, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { formatThaiCurrency, formatDuration } from "@/lib/utils";
import type { Service } from "@/types";

interface Props {
  services: Service[];
  merchantId: string;
}

interface ServiceForm {
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  category: string;
  isActive: boolean;
}

const blank: ServiceForm = {
  name: "", description: "", durationMinutes: 60, price: 0, category: "", isActive: true,
};

export function ServicesClient({ services: initial, merchantId }: Props) {
  const [services, setServices] = useState(initial);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState<ServiceForm>(blank);
  const [saving, setSaving] = useState(false);

  const openNew = () => { setEditing(null); setForm(blank); setOpen(true); };
  const openEdit = (svc: Service) => {
    setEditing(svc);
    setForm({
      name: svc.name,
      description: svc.description ?? "",
      durationMinutes: svc.durationMinutes,
      price: svc.price,
      category: svc.category ?? "",
      isActive: svc.isActive,
    });
    setOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || form.price < 0) return;
    setSaving(true);

    if (editing) {
      const res = await fetch(`/api/services/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const updated = await res.json();
        setServices((prev) => prev.map((s) => (s.id === editing.id ? updated : s)));
      }
    } else {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, merchantId, sortOrder: services.length }),
      });
      if (res.ok) {
        const created = await res.json();
        setServices((prev) => [...prev, created]);
      }
    }
    setSaving(false);
    setOpen(false);
  };

  const handleToggle = async (svc: Service) => {
    const res = await fetch(`/api/services/${svc.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !svc.isActive }),
    });
    if (res.ok) {
      const updated = await res.json();
      setServices((prev) => prev.map((s) => (s.id === svc.id ? updated : s)));
    }
  };

  const handleDelete = async (svc: Service) => {
    if (!confirm(`ลบบริการ "${svc.name}"?`)) return;
    const res = await fetch(`/api/services/${svc.id}`, { method: "DELETE" });
    if (res.ok) {
      setServices((prev) => prev.filter((s) => s.id !== svc.id));
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">บริการ ({services.length})</h1>
        <Button size="sm" onClick={openNew}>
          <Plus className="h-4 w-4" />
          เพิ่มบริการ
        </Button>
      </div>

      {services.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white py-16 text-center">
          <p className="text-gray-500 mb-3">ยังไม่มีบริการ</p>
          <Button size="sm" onClick={openNew}>
            <Plus className="h-4 w-4" />
            เพิ่มบริการแรก
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {services.map((svc) => (
            <div
              key={svc.id}
              className={`rounded-2xl border bg-white p-4 flex items-start gap-4 ${
                svc.isActive ? "border-gray-100" : "border-gray-100 opacity-60"
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900 truncate">{svc.name}</p>
                  {!svc.isActive && (
                    <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">
                      ปิด
                    </span>
                  )}
                </div>
                {svc.description && (
                  <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{svc.description}</p>
                )}
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-900">
                    {formatThaiCurrency(svc.price)}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    {formatDuration(svc.durationMinutes)}
                  </span>
                  {svc.category && (
                    <span className="text-xs text-gray-400 bg-gray-50 rounded-full px-2 py-0.5">
                      {svc.category}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleToggle(svc)}
                  className="rounded-lg p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 transition-colors"
                  title={svc.isActive ? "ปิดบริการ" : "เปิดบริการ"}
                >
                  {svc.isActive ? <ToggleRight className="h-5 w-5 text-brand-600" /> : <ToggleLeft className="h-5 w-5" />}
                </button>
                <button
                  onClick={() => openEdit(svc)}
                  className="rounded-lg p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(svc)}
                  className="rounded-lg p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "แก้ไขบริการ" : "เพิ่มบริการ"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              label="ชื่อบริการ"
              placeholder="เช่น ตัดผม + จัดทรง"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <Textarea
              label="รายละเอียด (ไม่บังคับ)"
              placeholder="อธิบายบริการโดยย่อ"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="ราคา (บาท)"
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                required
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">ระยะเวลา</label>
                <select
                  value={form.durationMinutes}
                  onChange={(e) => setForm({ ...form, durationMinutes: Number(e.target.value) })}
                  className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {[15,30,45,60,90,120,150,180,240,300,360].map((m) => (
                    <option key={m} value={m}>
                      {m < 60 ? `${m} นาที` : `${Math.floor(m/60)} ชม.${m%60>0?` ${m%60} นาที`:""}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Input
              label="หมวดหมู่ (ไม่บังคับ)"
              placeholder="เช่น ตัดผม, ทำสี"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>

          <div className="flex gap-3 mt-5">
            <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>
              ยกเลิก
            </Button>
            <Button className="flex-1" onClick={handleSave} disabled={saving || !form.name}>
              {saving ? "กำลังบันทึก..." : "บันทึก"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
