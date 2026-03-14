import Link from "next/link";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { CalendarDays, CreditCard, User, LogOut, ChevronRight } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { signOut } from "@/lib/auth";

export const metadata = { title: "บัญชีของฉัน" };

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-50">
            <User className="h-8 w-8 text-brand-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">บัญชีของฉัน</h1>
          <p className="mt-2 text-gray-500 text-sm">
            เข้าสู่ระบบเพื่อดูการจองและประวัติการชำระเงิน
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link href="/auth/login">
              <Button size="lg" className="w-full">เข้าสู่ระบบ</Button>
            </Link>
            <Link href="/merchant/onboarding">
              <Button size="lg" variant="outline" className="w-full">เปิดร้านฟรี</Button>
            </Link>
          </div>
          <p className="mt-4 text-xs text-gray-400">
            เป็นเจ้าของร้าน?{" "}
            <Link href="/auth/login" className="text-brand-600">เข้าสู่ระบบที่นี่</Link>
          </p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { href: "/account/bookings", label: "การจองของฉัน", icon: CalendarDays, desc: "ดูประวัติและสถานะการจอง" },
    { href: "/account/payments", label: "ประวัติการชำระ", icon: CreditCard, desc: "ดูประวัติการจ่ายเงิน" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 max-w-lg mx-auto">
      {/* Profile */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100">
          <span className="text-xl font-bold text-brand-700">
            {session.user.name?.charAt(0) ?? "U"}
          </span>
        </div>
        <div>
          <p className="font-bold text-gray-900">{session.user.name ?? "ผู้ใช้"}</p>
          <p className="text-sm text-gray-500">{session.user.email}</p>
        </div>
      </div>

      {/* Menu */}
      <div className="space-y-2">
        {menuItems.map(({ href, label, icon: Icon, desc }) => (
          <Link key={href} href={href}>
            <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 hover:border-gray-200 transition-colors">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
                <Icon className="h-5 w-5 text-brand-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{label}</p>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </Link>
        ))}

        <form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }}>
          <button
            type="submit"
            className="flex w-full items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 hover:border-gray-200 transition-colors text-left"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
              <LogOut className="h-5 w-5 text-red-500" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">ออกจากระบบ</p>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>
        </form>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-400">{APP_NAME} · ระบบรับจองสำหรับธุรกิจบริการ</p>
      </div>
    </div>
  );
}
