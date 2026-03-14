"use client";

import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export function PublicNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
            <span className="text-sm font-bold text-white">B</span>
          </div>
          <span className="text-lg font-bold text-gray-900">{APP_NAME}</span>
        </Link>

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
