import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { CalendarDays, Users, TrendingUp, Clock, ArrowRight } from "lucide-react";
import { StatsCard } from "@/components/merchant/StatsCard";
import { BookingRow } from "@/components/merchant/BookingRow";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatThaiCurrency, formatThaiDate } from "@/lib/utils";
import { DashboardClient } from "./DashboardClient";

export const metadata = { title: "แดชบอร์ด" };

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { merchant: true },
  });

  if (!user?.merchantId || !user.merchant) {
    redirect("/merchant/onboarding");
  }

  const merchantId = user.merchantId;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [todayBookings, pendingCount, allBookingsThisMonth] = await Promise.all([
    prisma.booking.findMany({
      where: { merchantId, bookingDate: today },
      include: { service: true, customer: true },
      orderBy: { startTime: "asc" },
    }),
    prisma.booking.count({
      where: { merchantId, status: "pending" },
    }),
    prisma.booking.findMany({
      where: {
        merchantId,
        bookingDate: { gte: new Date(today.getFullYear(), today.getMonth(), 1) },
        status: { in: ["confirmed", "completed"] },
      },
      select: { paymentAmount: true, service: { select: { price: true } } },
    }),
  ]);

  const monthRevenue = allBookingsThisMonth.reduce(
    (sum, b) => sum + (b.paymentAmount ?? b.service.price),
    0
  );

  return (
    <DashboardClient
      merchant={user.merchant}
      todayBookings={todayBookings as never}
      stats={{
        todayCount: todayBookings.length,
        pendingCount,
        monthRevenue,
        totalCustomers: 0,
      }}
    />
  );
}
