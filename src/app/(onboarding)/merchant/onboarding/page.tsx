"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { APP_NAME, BUSINESS_TYPES } from "@/lib/constants";
import { CheckCircle2, Plus, Trash2, ArrowLeft, Phone } from "lucide-react";

type Step = "phone" | "otp" | "shop" | "services" | "publish";

const STEPS: { key: Step; label: string }[] = [
  { key: "phone", label: "เบอร์โทร" },
  { key: "otp", label: "ยืนยัน OTP" },
  { key: "shop", label: "ข้อมูลร้าน" },
  { key: "services", label: "บริการ" },
  { key: "publish", label: "เสร็จ" },
];

interface ServiceForm {
  name: string;
  durationMinutes: number;
  price: number;
  category: string;
}

export default function OnboardingPage() {
  const router = useRouter();

  const [step, setStep] = useState<Step>("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Phone / OTP
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [devOtp, setDevOtp] = useState("");

  // Shop
  const [shopName, setShopName] = useState("");
  const [businessType, setBusinessType] = useState("salon");
  const [shopPhone, setShopPhone] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  // Services
  const [services, setServices] = useState<ServiceForm[]>([
    { name: "", durationMinutes: 60, price: 0, category: "" },
  ]);

  // Result
  const [merchantSlug, setMerchantSlug] = useState("");

  const currentStepIndex = STEPS.findIndex((s) => s.key === step);
  const progressSteps = STEPS.slice(0, 4);

  const addService = () =>
    setServices([...services, { name: "", durationMinutes: 60, price: 0, category: "" }]);

  const removeService = (i: number) => {
    if (services.length === 1) return;
    setServices(services.filter((_, idx) => idx !== i));
  };

  const updateService = (i: number, field: keyof ServiceForm, value: string | number) => {
    const updated = [...services];
    updated[i] = { ...updated[i], [field]: value };
    setServices(updated);
  };

  const handleSendOtp = async () => {
    if (!userName.trim()) { setError("กรุณาใส่ชื่อของคุณ"); return; }
    if (!phone.trim()) { setError("กรุณาใส่เบอร์โทรศัพท์"); return; }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "ส่ง OTP ไม่สำเร็จ"); return; }
      setShopPhone(phone);
      if (data.devOtp) setDevOtp(data.devOtp);
      setStep("otp");
    } catch {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setOtp("");
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "ส่ง OTP ไม่สำเร็จ"); return; }
      if (data.devOtp) setDevOtp(data.devOtp);
    } catch {
      setError("เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) { setError("กรุณาใส่รหัส 6 หลัก"); return; }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code: otp }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "รหัส OTP ไม่ถูกต้อง"); return; }
      setStep("shop");
    } catch {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  };

  const handleShopNext = () => {
    if (!shopName.trim() || !shopPhone.trim()) {
      setError("กรุณากรอกชื่อร้านและเบอร์โทร");
      return;
    }
    setError("");
    setStep("services");
  };

  const handlePublish = async () => {
    const validServices = services.filter((s) => s.name.trim() && s.price > 0);
    if (validServices.length === 0) { setError("กรุณาเพิ่มบริการอย่างน้อย 1 รายการ"); return; }
    setError("");
    setLoading(true);

    try {
      // 1. สร้าง merchant + user
      const res = await fetch("/api/merchants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, phone, name: shopName, businessType, address, description }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "เกิดข้อผิดพลาด");
        setLoading(false);
        return;
      }

      const { merchant } = await res.json();
      setMerchantSlug(merchant.slug);

      // 2. เพิ่มบริการ
      await Promise.all(
        validServices.map((s, i) =>
          fetch("/api/services", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...s, merchantId: merchant.id, sortOrder: i }),
          })
        )
      );

      // 3. Publish
      await fetch(`/api/merchants/${merchant.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: true }),
      });

      // 4. Auto sign in ด้วย phone + OTP ที่ verified แล้ว
      await signIn("credentials", { phone, otp, redirect: false });

      setStep("publish");
    } catch {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    const prev: Record<Step, Step | null> = {
      phone: null, otp: "phone", shop: "otp", services: "shop", publish: null,
    };
    const p = prev[step];
    if (p) { setStep(p); setError(""); }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-lg px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            {step !== "phone" && step !== "publish" && (
              <button onClick={goBack} className="rounded-xl p-2 hover:bg-gray-100 text-gray-500">
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-600">
                <span className="text-xs font-bold text-white">B</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{APP_NAME}</span>
            </div>
          </div>

          {step !== "publish" && (
            <div className="flex gap-1">
              {progressSteps.map(({ key }, i) => (
                <div
                  key={key}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    i <= currentStepIndex ? "bg-brand-600" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 py-6">

        {/* ── Step: Phone ─────────────────────────────── */}
        {step === "phone" && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">เปิดร้านฟรี</h1>
              <p className="mt-1 text-gray-500 text-sm">ใช้เบอร์โทรยืนยันตัวตน ไม่ต้องมีอีเมล</p>
            </div>

            <div className="space-y-4">
              <Input
                label="ชื่อของคุณ"
                placeholder="สมชาย รักดี"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <Input
                label="เบอร์โทรศัพท์"
                type="tel"
                placeholder="0812345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                hint="เบอร์ 10 หลัก เช่น 0812345678"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 rounded-xl py-2.5 px-4 text-center">{error}</p>
            )}

            <Button size="lg" className="w-full" onClick={handleSendOtp} disabled={loading}>
              {loading ? (
                <Spinner size="sm" className="border-white border-t-transparent" />
              ) : (
                <>
                  <Phone className="h-4 w-4 mr-2" />
                  ส่งรหัส OTP
                </>
              )}
            </Button>

            <p className="text-center text-sm text-gray-500">
              มีบัญชีแล้ว?{" "}
              <Link href="/auth/login" className="text-brand-600 font-medium">เข้าสู่ระบบ</Link>
            </p>
          </div>
        )}

        {/* ── Step: OTP ───────────────────────────────── */}
        {step === "otp" && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ยืนยันเบอร์โทร</h1>
              <p className="mt-1 text-gray-500 text-sm">
                ส่งรหัส 6 หลักไปที่{" "}
                <span className="font-semibold text-gray-700">{phone}</span>
              </p>
            </div>

            {devOtp && (
              <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
                <p className="text-xs text-amber-700 font-medium">DEV MODE — รหัส OTP:</p>
                <p className="text-2xl font-bold text-amber-800 tracking-widest mt-0.5">{devOtp}</p>
              </div>
            )}

            <Input
              label="รหัส OTP"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              required
            />

            {error && (
              <p className="text-sm text-red-500 bg-red-50 rounded-xl py-2.5 px-4 text-center">{error}</p>
            )}

            <Button size="lg" className="w-full" onClick={handleVerifyOtp} disabled={loading}>
              {loading ? (
                <Spinner size="sm" className="border-white border-t-transparent" />
              ) : (
                "ยืนยันรหัส OTP"
              )}
            </Button>

            <button
              onClick={handleResendOtp}
              disabled={loading}
              className="w-full text-sm text-brand-600 font-medium hover:underline py-1 disabled:opacity-50"
            >
              ส่งรหัสใหม่อีกครั้ง
            </button>
          </div>
        )}

        {/* ── Step: Shop ──────────────────────────────── */}
        {step === "shop" && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ข้อมูลร้าน</h1>
              <p className="mt-1 text-gray-500 text-sm">แก้ไขได้ภายหลังในการตั้งค่า</p>
            </div>

            <div className="space-y-4">
              <Input
                label="ชื่อร้าน"
                placeholder="เช่น Bloom Salon"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                required
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">ประเภทธุรกิจ <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {BUSINESS_TYPES.map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => setBusinessType(value)}
                      className={`rounded-xl border-2 px-3 py-2.5 text-sm font-medium transition-colors text-left ${
                        businessType === value
                          ? "border-brand-500 bg-brand-50 text-brand-700"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <Input
                label="เบอร์โทรร้าน"
                type="tel"
                placeholder="0812345678"
                value={shopPhone}
                onChange={(e) => setShopPhone(e.target.value)}
                required
              />
              <Input
                label="ที่อยู่ร้าน (ไม่บังคับ)"
                placeholder="เช่น 123 Sukhumvit, Bangkok"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Textarea
                label="แนะนำร้าน (ไม่บังคับ)"
                placeholder="บอกเล่าเกี่ยวกับร้านของคุณ..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 rounded-xl py-2.5 px-4 text-center">{error}</p>
            )}

            <Button size="lg" className="w-full" onClick={handleShopNext}>ถัดไป</Button>
          </div>
        )}

        {/* ── Step: Services ──────────────────────────── */}
        {step === "services" && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">บริการของร้าน</h1>
              <p className="mt-1 text-gray-500 text-sm">เพิ่มได้มากกว่านี้ภายหลัง</p>
            </div>

            <div className="space-y-4">
              {services.map((svc, i) => (
                <div key={i} className="rounded-2xl border border-gray-200 bg-white p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-700">บริการที่ {i + 1}</p>
                    {services.length > 1 && (
                      <button onClick={() => removeService(i)} className="text-gray-400 hover:text-red-500 rounded-lg p-1">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <Input
                    placeholder="เช่น ตัดผม + จัดทรง"
                    label="ชื่อบริการ"
                    value={svc.name}
                    onChange={(e) => updateService(i, "name", e.target.value)}
                    required
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="ราคา (บาท)"
                      type="number"
                      min="0"
                      placeholder="350"
                      value={svc.price || ""}
                      onChange={(e) => updateService(i, "price", Number(e.target.value))}
                    />
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-gray-700">ระยะเวลา</label>
                      <select
                        value={svc.durationMinutes}
                        onChange={(e) => updateService(i, "durationMinutes", Number(e.target.value))}
                        className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      >
                        {[15,30,45,60,90,120,150,180,240].map((m) => (
                          <option key={m} value={m}>{m < 60 ? `${m} นาที` : `${m / 60}${m % 60 !== 0 ? `.${m % 60}` : ""} ชม.`}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <Input
                    label="หมวดหมู่ (ไม่บังคับ)"
                    placeholder="เช่น ตัดผม, ทำสี"
                    value={svc.category}
                    onChange={(e) => updateService(i, "category", e.target.value)}
                  />
                </div>
              ))}

              <button
                onClick={addService}
                className="w-full rounded-2xl border-2 border-dashed border-gray-200 py-3 flex items-center justify-center gap-2 text-sm font-medium text-gray-500 hover:border-brand-300 hover:text-brand-600 transition-colors"
              >
                <Plus className="h-4 w-4" />
                เพิ่มบริการอีก
              </button>
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 rounded-xl py-2.5 px-4 text-center">{error}</p>
            )}

            <Button size="lg" className="w-full" onClick={handlePublish} disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" className="border-white border-t-transparent" />
                  กำลังสร้างร้าน...
                </>
              ) : (
                "เผยแพร่ร้านเลย 🎉"
              )}
            </Button>
          </div>
        )}

        {/* ── Step: Publish success ────────────────────── */}
        {step === "publish" && (
          <div className="text-center animate-fade-in space-y-6 py-8">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2 className="h-10 w-10 text-emerald-500" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">ร้านเปิดแล้ว! 🎉</h1>
              <p className="mt-2 text-gray-500">
                ร้าน <span className="font-semibold text-gray-900">{shopName}</span> พร้อมรับจองแล้ว
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 text-left">
              <p className="text-xs text-gray-500 mb-1">ลิงก์จองของลูกค้า</p>
              <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2.5">
                <p className="text-sm font-medium text-brand-700 break-all flex-1">
                  {process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/{merchantSlug}
                </p>
                <button
                  onClick={() => navigator.clipboard?.writeText(`${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/${merchantSlug}`)}
                  className="shrink-0 text-xs text-brand-600 font-medium hover:underline"
                >
                  คัดลอก
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button size="lg" className="w-full" onClick={() => router.push("/merchant/dashboard")}>
                ไปที่แดชบอร์ด
              </Button>
              <Button size="lg" variant="outline" className="w-full" onClick={() => router.push("/merchant/share")}>
                ดู QR Code และแชร์ร้าน
              </Button>
              <Link href={`/${merchantSlug}`} target="_blank">
                <Button variant="ghost" className="w-full text-gray-500">
                  ดูหน้าร้านของฉัน
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
