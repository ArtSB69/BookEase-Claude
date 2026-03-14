import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatThaiCurrency(amount: number): string {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatThaiDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

export function formatThaiDateShort(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("th-TH", {
    month: "short",
    day: "numeric",
  }).format(d);
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} นาที`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (m === 0) return `${h} ชั่วโมง`;
  return `${h} ชม. ${m} นาที`;
}

export function generateTimeSlots(
  openTime: string,
  closeTime: string,
  durationMinutes: number,
  step = 30
): string[] {
  const slots: string[] = [];
  const [openH, openM] = openTime.split(":").map(Number);
  const [closeH, closeM] = closeTime.split(":").map(Number);

  const startMinutes = openH * 60 + openM;
  const endMinutes = closeH * 60 + closeM - durationMinutes;

  for (let m = startMinutes; m <= endMinutes; m += step) {
    const h = Math.floor(m / 60);
    const min = m % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`);
  }

  return slots;
}

export function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + minutes;
  const newH = Math.floor(total / 60) % 24;
  const newM = total % 60;
  return `${String(newH).padStart(2, "0")}:${String(newM).padStart(2, "0")}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export function getBookingStatusLabel(status: string): string {
  const map: Record<string, string> = {
    pending: "รอยืนยัน",
    confirmed: "ยืนยันแล้ว",
    completed: "เสร็จสิ้น",
    cancelled: "ยกเลิก",
    no_show: "ไม่มา",
  };
  return map[status] ?? status;
}

export function getPaymentStatusLabel(status: string): string {
  const map: Record<string, string> = {
    unpaid: "ยังไม่ชำระ",
    pending: "รอชำระ",
    paid: "ชำระแล้ว",
    refunded: "คืนเงินแล้ว",
    failed: "ชำระไม่สำเร็จ",
  };
  return map[status] ?? status;
}

export function getBusinessTypeLabel(type: string): string {
  const map: Record<string, string> = {
    salon: "ร้านเสริมสวย",
    clinic: "คลินิกความงาม",
    spa: "สปา",
    barber: "ร้านตัดผมชาย",
    wellness: "เวลเนส",
    beauty: "บิวตี้",
    massage: "นวด",
    nail: "ทำเล็บ",
    other: "อื่นๆ",
  };
  return map[type] ?? type;
}
