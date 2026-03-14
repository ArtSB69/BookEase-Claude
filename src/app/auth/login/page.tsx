"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { APP_NAME } from "@/lib/constants";
import { Phone } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [callbackUrl, setCallbackUrl] = useState("/merchant/dashboard");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCallbackUrl(params.get("callbackUrl") ?? "/merchant/dashboard");
  }, []);

  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [devOtp, setDevOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
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
      if (data.devOtp) setDevOtp(data.devOtp);
      setStep("otp");
    } catch {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndLogin = async () => {
    if (otp.length !== 6) { setError("กรุณาใส่รหัส 6 หลัก"); return; }
    setError("");
    setLoading(true);
    try {
      const result = await signIn("credentials", { phone, otp, redirect: false });
      if (result?.error) {
        setError("รหัส OTP ไม่ถูกต้องหรือหมดอายุ");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
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
      if (data.devOtp) setDevOtp(data.devOtp);
    } catch {
      setError("เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-800">
              <span className="text-lg font-bold text-cyan-400">B</span>
            </div>
            <span className="text-xl font-bold">
              <span className="text-navy-800">Book</span>
              <span className="text-cyan-500">Ease</span>
            </span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">เข้าสู่ระบบ</h1>
          <p className="mt-1 text-sm text-gray-500">สำหรับเจ้าของร้านและพนักงาน</p>
        </div>

        {step === "phone" && (
          <div className="space-y-4">
            <Input
              label="เบอร์โทรศัพท์"
              type="tel"
              placeholder="0812345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              autoComplete="tel"
              hint="เบอร์ที่ใช้สมัครบัญชี"
            />

            {error && (
              <p className="text-sm text-red-500 text-center bg-red-50 rounded-xl py-2.5 px-4">
                {error}
              </p>
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
          </div>
        )}

        {step === "otp" && (
          <div className="space-y-4">
            <div className="text-center mb-2">
              <p className="text-sm text-gray-500">
                ส่งรหัสไปที่{" "}
                <span className="font-semibold text-gray-700">{phone}</span>
              </p>
              <button
                onClick={() => { setStep("phone"); setError(""); setOtp(""); }}
                className="text-xs text-brand-600 hover:underline mt-0.5"
              >
                เปลี่ยนเบอร์
              </button>
            </div>

            {devOtp && (
              <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-center">
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
              <p className="text-sm text-red-500 text-center bg-red-50 rounded-xl py-2.5 px-4">
                {error}
              </p>
            )}

            <Button size="lg" className="w-full" onClick={handleVerifyAndLogin} disabled={loading}>
              {loading ? <Spinner size="sm" className="border-white border-t-transparent" /> : "เข้าสู่ระบบ"}
            </Button>

            <button
              onClick={handleResend}
              disabled={loading}
              className="w-full text-sm text-brand-600 font-medium hover:underline py-1 disabled:opacity-50"
            >
              ส่งรหัสใหม่อีกครั้ง
            </button>
          </div>
        )}

        <p className="mt-6 text-center text-sm text-gray-500">
          ยังไม่มีร้าน?{" "}
          <Link href="/merchant/onboarding" className="text-brand-600 font-medium hover:underline">
            เปิดร้านฟรีเลย
          </Link>
        </p>
      </div>
    </div>
  );
}
