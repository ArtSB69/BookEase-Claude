import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { addMinutes } from "@/lib/utils";

const createBookingSchema = z.object({
  merchantId: z.string(),
  serviceId: z.string(),
  bookingDate: z.string(),
  startTime: z.string(),
  endTime: z.string().optional(),
  customerName: z.string().min(1),
  customerPhone: z.string().min(9),
  customerEmail: z.string().email().optional().or(z.literal("")),
  note: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = createBookingSchema.parse(body);

    const service = await prisma.service.findUnique({ where: { id: data.serviceId } });
    if (!service) return NextResponse.json({ error: "Service not found" }, { status: 404 });

    const endTime = data.endTime || addMinutes(data.startTime, service.durationMinutes);

    // Find or create customer
    let customer = await prisma.customer.findFirst({
      where: { phone: data.customerPhone },
    });
    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          name: data.customerName,
          phone: data.customerPhone,
          email: data.customerEmail || null,
        },
      });
    }

    const booking = await prisma.booking.create({
      data: {
        merchantId: data.merchantId,
        serviceId: data.serviceId,
        customerId: customer.id,
        bookingDate: new Date(data.bookingDate),
        startTime: data.startTime,
        endTime,
        note: data.note || null,
        paymentAmount: service.price,
        status: "pending",
        paymentStatus: "unpaid",
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const merchantId = searchParams.get("merchantId");
  const date = searchParams.get("date");
  const status = searchParams.get("status");

  if (!merchantId) return NextResponse.json({ error: "merchantId required" }, { status: 400 });

  const where: Record<string, unknown> = { merchantId };
  if (date) where.bookingDate = new Date(date);
  if (status) where.status = status;

  const bookings = await prisma.booking.findMany({
    where,
    include: { service: true, customer: true },
    orderBy: { startTime: "asc" },
  });

  return NextResponse.json(bookings);
}
