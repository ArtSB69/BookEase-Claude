import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { BookingsClient } from "./BookingsClient";

export const metadata = { title: "การจอง" };

type Props = {
  searchParams: Promise<{
    date?: string;
    status?: string;
  }>;
};

export default async function BookingsPage({ searchParams }: Props) {
  const params = await searchParams;

  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  if (!user?.merchantId) redirect("/merchant/onboarding");

  const dateStr = params.date ?? new Date().toISOString().split("T")[0];
  const statusFilter = params.status;

  const date = new Date(dateStr);
  date.setHours(0, 0, 0, 0);

  const bookings = await prisma.booking.findMany({
    where: {
      merchantId: user.merchantId,
      bookingDate: date,
      ...(statusFilter ? { status: statusFilter as never } : {}),
    },
    include: {
      service: true,
      customer: true,
    },
    orderBy: {
      startTime: "asc",
    },
  });

  return (
    <BookingsClient
      bookings={bookings as never}
      initialDate={dateStr}
      initialStatus={statusFilter}
      merchantId={user.merchantId}
    />
  );
}
