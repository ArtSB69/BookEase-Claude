import Link from "next/link";
import { PublicNav } from "@/components/layout/PublicNav";
import { Button } from "@/components/ui/button";
import {
  CalendarCheck,
  QrCode,
  CreditCard,
  Clock,
  Star,
  Zap,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "เปิดร้านใน 5 นาที",
    desc: "สมัคร → ตั้งบริการ → ได้ลิงก์จองทันที ไม่ต้องรอ",
  },
  {
    icon: CalendarCheck,
    title: "รับจองออนไลน์ 24 ชั่วโมง",
    desc: "ลูกค้าจองเองได้ตลอดเวลา ไม่ต้องตอบแชทแทน",
  },
  {
    icon: QrCode,
    title: "QR Code พร้อมแชร์",
    desc: "ได้ QR ทันที แชร์ผ่าน LINE, Instagram หรือติดหน้าร้านได้เลย",
  },
  {
    icon: CreditCard,
    title: "ไม่มีค่าเปิดร้าน",
    desc: "ไม่มีค่ารายเดือน จ่ายเฉพาะเมื่อมีการจองสำเร็จ",
  },
  {
    icon: Clock,
    title: "จัดการง่ายบนมือถือ",
    desc: "ดูการจองวันนี้ ยืนยัน ยกเลิก ได้ทุกที่บนโทรศัพท์",
  },
  {
    icon: Star,
    title: "หน้าร้านสวยพร้อมใช้",
    desc: "มีหน้าร้านออนไลน์ที่ดูน่าเชื่อถือโดยไม่ต้องออกแบบเอง",
  },
];

const steps = [
  { step: "01", title: "สมัครฟรี", desc: "กรอกชื่อร้านและประเภทธุรกิจ" },
  { step: "02", title: "เพิ่มบริการ", desc: "ตั้งชื่อ ราคา และระยะเวลา" },
  { step: "03", title: "แชร์ลิงก์", desc: "รับ QR และลิงก์จองทันที" },
  { step: "04", title: "รับจอง", desc: "ลูกค้าจอง คุณรับแจ้งเตือนทันที" },
];

const businessTypes = [
  "ร้านเสริมสวย", "คลินิกความงาม", "สปา", "ร้านตัดผมชาย",
  "นวดแผนไทย", "ทำเล็บ", "เวลเนส", "และอื่นๆ",
];

const pricingPoints = [
  "ไม่มีค่าสมัคร",
  "ไม่มีค่ารายเดือน",
  "จ่ายเพียง 3.9% เมื่อมีการจองสำเร็จ",
  "ยกเว้นค่าธรรมเนียมใน 30 วันแรก",
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-800 py-20 md:py-28">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fill-rule=evenodd%3E%3Cg fill=%23ffffff%3E%3Ccircle cx=30 cy=30 r=1.5 fill-opacity=0.08/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm text-white/90 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            เปิดให้บริการแล้ว · ฟรีในช่วงเปิดตัว
          </div>

          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl leading-tight">
            รับจองออนไลน์<br />
            <span className="text-brand-200">ง่ายกว่าที่เคย</span>
          </h1>
          <p className="mt-5 text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
            ระบบจองนัดสำหรับธุรกิจบริการ เปิดร้านฟรี ได้ลิงก์และ QR ทันที
            ลูกค้าจองเองได้ตลอด 24 ชั่วโมง
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/merchant/onboarding">
              <Button size="xl" className="bg-white text-brand-700 hover:bg-brand-50 shadow-lg w-full sm:w-auto">
                เปิดร้านฟรีเลย
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/bloom-salon">
              <Button size="xl" variant="outline" className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto">
                ดูตัวอย่างร้าน
              </Button>
            </Link>
          </div>

          <p className="mt-4 text-sm text-white/60">ไม่ต้องใช้บัตรเครดิต · ตั้งค่าเสร็จใน 5 นาที</p>
        </div>
      </section>

      {/* Business types ticker */}
      <section className="border-y border-gray-100 bg-gray-50 py-4">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">เหมาะกับ</span>
            {businessTypes.map((t) => (
              <span key={t} className="text-sm text-gray-600">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">เริ่มต้นง่ายมาก</h2>
            <p className="mt-2 text-gray-500">ไม่ต้องมีความรู้เทคนิค ทำได้เองในไม่กี่นาที</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50">
                  <span className="text-xl font-bold text-brand-600">{step}</span>
                </div>
                <h3 className="font-semibold text-gray-900">{title}</h3>
                <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">ทุกอย่างที่ธุรกิจบริการต้องการ</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl bg-white border border-gray-100 p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
                  <Icon className="h-5 w-5 text-brand-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{title}</h3>
                <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-lg px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">ราคาโปร่งใส ไม่มีค่าซ่อน</h2>
          <p className="mt-2 text-gray-500">จ่ายเฉพาะเมื่อธุรกิจคุณเติบโต</p>

          <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="text-5xl font-bold text-gray-900">3.9%</div>
            <div className="mt-1 text-gray-500 text-sm">ต่อการจองที่สำเร็จ</div>

            <ul className="mt-6 space-y-3 text-left">
              {pricingPoints.map((point) => (
                <li key={point} className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>

            <Link href="/merchant/onboarding" className="mt-6 block">
              <Button size="lg" className="w-full">เปิดร้านฟรีเลย</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-600 py-16">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            พร้อมรับจองออนไลน์แล้วหรือยัง?
          </h2>
          <p className="mt-3 text-brand-200">เปิดร้านวันนี้ ได้ลิงก์จองทันที ฟรี ไม่มีเงื่อนไข</p>
          <Link href="/merchant/onboarding" className="mt-6 inline-block">
            <Button size="xl" className="bg-white text-brand-700 hover:bg-brand-50 shadow-lg">
              เริ่มเลย — ฟรี
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-8">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy-800">
              <span className="text-xs font-bold text-cyan-400">B</span>
            </div>
            <span className="font-bold">
              <span className="text-navy-800">Book</span>
              <span className="text-cyan-500">Ease</span>
            </span>
          </div>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} BookEase by Atiz · ระบบรับจองสำหรับธุรกิจบริการในไทย
          </p>
        </div>
      </footer>
    </div>
  );
}
