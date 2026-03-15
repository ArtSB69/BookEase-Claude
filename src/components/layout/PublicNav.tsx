"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand/BrandLogo";

export function PublicNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <BrandLogo withLink size="sm" />

        <div className="flex items-center gap-2">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm">เข้าสู่ระบบ</Button>
          </Link>
          <Link href="/merchant/onboarding">
            <Button size="sm">เปิดร้านฟรี</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
