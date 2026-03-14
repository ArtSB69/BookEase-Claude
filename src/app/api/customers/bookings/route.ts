import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Find customer by email
  const customer = await prisma.customer.findFirst({
    where: { email: session.user.email },
  });

  if (!customer) {
    return NextResponse.json([]);
  }

  const bookings = await prisma.booking.findMany({
    where: { customerId: customer.id },
    include: {
      service: { select: { name: true, price: true } },
      merchant: { select: { name: true, slug: true } },
    },
    orderBy: { bookingDate: "desc" },
    take: 50,
  });

  return NextResponse.json(bookings);
}
