import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  LayoutDashboard,
  MessageSquareMore,
  QrCode,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Zap,
} from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { PublicNav } from "@/components/layout/PublicNav";
import { Button } from "@/components/ui/button";

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const proofStats = [
  { value: "5 นาที", label: "ตั้งค่าร้านและเริ่มรับจองได้ทันที" },
  { value: "24/7", label: "ลูกค้าจองได้ตลอด แม้ตอนคุณหลับ" },
  { value: "0 บาท", label: "ค่าเริ่มต้นและค่ารายเดือน" },
];

const businessTypes = [
  "ร้านเสริมสวย",
  "คลินิกความงาม",
  "สปา",
  "ร้านตัดผมชาย",
  "นวดแผนไทย",
  "ทำเล็บ",
  "เวลเนส",
  "ร้านบริการเฉพาะทาง",
  "สตูดิโอ",
  "เทรนเนอร์ส่วนตัว",
];

const painPoints = [
  {
    pain: "ตอบแชทซ้ำทุกวัน ว่างไหม? ราคาเท่าไหร่?",
    fix: "ลูกค้าเห็นราคา เวลาว่าง และจองเองได้ทันที",
  },
  {
    pain: "จองผ่านไลน์แล้วลืม ทำให้เสียคิวโดยเปล่าประโยชน์",
    fix: "ระบบส่ง reminder ให้อัตโนมัติ ลดการ no-show",
  },
  {
    pain: "ทำเว็บรับจองเองแพงและซับซ้อน",
    fix: "ได้หน้าร้านพร้อมใช้งานทันที ไม่ต้องเขียนโค้ด",
  },
];

const featureCards = [
  {
    icon: CalendarCheck2,
    title: "รับจองออนไลน์ ไม่ต้องตอบแชทแทน",
    desc: "ลูกค้าเลือกบริการ วัน เวลา และยืนยันการจองได้เอง ลดงานจุกจิกหน้าร้านได้ทันที",
    highlight: false,
  },
  {
    icon: QrCode,
    title: "ได้ลิงก์ร้านและ QR พร้อมแชร์ทันที",
    desc: "ส่งผ่าน LINE, Instagram หรือปริ้นท์ติดหน้าร้านได้เลย โดยไม่ต้องสร้างเว็บเอง",
    highlight: false,
  },
  {
    icon: LayoutDashboard,
    title: "ดูคิววันนี้และจัดการร้านในหน้าเดียว",
    desc: "เช็กคิว ยืนยัน ยกเลิก และดูภาพรวมร้านจากมือถือได้แบบไม่ต้องเรียนรู้นาน",
    highlight: false,
  },
  {
    icon: CreditCard,
    title: "โครงสร้างราคาเข้าใจง่ายและเสี่ยงต่ำ",
    desc: "ไม่มีรายเดือน ไม่มีค่าเปิดร้าน จ่ายเฉพาะเมื่อมีการจองสำเร็จจริงเท่านั้น",
    highlight: true,
  },
  {
    icon: MessageSquareMore,
    title: "ลดการตอบแชทซ้ำเรื่องเวลาและราคา",
    desc: "ลูกค้าเห็นบริการ ราคา และช่วงเวลาว่างชัดเจนก่อนกดจอง ไม่ต้องถามซ้ำ",
    highlight: false,
  },
  {
    icon: ShieldCheck,
    title: "หน้าร้านดูน่าเชื่อถือพร้อมใช้งาน",
    desc: "ได้ storefront ที่ดูเป็นมืออาชีพ ช่วยให้ลูกค้าตัดสินใจง่ายขึ้นตั้งแต่ครั้งแรก",
    highlight: false,
  },
];

const testimonials = [
  {
    name: "คุณนิดา จ.",
    role: "เจ้าของร้านเสริมสวยนิดา · กรุงเทพ",
    stars: 5,
    quote:
      "ตอนแรกคิดว่าจะยากแต่ตั้งค่าได้ภายใน 10 นาที ตอนนี้ลูกค้าจองเองได้ตลอด ไม่ต้องนั่งตอบแชทตลอดวันแล้ว มีเวลาดูแลลูกค้าในร้านได้มากขึ้นมาก",
  },
  {
    name: "คุณปราง ส.",
    role: "Prang Nails Studio · เชียงใหม่",
    stars: 5,
    quote:
      "ชอบที่ไม่มีค่ารายเดือน ก่อนหน้านี้เคยลองระบบอื่นแล้วต้องจ่ายทุกเดือน แต่นี่จ่ายเฉพาะตอนที่มีการจองจริงๆ เหมาะมากสำหรับร้านที่เพิ่งเริ่ม",
  },
  {
    name: "คุณกอล์ฟ ป.",
    role: "The Barber House · ขอนแก่น",
    stars: 5,
    quote:
      "ปริ้นท์ QR ติดหน้าร้านแล้วลูกค้า walk-in กลายเป็นลูกค้าประจำได้ง่ายขึ้นมาก ไม่ต้องให้กรอกชื่อในกระดาษแล้ว ดูมืออาชีพขึ้นเยอะเลย",
  },
];

const steps = [
  {
    step: "01",
    icon: Store,
    title: "สมัครและกรอกข้อมูลร้าน",
    desc: "ใส่ชื่อร้าน ประเภทธุรกิจ และเวลาทำการ ใช้เวลาเริ่มต้นไม่กี่นาที ไม่ต้องมีความรู้ด้าน IT",
  },
  {
    step: "02",
    icon: Zap,
    title: "เพิ่มบริการ ราคา และระยะเวลา",
    desc: "ตั้งค่าบริการที่ลูกค้าจองได้จริง พร้อมราคาแบบชัดเจนตั้งแต่แรก ไม่จำกัดจำนวนบริการ",
  },
  {
    step: "03",
    icon: QrCode,
    title: "แชร์ลิงก์และเริ่มรับจองได้เลย",
    desc: "ระบบสร้างลิงก์ร้านและ QR ให้ทันที พร้อมโพสต์หรือส่งให้ลูกค้าได้เลย ไม่ต้องรอ",
  },
];

const faqs = [
  {
    q: "มีค่าใช้จ่ายอะไรบ้าง?",
    a: "ไม่มีค่าเปิดร้านและไม่มีค่ารายเดือน คุณจะถูกเก็บ 3.9% เฉพาะเมื่อมีการจองที่ชำระเงินสำเร็จแล้วเท่านั้น ถ้าไม่มีการจองก็ไม่มีค่าใช้จ่ายใดๆ",
  },
  {
    q: "ถ้าลูกค้ายกเลิกการจอง คิดค่าธรรมเนียมไหม?",
    a: "ไม่คิด ค่าธรรมเนียม 3.9% จะเกิดขึ้นเฉพาะเมื่อการจองเสร็จสมบูรณ์จริงๆ การยกเลิกจากลูกค้าไม่มีค่าใช้จ่ายเพิ่มเติม",
  },
  {
    q: "ต้องมีความรู้ด้านเทคโนโลยีไหม?",
    a: "ไม่ต้องเลย ระบบออกแบบมาให้ใช้งานได้ง่ายบนมือถือ กรอกข้อมูลร้าน เพิ่มบริการ และได้ลิงก์พร้อมแชร์ภายใน 5 นาที",
  },
  {
    q: "เพิ่มบริการในร้านได้กี่รายการ?",
    a: "ไม่จำกัดจำนวนบริการ คุณสามารถเพิ่ม แก้ไข หรือซ่อนบริการได้ตลอดเวลาจากหน้าจัดการร้าน",
  },
  {
    q: "ลูกค้าจ่ายเงินยังไง?",
    a: "ลูกค้าชำระเงินตรงกับร้านค้าตามที่ตกลง ระบบจะแสดงราคาและรายละเอียดบริการให้ลูกค้าเห็นก่อนยืนยันการจองทุกครั้ง",
  },
  {
    q: "ใช้กับมือถือได้ไหม?",
    a: "ได้เลย ทั้งหน้าร้านที่ลูกค้าเห็น และแดชบอร์ดสำหรับเจ้าของร้าน ออกแบบมาให้ใช้งานได้ดีบนมือถือเป็นหลัก",
  },
];

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav heroMode />

      <main>
        {/* ── Hero ─────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#09112e]">
          {/* Background glows */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,#1a4a8a55_0%,transparent_70%)]" />
            <div className="absolute right-[-80px] top-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-[-60px] h-48 w-48 rounded-full bg-cyan-400/8 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 md:pb-24 md:pt-20">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Left copy */}
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  พร้อมให้ธุรกิจบริการเริ่มรับจองได้ทันที
                </div>

                <h1 className="mt-6 text-4xl font-black leading-[1.06] tracking-tight text-white md:text-[3.5rem] lg:text-[4rem]">
                  หยุดตอบแชท
                  <br />
                  ให้ลูกค้า
                  <br />
                  <span className="text-cyan-300">จองเองได้เลย</span>
                </h1>

                <p className="mt-5 max-w-xl text-lg leading-8 text-white/70 md:text-xl">
                  สำหรับสปา ซาลอน คลินิก และธุรกิจบริการที่อยากให้ลูกค้าจองเองได้ 24
                  ชั่วโมง — ไม่ต้องตอบแชทซ้ำ ไม่ต้องทำเว็บเอง ไม่มีค่ารายเดือน
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/merchant/onboarding">
                    <Button
                      size="xl"
                      className="w-full bg-cyan-400 text-[#09112e] shadow-[0_16px_48px_rgba(34,211,238,0.3)] hover:bg-cyan-300 hover:shadow-[0_16px_56px_rgba(34,211,238,0.4)] sm:w-auto"
                    >
                      เปิดร้านฟรีตอนนี้
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/bloom-salon">
                    <Button
                      size="xl"
                      variant="outline"
                      className="w-full border-white/20 bg-white/6 text-white hover:border-white/35 hover:bg-white/12 sm:w-auto"
                    >
                      ดูตัวอย่างร้านจริง
                    </Button>
                  </Link>
                </div>

                <div className="mt-6 flex flex-wrap gap-2 text-sm text-white/65">
                  {["ฟรีเริ่มต้น ไม่มีค่ารายเดือน", "ได้ลิงก์จองและ QR ทันที", "จ่าย 3.9% เฉพาะจองสำเร็จ"].map(
                    (pill) => (
                      <span
                        key={pill}
                        className="rounded-full border border-white/12 bg-white/8 px-3 py-1.5"
                      >
                        ✓ {pill}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Right — dashboard mockup */}
              <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                <div className="absolute -inset-6 rounded-[2.5rem] bg-cyan-400/8 blur-3xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white shadow-[0_32px_96px_rgba(0,0,0,0.5)]">
                  {/* Mock browser chrome */}
                  <div className="flex items-center gap-2 border-b border-gray-100 bg-white px-4 py-3">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-400" />
                      <div className="h-3 w-3 rounded-full bg-yellow-400" />
                      <div className="h-3 w-3 rounded-full bg-green-400" />
                    </div>
                    <div className="mx-auto flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-1.5 text-xs text-gray-500">
                      <div className="h-2 w-2 rounded-full bg-emerald-400" />
                      ease-pay.co/my-salon
                    </div>
                  </div>

                  <div className="bg-[#f4f8ff] p-5">
                    {/* Today's overview */}
                    <div className="rounded-[1.6rem] bg-[#09112e] p-5 text-white shadow-xl">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-cyan-300/80">
                            วันนี้
                          </p>
                          <p className="mt-1 text-4xl font-black">12 คิว</p>
                          <p className="mt-0.5 text-sm text-white/50">เพิ่มขึ้น 3 จากเมื่อวาน</p>
                        </div>
                        <div className="rounded-2xl bg-white/10 px-4 py-3 text-right">
                          <p className="text-xs text-white/55">รายได้วันนี้</p>
                          <p className="text-2xl font-black text-cyan-300">฿8,400</p>
                        </div>
                      </div>

                      <div className="mt-5 space-y-2.5">
                        {[
                          { time: "10:00", service: "ทำเล็บเจล", status: "ยืนยันแล้ว", statusColor: "bg-emerald-400/20 text-emerald-300" },
                          { time: "13:30", service: "ทรีตเมนต์หน้า", status: "ลูกค้าจองเอง", statusColor: "bg-cyan-400/20 text-cyan-300" },
                          { time: "16:00", service: "นวดอโรมา 60 นาที", status: "รอยืนยัน", statusColor: "bg-amber-400/20 text-amber-300" },
                        ].map(({ time, service, status, statusColor }) => (
                          <div
                            key={time}
                            className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/6 px-4 py-3 backdrop-blur-sm"
                          >
                            <div>
                              <p className="text-sm font-semibold">{service}</p>
                              <p className="mt-0.5 text-xs text-white/45">ลูกค้าเห็นราคาก่อนจองแล้ว</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-cyan-300">{time}</p>
                              <span className={`mt-0.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${statusColor}`}>
                                {status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Feature callouts */}
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-3 rounded-[1.4rem] border border-gray-100 bg-white p-4 shadow-sm">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-50">
                          <QrCode className="h-5 w-5 text-cyan-600" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900">QR พร้อมแชร์</p>
                          <p className="text-[11px] leading-4 text-gray-500">ส่งให้ลูกค้าได้เลย</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-[1.4rem] border border-gray-100 bg-white p-4 shadow-sm">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50">
                          <ShieldCheck className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900">ไม่มีรายเดือน</p>
                          <p className="text-[11px] leading-4 text-gray-500">จ่ายตามผลจริง</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Proof stats */}
            <div className="mt-12 grid gap-4 rounded-[2rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm md:grid-cols-3 md:p-6">
              {proofStats.map((item) => (
                <div key={item.label} className="rounded-[1.4rem] border border-white/8 bg-white/8 px-5 py-4 text-center">
                  <p className="text-3xl font-black text-cyan-300">{item.value}</p>
                  <p className="mt-1 text-sm leading-6 text-white/65">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Business type ticker ─────────────── */}
        <section className="border-y border-gray-100 bg-white py-4">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 text-sm text-gray-500">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-300">
              เหมาะกับ
            </span>
            {businessTypes.map((type) => (
              <span key={type} className="font-medium text-gray-600">
                {type}
              </span>
            ))}
          </div>
        </section>

        {/* ── Problem → Solution ───────────────── */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600">
                ปัญหาที่เจ้าของร้านเจอทุกวัน
              </p>
              <h2 className="mt-4 text-3xl font-black text-[#09112e] md:text-5xl">
                คุณยังตอบแชท
                <br />
                "ว่างไหมคะ?" อยู่ไหม?
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-500">
                ธุรกิจบริการในไทยส่วนใหญ่ยังจัดการคิวผ่านแชท
                ซึ่งกินเวลาและทำให้พลาดลูกค้าที่ไม่อยากรอ
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {painPoints.map(({ pain, fix }) => (
                <div
                  key={pain}
                  className="overflow-hidden rounded-[1.8rem] border border-gray-100 bg-white shadow-[0_8px_32px_rgba(9,17,46,0.06)]"
                >
                  <div className="border-b border-red-50 bg-red-50/70 px-6 py-5">
                    <p className="text-sm font-medium leading-6 text-red-700">
                      ❌ {pain}
                    </p>
                  </div>
                  <div className="bg-emerald-50/40 px-6 py-5">
                    <p className="text-sm font-medium leading-6 text-emerald-700">
                      ✓ {fix}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ─────────────────────────── */}
        <section id="features" className="bg-[#f7fbff] py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600">
                ฟีเจอร์
              </p>
              <h2 className="mt-4 text-3xl font-black text-[#09112e] md:text-5xl">
                ทุกอย่างที่ร้านต้องมี
                <br />
                เพื่อให้ลูกค้าจองง่ายขึ้น
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-500">
                ออกแบบมาให้เจ้าของร้านและลูกค้าใช้แล้วเข้าใจทันที บนมือถือหรือคอมก็ได้
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {featureCards.map(({ icon: Icon, title, desc, highlight }) => (
                <div
                  key={title}
                  className={[
                    "group rounded-[1.8rem] p-6 transition-all hover:-translate-y-1",
                    highlight
                      ? "border-2 border-cyan-200 bg-white shadow-[0_16px_48px_rgba(14,26,74,0.12)]"
                      : "border border-gray-100 bg-white shadow-[0_8px_24px_rgba(14,26,74,0.05)] hover:border-cyan-100 hover:shadow-[0_16px_40px_rgba(14,26,74,0.1)]",
                  ].join(" ")}
                >
                  {highlight && (
                    <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700">
                      <Sparkles className="h-3 w-3" />
                      จุดเด่น
                    </div>
                  )}
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#eef6ff] to-[#ddf4ff]">
                    <Icon className="h-5 w-5 text-[#09112e]" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-[#09112e]">{title}</h3>
                  <p className="mt-3 text-base leading-7 text-gray-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ─────────────────────── */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600">
                รีวิวจากเจ้าของร้าน
              </p>
              <h2 className="mt-4 text-3xl font-black text-[#09112e] md:text-4xl">
                ร้านที่ใช้ BookEase พูดอะไร
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map(({ name, role, stars, quote }) => (
                <div
                  key={name}
                  className="flex flex-col rounded-[1.8rem] border border-gray-100 bg-white p-6 shadow-[0_8px_32px_rgba(9,17,46,0.06)]"
                >
                  <div className="flex gap-1">
                    {Array.from({ length: stars }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-base leading-7 text-gray-700">
                    &ldquo;{quote}&rdquo;
                  </blockquote>
                  <div className="mt-6 border-t border-gray-50 pt-5">
                    <p className="font-bold text-[#09112e]">{name}</p>
                    <p className="mt-0.5 text-sm text-gray-500">{role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ──────────────────────────── */}
        <section id="pricing" className="bg-[#f7fbff] py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600">
                ราคา
              </p>
              <h2 className="mt-4 text-3xl font-black text-[#09112e] md:text-5xl">
                ราคาโปร่งใส
                <br />
                ไม่มีค่าใช้จ่ายซ่อนอยู่
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-500">
                เริ่มต้นได้เลยโดยไม่เสี่ยงต้นทุนคงที่ คุณจ่ายเฉพาะเมื่อมีการจองจริงเท่านั้น
              </p>
            </div>

            <div className="mt-12 mx-auto max-w-2xl">
              <div className="overflow-hidden rounded-[2.4rem] border-2 border-cyan-200 bg-white shadow-[0_24px_80px_rgba(9,17,46,0.12)]">
                <div className="bg-gradient-to-r from-[#09112e] to-[#1a3a7a] px-8 py-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                        BookEase Free
                      </p>
                      <p className="mt-1 text-sm text-white/60">สำหรับธุรกิจบริการทุกขนาด</p>
                    </div>
                    <div className="rounded-2xl bg-white/10 px-4 py-2 text-center">
                      <p className="text-xs text-white/60">ค่ารายเดือน</p>
                      <p className="text-2xl font-black text-white">0 บาท</p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid gap-4 sm:grid-cols-3">
                    {[
                      {
                        value: "ฟรี",
                        label: "ค่าเปิดร้าน",
                        desc: "ไม่มีค่าใช้จ่ายเริ่มต้น",
                        color: "bg-emerald-50 text-emerald-700",
                      },
                      {
                        value: "0 บาท",
                        label: "รายเดือน",
                        desc: "ไม่มีค่าสมัครสมาชิก",
                        color: "bg-blue-50 text-blue-700",
                      },
                      {
                        value: "3.9%",
                        label: "ต่อการจองสำเร็จ",
                        desc: "จ่ายตามผลลัพธ์จริง",
                        color: "bg-cyan-50 text-cyan-700",
                      },
                    ].map(({ value, label, desc, color }) => (
                      <div key={label} className={`rounded-[1.4rem] ${color.split(" ")[0]} p-5 text-center`}>
                        <p className={`text-4xl font-black ${color.split(" ")[1]}`}>{value}</p>
                        <p className="mt-2 text-sm font-bold text-gray-800">{label}</p>
                        <p className="mt-1 text-xs leading-5 text-gray-500">{desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 space-y-3">
                    {[
                      "หน้าร้านออนไลน์พร้อมใช้งานทันที",
                      "ลิงก์จองและ QR Code สำหรับแชร์",
                      "แดชบอร์ดจัดการคิวและบริการ",
                      "บริการไม่จำกัดจำนวน",
                      "รองรับมือถือทั้งเจ้าของร้านและลูกค้า",
                      "ไม่มีโฆษณาหรือ watermark",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                        <p className="text-sm text-gray-700">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <Link href="/merchant/onboarding" className="block">
                      <Button
                        size="xl"
                        className="w-full bg-cyan-400 text-[#09112e] hover:bg-cyan-300"
                      >
                        เปิดร้านฟรีเลย
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <p className="mt-3 text-center text-sm text-gray-400">
                      ไม่ต้องใส่บัตรเครดิต · เริ่มได้ทันที
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── How it works ─────────────────────── */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600">
                วิธีเริ่มต้น
              </p>
              <h2 className="mt-4 text-3xl font-black text-[#09112e] md:text-5xl">
                เริ่มรับจองได้ใน 3 ขั้นตอน
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-500">
                จากสมัครร้านไปจนถึงแชร์ลิงก์ให้ลูกค้า ใช้เวลาน้อยกว่า 10 นาที
              </p>
            </div>

            <div className="relative mt-12">
              {/* Connector line (desktop only) */}
              <div className="absolute left-0 right-0 top-[3.25rem] hidden h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent lg:block" />

              <div className="grid gap-6 lg:grid-cols-3">
                {steps.map(({ step, icon: Icon, title, desc }) => (
                  <div
                    key={step}
                    className="relative rounded-[1.8rem] border border-gray-100 bg-white p-6 shadow-[0_8px_24px_rgba(9,17,46,0.05)]"
                  >
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#09112e] text-xl font-black text-cyan-300">
                      {step}
                      <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400">
                        <Icon className="h-2.5 w-2.5 text-[#09112e]" />
                      </div>
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-[#09112e]">{title}</h3>
                    <p className="mt-3 text-base leading-7 text-gray-500">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 text-center">
              <Link href="/merchant/onboarding">
                <Button size="xl" className="bg-[#09112e] text-white hover:bg-[#1a2f6e]">
                  เริ่มเลย ฟรี
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────── */}
        <section id="faq" className="bg-[#f7fbff] py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl">
              <div className="text-center">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600">
                  FAQ
                </p>
                <h2 className="mt-4 text-3xl font-black text-[#09112e] md:text-4xl">
                  คำถามที่พบบ่อย
                </h2>
              </div>

              <div className="mt-10 divide-y divide-gray-100 overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-[0_8px_32px_rgba(9,17,46,0.06)]">
                {faqs.map(({ q, a }, i) => (
                  <details key={i} className="group">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-6 py-5 font-bold text-[#09112e] hover:bg-gray-50/80">
                      {q}
                      <ChevronDown className="mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="border-t border-gray-50 bg-gray-50/40 px-6 pb-5 pt-4">
                      <p className="text-sm leading-7 text-gray-600">{a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Final CTA ────────────────────────── */}
        <section className="pb-20 pt-8">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="relative overflow-hidden rounded-[2.4rem] bg-[#09112e] p-8 text-white shadow-[0_32px_96px_rgba(9,17,46,0.28)] md:p-14">
              {/* Glow effects */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute right-[-80px] top-[-60px] h-64 w-64 rounded-full bg-cyan-400/12 blur-3xl" />
                <div className="absolute bottom-[-40px] left-[-40px] h-48 w-48 rounded-full bg-blue-600/15 blur-3xl" />
              </div>

              <div className="relative mx-auto max-w-2xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90">
                  <Sparkles className="h-4 w-4 text-cyan-300" />
                  เปิดร้านได้ภายใน 5 นาที
                </div>

                <h2 className="mt-6 text-3xl font-black md:text-5xl">
                  พร้อมให้ลูกค้า
                  <br />
                  จองเองแล้วหรือยัง?
                </h2>
                <p className="mt-5 text-lg leading-8 text-white/70">
                  เริ่มต้นฟรี ไม่มีความเสี่ยง — คุณจ่ายเฉพาะเมื่อมีการจองจริงเท่านั้น
                  หยุดตอบแชทซ้ำๆ และมีเวลาโฟกัสกับงานที่สำคัญกว่า
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link href="/merchant/onboarding">
                    <Button
                      size="xl"
                      className="w-full bg-cyan-400 text-[#09112e] shadow-[0_16px_48px_rgba(34,211,238,0.25)] hover:bg-cyan-300 sm:w-auto"
                    >
                      เปิดร้านฟรีเลยตอนนี้
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/auth/login">
                    <Button
                      size="xl"
                      variant="outline"
                      className="w-full border-white/20 bg-white/6 text-white hover:bg-white/12 sm:w-auto"
                    >
                      เข้าสู่ระบบ
                    </Button>
                  </Link>
                </div>

                <p className="mt-5 text-sm text-white/40">
                  ไม่ต้องใส่บัตรเครดิต · ยกเลิกได้ตลอดเวลา · รองรับภาษาไทย
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────── */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
            <div>
              <BrandLogo withLink size="sm" />
              <p className="mt-3 max-w-xs text-sm leading-6 text-gray-500">
                ระบบรับจองออนไลน์สำหรับธุรกิจบริการในไทย ไม่มีค่ารายเดือน จ่ายตามผลจริง
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-6 sm:grid-cols-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">สำรวจ</p>
                <div className="mt-3 flex flex-col gap-2">
                  <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">ฟีเจอร์</a>
                  <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900">ราคา</a>
                  <a href="#faq" className="text-sm text-gray-600 hover:text-gray-900">FAQ</a>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">เริ่มต้น</p>
                <div className="mt-3 flex flex-col gap-2">
                  <Link href="/merchant/onboarding" className="text-sm text-gray-600 hover:text-gray-900">
                    เปิดร้านฟรี
                  </Link>
                  <Link href="/auth/login" className="text-sm text-gray-600 hover:text-gray-900">
                    เข้าสู่ระบบ
                  </Link>
                  <Link href="/bloom-salon" className="text-sm text-gray-600 hover:text-gray-900">
                    ดูตัวอย่างร้าน
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-gray-100 pt-8 text-center md:flex-row md:text-left">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} BookEase by Atiz · ระบบรับจองสำหรับธุรกิจบริการในไทย
            </p>
            <p className="text-sm text-gray-400">ease-pay.co</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
