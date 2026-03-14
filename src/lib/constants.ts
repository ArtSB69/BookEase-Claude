export const BUSINESS_TYPES = [
  { value: "salon", label: "ร้านเสริมสวย" },
  { value: "clinic", label: "คลินิกความงาม" },
  { value: "spa", label: "สปา" },
  { value: "barber", label: "ร้านตัดผมชาย" },
  { value: "wellness", label: "เวลเนส" },
  { value: "beauty", label: "บิวตี้" },
  { value: "massage", label: "นวด" },
  { value: "nail", label: "ทำเล็บ" },
  { value: "other", label: "อื่นๆ" },
] as const;

export const BOOKING_STATUSES = [
  { value: "pending", label: "รอยืนยัน", color: "yellow" },
  { value: "confirmed", label: "ยืนยันแล้ว", color: "blue" },
  { value: "completed", label: "เสร็จสิ้น", color: "green" },
  { value: "cancelled", label: "ยกเลิก", color: "red" },
  { value: "no_show", label: "ไม่มา", color: "gray" },
] as const;

export const PAYMENT_STATUSES = [
  { value: "unpaid", label: "ยังไม่ชำระ" },
  { value: "pending", label: "รอชำระ" },
  { value: "paid", label: "ชำระแล้ว" },
  { value: "refunded", label: "คืนเงินแล้ว" },
  { value: "failed", label: "ชำระไม่สำเร็จ" },
] as const;

export const WORK_DAYS = [
  { value: "MON", label: "จ" },
  { value: "TUE", label: "อ" },
  { value: "WED", label: "พ" },
  { value: "THU", label: "พฤ" },
  { value: "FRI", label: "ศ" },
  { value: "SAT", label: "ส" },
  { value: "SUN", label: "อา" },
] as const;

export const DEFAULT_OPEN_TIME = "09:00";
export const DEFAULT_CLOSE_TIME = "20:00";
export const DEFAULT_PLATFORM_FEE = 3.9;
export const BOOKING_STEP_MINUTES = 30;

export const APP_NAME = "BookEase";
export const APP_TAGLINE = "เปิดร้านออนไลน์ รับจองง่าย ไม่มีค่าเปิดร้าน";
