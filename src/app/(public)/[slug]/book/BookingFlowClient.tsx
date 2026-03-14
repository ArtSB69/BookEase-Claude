"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Clock, CalendarDays, User, ChevronRight, CheckCircle2 } from "lucide-react";
import type { Merchant, Service } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ServiceCard } from "@/components/booking/ServiceCard";
import { TimeSlotPicker } from "@/components/booking/TimeSlotPicker";
import {
  formatThaiCurrency,
  formatDuration,
  formatThaiDate,
  generateTimeSlots,
  addMinutes,
} from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

interface Props {
  merchant: Merchant & { services: Service[] };
  services: Service[];
  preSelectedService: Service | null;
}

type Step = "service" | "datetime" | "details" | "confirm";

const STEPS: { key: Step; label: string }[] = [
  { key: "service", label: "เลือกบริการ" },
  { key: "datetime", label: "วัน-เวลา" },
  { key: "details", label: "ข้อมูล" },
  { key: "confirm", label: "ยืนยัน" },
];

export function BookingFlowClient({ merchant, services, preSelectedService }: Props) {
  const router = useRouter();

  const [step, setStep] = useState<Step>(preSelectedService ? "datetime" : "service");
  const [selectedService, setSelectedService] = useState<Service | null>(preSelectedService);
  const [bookingDate, setBookingDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentStepIndex = STEPS.findIndex((s) => s.key === step);

  const timeSlots = selectedService
    ? generateTimeSlots(merchant.openTime, merchant.closeTime, selectedService.durationMinutes)
    : [];

  const todayStr = new Date().toISOString().split("T")[0];
  const endTime = selectedService && startTime
    ? addMinutes(startTime, selectedService.durationMinutes)
    : "";

  const goBack = () => {
    const idx = currentStepIndex;
    if (idx === 0) {
      router.push(`/${merchant.slug}`);
    } else {
      setStep(STEPS[idx - 1].key);
    }
  };

  const validateDetails = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "กรุณาใส่ชื่อ";
    if (!phone.trim() || !/^[0-9]{9,10}$/.test(phone.replace(/\s/g, ""))) {
      e.phone = "กรุณาใส่เบอร์โทรที่ถูกต้อง";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!selectedService || !bookingDate || !startTime || !name || !phone) return;
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          merchantId: merchant.id,
          serviceId: selectedService.id,
          bookingDate,
          startTime,
          endTime,
          customerName: name,
          customerPhone: phone,
          customerEmail: email,
          note,
        }),
      });

      if (!res.ok) throw new Error("Booking failed");
      const data = await res.json();
      router.push(`/${merchant.slug}/success?bookingId=${data.id}`);
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-xl px-4 py-4">
          <div className="flex items-center gap-3">
            <button onClick={goBack} className="rounded-xl p-2 hover:bg-gray-100 text-gray-500 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-sm font-bold text-gray-900">{merchant.name}</h1>
              <p className="text-xs text-gray-500">จองบริการ</p>
            </div>
          </div>

          {/* Step indicator */}
          <div className="mt-3 flex items-center gap-1">
            {STEPS.map(({ key, label }, i) => (
              <div key={key} className="flex items-center gap-1 flex-1">
                <div className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  i < currentStepIndex ? "bg-brand-600 text-white" :
                  i === currentStepIndex ? "bg-brand-600 text-white ring-2 ring-brand-200" :
                  "bg-gray-100 text-gray-400"
                }`}>
                  {i < currentStepIndex ? <CheckCircle2 className="h-3.5 w-3.5" /> : i + 1}
                </div>
                <span className={`text-xs hidden sm:block ${i === currentStepIndex ? "text-brand-600 font-medium" : "text-gray-400"}`}>
                  {label}
                </span>
                {i < STEPS.length - 1 && <div className="flex-1 h-px bg-gray-200 mx-1" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-xl px-4 py-6">
        {/* Step 1: Select service */}
        {step === "service" && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-lg font-bold text-gray-900">เลือกบริการ</h2>
            <div className="space-y-3">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onSelect={(s) => {
                    setSelectedService(s);
                    setStartTime("");
                    setStep("datetime");
                  }}
                  selected={selectedService?.id === service.id}
                />
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Date & Time */}
        {step === "datetime" && selectedService && (
          <div className="space-y-5 animate-fade-in">
            <div className="rounded-2xl bg-brand-50 border border-brand-100 p-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 shrink-0">
                <Clock className="h-5 w-5 text-brand-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{selectedService.name}</p>
                <p className="text-sm text-gray-500">
                  {formatDuration(selectedService.durationMinutes)} · {formatThaiCurrency(selectedService.price)}
                </p>
              </div>
              <button
                onClick={() => { setStep("service"); setSelectedService(null); }}
                className="ml-auto text-xs text-brand-600 font-medium"
              >
                เปลี่ยน
              </button>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">เลือกวัน</h2>
              <Input
                type="date"
                label="วันที่ต้องการนัด"
                min={todayStr}
                value={bookingDate}
                onChange={(e) => { setBookingDate(e.target.value); setStartTime(""); }}
                required
              />
            </div>

            {bookingDate && (
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-3">
                  เลือกเวลา · {formatThaiDate(bookingDate)}
                </h2>
                <TimeSlotPicker
                  slots={timeSlots}
                  selected={startTime}
                  onSelect={setStartTime}
                />
              </div>
            )}

            <Button
              size="lg"
              className="w-full"
              disabled={!bookingDate || !startTime}
              onClick={() => setStep("details")}
            >
              ถัดไป
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Step 3: Customer details */}
        {step === "details" && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="text-lg font-bold text-gray-900">ข้อมูลผู้จอง</h2>
            <div className="space-y-4">
              <Input
                label="ชื่อ-นามสกุล"
                placeholder="สมชาย รักดี"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
                required
              />
              <Input
                label="เบอร์โทรศัพท์"
                type="tel"
                placeholder="0812345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={errors.phone}
                required
              />
              <Input
                label="อีเมล (ไม่บังคับ)"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Textarea
                label="บันทึกเพิ่มเติม (ไม่บังคับ)"
                placeholder="เช่น ต้องการทรงผมแบบใด หรือมีอาการแพ้อะไร"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <Button
              size="lg"
              className="w-full"
              onClick={() => { if (validateDetails()) setStep("confirm"); }}
            >
              ถัดไป
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Step 4: Confirm */}
        {step === "confirm" && selectedService && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="text-lg font-bold text-gray-900">ยืนยันการจอง</h2>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-4">
              <div className="pb-4 border-b border-gray-50">
                <p className="text-xs text-gray-500 mb-1">บริการ</p>
                <p className="font-semibold text-gray-900">{selectedService.name}</p>
                <p className="text-sm text-gray-500">{formatDuration(selectedService.durationMinutes)}</p>
              </div>

              <div className="pb-4 border-b border-gray-50 flex items-start gap-2">
                <CalendarDays className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">วัน-เวลา</p>
                  <p className="font-medium text-gray-900">
                    {formatThaiDate(bookingDate)} เวลา {startTime}–{endTime} น.
                  </p>
                </div>
              </div>

              <div className="pb-4 border-b border-gray-50 flex items-start gap-2">
                <User className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">ผู้จอง</p>
                  <p className="font-medium text-gray-900">{name}</p>
                  <p className="text-sm text-gray-500">{phone}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">ยอดรวม</p>
                <p className="text-xl font-bold text-gray-900">{formatThaiCurrency(selectedService.price)}</p>
              </div>

              {note && (
                <div className="rounded-xl bg-gray-50 px-3 py-2.5 text-sm text-gray-600">
                  หมายเหตุ: {note}
                </div>
              )}
            </div>

            <p className="text-center text-xs text-gray-500">
              การยืนยันจะส่งผ่านทางโทรศัพท์ที่คุณกรอก
            </p>

            <Button
              size="lg"
              className="w-full"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" className="border-white border-t-transparent" />
                  กำลังส่งการจอง...
                </>
              ) : (
                "ยืนยันการจอง"
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
