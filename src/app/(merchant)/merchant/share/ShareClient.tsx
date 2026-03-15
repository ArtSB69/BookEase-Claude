"use client";

import { useEffect, useRef, useState } from "react";
import { QrCode, Link2, Copy, Download, Check, ExternalLink, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Merchant } from "@/types";

interface Props {
  merchant: Merchant;
  bookingUrl: string;
  adminUrl: string;
}

function QRCodeDisplay({ url, size = 200 }: { url: string; size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, url, {
        width: size,
        margin: 2,
        color: { dark: "#1a2f6e", light: "#ffffff" },
      });
      setLoaded(true);
    });
    return () => { cancelled = true; };
  }, [url, size]);

  return (
    <div className="flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className={`rounded-xl transition-opacity ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

function CopyField({ label, value, href }: { label: string; value: string; href: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5">
        <p className="flex-1 text-sm text-gray-800 truncate font-medium">{value}</p>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={handleCopy}
            className="rounded-lg p-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 transition-colors"
            title="คัดลอก"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
          </button>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export function ShareClient({ merchant, bookingUrl, adminUrl }: Props) {
  const [activeTab, setActiveTab] = useState<"customer" | "admin">("customer");

  const currentUrl = activeTab === "customer" ? bookingUrl : adminUrl;

  return (
    <div className="max-w-sm mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">แชร์ร้าน</h1>
        <p className="text-sm text-gray-500 mt-0.5">QR Code และลิงก์สำหรับร้านของคุณ</p>
      </div>

      {/* Tab switcher */}
      <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-gray-100">
        <button
          onClick={() => setActiveTab("customer")}
          className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-colors ${
            activeTab === "customer"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Users className="h-4 w-4" />
          ลูกค้าจอง
        </button>
        <button
          onClick={() => setActiveTab("admin")}
          className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-colors ${
            activeTab === "admin"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Settings className="h-4 w-4" />
          จัดการร้าน
        </button>
      </div>

      {/* QR Section */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        <div className="text-center mb-5">
          <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold mb-3 ${
            activeTab === "customer"
              ? "bg-brand-50 text-brand-700"
              : "bg-amber-50 text-amber-700"
          }`}>
            {activeTab === "customer" ? (
              <><Users className="h-3.5 w-3.5" /> QR สำหรับลูกค้าจอง</>
            ) : (
              <><Settings className="h-3.5 w-3.5" /> QR สำหรับจัดการร้าน</>
            )}
          </div>
          <p className="text-sm text-gray-500">
            {activeTab === "customer"
              ? "แสดงให้ลูกค้าสแกนเพื่อจองบริการ"
              : "ใช้เข้าระบบจัดการร้านบนมือถือ"}
          </p>
        </div>

        <QRCodeDisplay url={currentUrl} size={220} />

        <div className="mt-5 space-y-3">
          <CopyField
            label={activeTab === "customer" ? "ลิงก์จองบริการ" : "ลิงก์จัดการร้าน"}
            value={currentUrl}
            href={currentUrl}
          />
        </div>
      </div>

      {/* Tips */}
      <div className="rounded-2xl bg-brand-50 border border-brand-100 p-4 space-y-2">
        <p className="text-sm font-semibold text-brand-900">
          💡 วิธีแชร์ให้ลูกค้า
        </p>
        <ul className="space-y-1.5 text-sm text-brand-800">
          <li>• พิมพ์ QR ติดหน้าร้าน</li>
          <li>• แชร์ลิงก์ผ่าน LINE หรือ Instagram</li>
          <li>• ใส่ในบิลหรือนามบัตรร้าน</li>
          <li>• เพิ่มในไฮไลต์ Story ของร้าน</li>
        </ul>
      </div>

      {/* Preview link */}
      <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" className="w-full">
          <ExternalLink className="h-4 w-4" />
          ดูหน้าร้านของฉัน
        </Button>
      </a>
    </div>
  );
}
