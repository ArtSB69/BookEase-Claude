"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Scissors,
  Settings,
  QrCode,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants";
import { useState } from "react";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/merchant/dashboard", label: "ภาพรวม", icon: LayoutDashboard },
  { href: "/merchant/bookings", label: "การจอง", icon: CalendarDays },
  { href: "/merchant/services", label: "บริการ", icon: Scissors },
  { href: "/merchant/share", label: "แชร์ร้าน", icon: QrCode },
  { href: "/merchant/settings", label: "ตั้งค่า", icon: Settings },
];

export function MerchantNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-60 lg:flex-col lg:fixed lg:inset-y-0 lg:z-30 lg:border-r lg:border-gray-100 lg:bg-white">
        <div className="flex h-16 items-center gap-2 border-b border-gray-100 px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
            <span className="text-sm font-bold text-white">B</span>
          </div>
          <span className="text-lg font-bold text-gray-900">{APP_NAME}</span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3 pt-4">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                pathname === href || pathname.startsWith(href + "/")
                  ? "bg-brand-50 text-brand-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-gray-100 p-3">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            ออกจากระบบ
          </button>
        </div>
      </aside>

      {/* Mobile top nav */}
      <header className="lg:hidden sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-100 bg-white px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
            <span className="text-sm font-bold text-white">B</span>
          </div>
          <span className="text-lg font-bold text-gray-900">{APP_NAME}</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30 mt-16 bg-white border-t border-gray-100">
          <nav className="flex flex-col gap-1 p-3">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                  pathname === href
                    ? "bg-brand-50 text-brand-700"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 mt-2 border-t border-gray-100 pt-4"
            >
              <LogOut className="h-4 w-4" />
              ออกจากระบบ
            </button>
          </nav>
        </div>
      )}
    </>
  );
}

// Mobile bottom nav for quick access
export function MobileBottomNav() {
  const pathname = usePathname();
  const mainItems = navItems.slice(0, 4);

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex border-t border-gray-100 bg-white">
      {mainItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium transition-colors",
            pathname === href || pathname.startsWith(href + "/")
              ? "text-brand-600"
              : "text-gray-500"
          )}
        >
          <Icon className="h-5 w-5" />
          {label}
        </Link>
      ))}
    </nav>
  );
}
