import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  CreditCard,
  LayoutDashboard,
  MessageSquareMore,
  QrCode,
  ShieldCheck,
  Sparkles,
  Store,
} from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { PublicNav } from "@/components/layout/PublicNav";
import { Button } from "@/components/ui/button";

const trustPills = [
  "เริ่มใช้ฟรี ไม่มีค่ารายเดือน",
  "ได้ลิงก์จองและ QR ทันที",
  "จ่าย 3.9% เฉพาะเมื่อจองสำเร็จ",
];

const proofStats = [
  { value: "24 ชม.", label: "ลูกค้าจองเองได้ตลอดเวลา" },
  { value: "5 นาที", label: "ตั้งค่าร้านและเริ่มรับจองได้ไว" },
  { value: "0 บาท", label: "ค่าเริ่มต้นและค่ารายเดือน" },
];

const featureCards = [
  {
    icon: CalendarCheck2,
    title: "รับจองออนไลน์แบบไม่ต้องตอบแชทแทน",
    desc: "ลูกค้าเลือกบริการ วัน เวลา และยืนยันการจองได้เอง ลดงานจุกจิกหน้าร้านทันที",
  },
  {
    icon: QrCode,
    title: "ได้ลิงก์ร้านและ QR พร้อมแชร์ทันที",
    desc: "ส่งผ่าน LINE, Instagram หรือปริ้นท์ติดหน้าร้านได้เลยโดยไม่ต้องทำเว็บเอง",
  },
  {
    icon: LayoutDashboard,
    title: "ดูคิววันนี้และจัดการร้านในหน้าเดียว",
    desc: "เช็กคิว ยืนยัน ยกเลิก และดูภาพรวมร้านจากมือถือได้แบบไม่ต้องเรียนรู้นาน",
  },
  {
    icon: CreditCard,
    title: "โครงสร้างราคาเข้าใจง่ายและเสี่ยงต่ำ",
    desc: "ไม่มีรายเดือน ไม่มีค่าเปิดร้าน จ่ายเฉพาะเมื่อมีการจองสำเร็จจริง",
  },
  {
    icon: MessageSquareMore,
    title: "ลดการตอบแชทซ้ำเรื่องเวลาและราคา",
    desc: "ลูกค้าเห็นบริการ ราคา และช่วงเวลาว่างชัดเจนก่อนกดจอง",
  },
  {
    icon: ShieldCheck,
    title: "หน้าร้านดูน่าเชื่อถือพร้อมใช้งาน",
    desc: "ได้ storefront ที่ดูเป็นมืออาชีพ ช่วยให้ลูกค้าตัดสินใจง่ายขึ้นตั้งแต่ครั้งแรก",
  },
];

const steps = [
  {
    step: "01",
    title: "สมัครและกรอกข้อมูลร้าน",
    desc: "ใส่ชื่อร้าน ประเภทธุรกิจ และเวลาทำการ ใช้เวลาเริ่มต้นไม่กี่นาที",
  },
  {
    step: "02",
    title: "เพิ่มบริการ ราคา และระยะเวลา",
    desc: "ตั้งค่าบริการที่ลูกค้าจองได้จริง พร้อมราคาแบบชัดเจนตั้งแต่แรก",
  },
  {
    step: "03",
    title: "แชร์ลิงก์และเริ่มรับจอง",
    desc: "ระบบสร้างลิงก์ร้านและ QR ให้ทันที พร้อมเอาไปโพสต์หรือส่งให้ลูกค้าได้เลย",
  },
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
];

const trustChecks = [
  "ลูกค้าเห็นบริการ ราคา และเวลาว่างชัดเจนก่อนจอง",
  "เหมาะกับธุรกิจบริการที่อยากเริ่มไวโดยไม่ต้องทำเว็บเอง",
  "มีหน้า booking ที่แชร์ได้จริงตั้งแต่วันแรก",
  "ออกแบบมาให้ใช้งานบนมือถือได้ง่ายทั้งเจ้าของร้านและลูกค้า",
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f6f9ff_0%,#ffffff_22%,#f7fbff_100%)]">
      <PublicNav />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(circle_at_top,#7dd3fc22_0%,#1a2f6e_0%,#0d1840_60%,#09112e_100%)]" />
          <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="absolute right-[-120px] top-28 h-80 w-80 rounded-full bg-navy-400/15 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-10 md:pb-20 md:pt-16">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  พร้อมให้ธุรกิจบริการเริ่มรับจองได้ทันที
                </div>

                <h1 className="mt-6 text-4xl font-black leading-[1.05] text-white md:text-6xl">
                  รับจอง รับเงิน
                  <br />
                  และจัดการร้าน
                  <br />
                  <span className="text-cyan-300">ในที่เดียว</span>
                </h1>

                <p className="mt-5 max-w-xl text-lg leading-8 text-white/72 md:text-xl">
                  สำหรับสปา ซาลอน คลินิก และธุรกิจบริการที่อยากให้ลูกค้าจองเองได้ 24 ชั่วโมง
                  โดยไม่ต้องตอบแชทซ้ำ ไม่ต้องทำเว็บเอง และไม่ต้องจ่ายรายเดือน
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/merchant/onboarding">
                    <Button
                      size="xl"
                      className="w-full bg-cyan-400 text-navy-950 shadow-[0_16px_40px_rgba(77,208,255,0.28)] hover:bg-cyan-300 sm:w-auto"
                    >
                      เปิดร้านฟรีตอนนี้
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/bloom-salon">
                    <Button
                      size="xl"
                      variant="outline"
                      className="w-full border-white/20 bg-white/6 text-white hover:border-white/35 hover:bg-white/10 sm:w-auto"
                    >
                      ดูตัวอย่างหน้าร้านจริง
                    </Button>
                  </Link>
                </div>

                <div className="mt-5 flex flex-wrap gap-2 text-sm text-white/75">
                  {trustPills.map((pill) => (
                    <span
                      key={pill}
                      className="rounded-full border border-white/10 bg-white/8 px-3 py-1.5 backdrop-blur-sm"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 rounded-[2rem] bg-cyan-400/10 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/95 shadow-[0_24px_80px_rgba(8,17,46,0.35)]">
                  <div className="border-b border-navy-100 bg-white px-5 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <BrandLogo size="sm" />
                      <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        เปิดรับจองอยู่
                      </div>
                    </div>
                  </div>

                  <div className="bg-[linear-gradient(180deg,#f7fbff_0%,#eef4ff_100%)] p-5">
                    <div className="rounded-[1.5rem] bg-navy-900 p-5 text-white shadow-lg">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm text-cyan-200">วันนี้</p>
                          <p className="mt-1 text-3xl font-black">12 คิว</p>
                        </div>
                        <div className="rounded-2xl bg-white/10 px-3 py-2 text-right">
                          <p className="text-xs text-white/60">รับเงินแล้ว</p>
                          <p className="text-lg font-bold">฿8,400</p>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-3">
                        {[
                          ["10:00", "ทำเล็บเจล", "ยืนยันแล้ว"],
                          ["13:30", "ทรีตเมนต์หน้า", "ลูกค้าจองเอง"],
                          ["16:00", "นวดอโรมา", "ชำระสำเร็จ"],
                        ].map(([time, service, status]) => (
                          <div
                            key={time}
                            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/6 px-4 py-3"
                          >
                            <div>
                              <p className="text-sm font-semibold">{service}</p>
                              <p className="text-xs text-white/60">ลูกค้าเห็นราคาก่อนจองแล้ว</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-cyan-300">{time}</p>
                              <p className="text-xs text-white/60">{status}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-[1.4rem] border border-navy-100 bg-white p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="rounded-2xl bg-cyan-50 p-3">
                            <QrCode className="h-5 w-5 text-cyan-700" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">แชร์ลิงก์และ QR ได้ทันที</p>
                            <p className="text-xs text-gray-500">ส่งให้ลูกค้าหรือโพสต์ลงโซเชียลได้เลย</p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-[1.4rem] border border-navy-100 bg-white p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="rounded-2xl bg-emerald-50 p-3">
                            <ShieldCheck className="h-5 w-5 text-emerald-700" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">ไม่มีรายเดือน เริ่มได้เลย</p>
                            <p className="text-xs text-gray-500">จ่ายเฉพาะเมื่อมีการจองสำเร็จจริง</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-10 grid gap-4 rounded-[2rem] border border-white/10 bg-white/90 p-5 shadow-[0_20px_70px_rgba(17,33,84,0.1)] backdrop-blur md:grid-cols-3 md:p-6">
              {proofStats.map((item) => (
                <div key={item.label} className="rounded-[1.5rem] border border-gray-100 bg-white px-5 py-4">
                  <p className="text-3xl font-black text-navy-900">{item.value}</p>
                  <p className="mt-1 text-sm leading-6 text-gray-600">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-navy-100 bg-white/80 py-4">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 text-sm text-gray-600">
            <span className="font-semibold uppercase tracking-[0.18em] text-gray-400">เหมาะกับ</span>
            {businessTypes.map((type) => (
              <span key={type}>{type}</span>
            ))}
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
                Why BookEase
              </p>
              <h2 className="mt-4 text-3xl font-black text-navy-950 md:text-5xl">
                ทุกอย่างที่ร้านต้องมี
                <br />
                เพื่อให้ลูกค้าจองง่ายและตัดสินใจเร็ว
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                หน้าแรกต้องดูดี แต่หน้าจองต้องขายเก่งด้วย เราเลยออกแบบให้ทั้งเจ้าของร้านและลูกค้าใช้แล้วเข้าใจทันที
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {featureCards.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="group rounded-[1.8rem] border border-navy-100 bg-white p-6 shadow-[0_10px_30px_rgba(14,26,74,0.05)] transition-all hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_20px_50px_rgba(14,26,74,0.12)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#eef6ff_0%,#ddf4ff_100%)]">
                    <Icon className="h-5 w-5 text-navy-800" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-navy-950">{title}</h3>
                  <p className="mt-3 text-base leading-7 text-gray-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f4f8ff_100%)] py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
                Trust & Clarity
              </p>
              <h2 className="mt-4 text-3xl font-black text-navy-950 md:text-4xl">
                ลูกค้าต้องเชื่อถือ
                <br />
                และร้านต้องเริ่มได้โดยไม่ปวดหัว
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                เราจัดลำดับข้อมูลและ CTA ให้ชัดตั้งแต่หน้าแรก เพื่อให้คนที่เข้ามาครั้งแรกเข้าใจว่าได้อะไร คุ้มไหม และต้องกดตรงไหนต่อ
              </p>

              <div className="mt-8 space-y-3">
                {trustChecks.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                    <p className="text-sm leading-6 text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[2rem] bg-navy-950 p-6 text-white shadow-[0_20px_60px_rgba(11,22,60,0.24)]">
                <div className="flex items-center gap-2 text-cyan-300">
                  <Sparkles className="h-4 w-4" />
                  <p className="text-sm font-semibold">สิ่งที่ร้านจะได้ทันทีหลังสมัคร</p>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {[
                    ["ลิงก์ร้านพร้อมแชร์", "ใช้โพสต์ลงโซเชียลหรือส่งให้ลูกค้าได้ทันที"],
                    ["QR สำหรับติดหน้าร้าน", "ช่วยให้ walk-in กลายเป็นลูกค้าจองซ้ำง่ายขึ้น"],
                    ["หน้าร้านออนไลน์ที่ดูน่าเชื่อถือ", "มีบริการ ราคา และเวลาจองแบบชัดเจน"],
                    ["หลังบ้านสำหรับดูคิวรายวัน", "เจ้าของร้านจัดการจากมือถือได้สะดวก"],
                  ].map(([title, desc]) => (
                    <div key={title} className="rounded-[1.4rem] border border-white/10 bg-white/8 p-4">
                      <p className="font-semibold text-white">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-white/65">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-navy-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-cyan-50 p-3">
                    <Store className="h-5 w-5 text-cyan-700" />
                  </div>
                  <div>
                    <p className="font-bold text-navy-950">ราคาโปร่งใส เข้าใจในครั้งเดียว</p>
                    <p className="text-sm text-gray-500">เริ่มต้นได้โดยไม่ต้องเสี่ยงต้นทุนคงที่</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  {[
                    ["ฟรี", "ค่าเริ่มต้น", "ไม่มีค่าเปิดร้าน"],
                    ["0 บาท", "รายเดือน", "เริ่มใช้ได้เลย"],
                    ["3.9%", "เมื่อจองสำเร็จ", "จ่ายตามผลลัพธ์จริง"],
                  ].map(([value, label, desc]) => (
                    <div key={label} className="rounded-[1.3rem] bg-gray-50 p-4">
                      <p className="text-3xl font-black text-navy-900">{value}</p>
                      <p className="mt-1 text-sm font-semibold text-gray-800">{label}</p>
                      <p className="mt-1 text-sm text-gray-500">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
                Start Fast
              </p>
              <h2 className="mt-4 text-3xl font-black text-navy-950 md:text-5xl">
                เริ่มรับจองได้แบบ
                <br />
                ไม่ต้องคิดเยอะ
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                จากสมัครร้านไปจนถึงแชร์ลิงก์ให้ลูกค้า ใช้ flow สั้นและตรงเพื่อให้เริ่มใช้งานได้จริงตั้งแต่วันแรก
              </p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {steps.map(({ step, title, desc }) => (
                <div key={step} className="rounded-[1.8rem] border border-navy-100 bg-white p-6 shadow-sm">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 text-xl font-black text-cyan-300">
                    {step}
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-navy-950">{title}</h3>
                  <p className="mt-3 text-base leading-7 text-gray-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="overflow-hidden rounded-[2.4rem] bg-[linear-gradient(135deg,#0f1d4d_0%,#1a2f6e_52%,#38bdf8_140%)] p-8 text-white shadow-[0_30px_90px_rgba(15,29,77,0.24)] md:p-12">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
                  Ready To Launch
                </p>
                <h2 className="mt-4 text-3xl font-black md:text-5xl">
                  เปิดร้านวันนี้
                  <br />
                  แล้วเริ่มให้ลูกค้าจองเองได้เลย
                </h2>
                <p className="mt-4 text-lg leading-8 text-white/78">
                  ถ้าคุณต้องการหน้า booking ที่ดูน่าเชื่อถือ เข้าใจง่าย และช่วยลดงานหน้าร้าน BookEase ออกแบบมาเพื่อสิ่งนั้นโดยตรง
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link href="/merchant/onboarding">
                    <Button
                      size="xl"
                      className="w-full bg-white text-navy-950 shadow-[0_16px_40px_rgba(255,255,255,0.18)] hover:bg-slate-100 sm:w-auto"
                    >
                      เปิดร้านฟรี
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/auth/login">
                    <Button
                      size="xl"
                      variant="outline"
                      className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10 sm:w-auto"
                    >
                      เข้าสู่ระบบ
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100 bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:text-left">
          <BrandLogo withLink size="sm" />
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} BookEase by Atiz · ระบบรับจองสำหรับธุรกิจบริการในไทย
          </p>
        </div>
      </footer>
    </div>
  );
}
