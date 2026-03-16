"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand/BrandLogo";

interface PublicNavProps {
  /** When true, nav starts fully transparent (for dark hero pages) and becomes solid on scroll */
  heroMode?: boolean;
}

export function PublicNav({ heroMode = false }: PublicNavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!heroMode) return;
    const onScroll = () => setScrolled(window.scrollY > 56);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [heroMode]);

  const isLight = !heroMode || scrolled;

  return (
    <header
      className={[
        "sticky top-0 z-40 transition-all duration-300",
        isLight
          ? "border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md"
          : "border-b border-white/10 bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <BrandLogo withLink size="sm" inverted={!isLight} />

        <nav className="hidden items-center gap-6 text-sm font-medium sm:flex">
          <a
            href="#features"
            className={
              isLight
                ? "text-gray-600 transition hover:text-gray-900"
                : "text-white/80 transition hover:text-white"
            }
          >
            ฟีเจอร์
          </a>
          <a
            href="#pricing"
            className={
              isLight
                ? "text-gray-600 transition hover:text-gray-900"
                : "text-white/80 transition hover:text-white"
            }
          >
            ราคา
          </a>
          <a
            href="#faq"
            className={
              isLight
                ? "text-gray-600 transition hover:text-gray-900"
                : "text-white/80 transition hover:text-white"
            }
          >
            คำถามที่พบบ่อย
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/auth/login">
            <Button
              variant="ghost"
              size="sm"
              className={
                !isLight
                  ? "text-white/90 hover:bg-white/10 hover:text-white"
                  : undefined
              }
            >
              เข้าสู่ระบบ
            </Button>
          </Link>
          <Link href="/merchant/onboarding">
            <Button
              size="sm"
              className={
                !isLight
                  ? "bg-cyan-400 text-navy-950 hover:bg-cyan-300"
                  : undefined
              }
            >
              เปิดร้านฟรี
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
