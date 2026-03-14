import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { status, note, paymentStatus } = body;

    const booking = await prisma.booking.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(note !== undefined && { note }),
        ...(paymentStatus && { paymentStatus }),
      },
      include: { service: true, customer: true },
    });

    return NextResponse.json(booking);
  } catch {
    return NextResponse.json({ error: "Not found or update failed" }, { status: 404 });
  }
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const booking = await prisma.booking.findUnique({
    where: { id: params.id },
    include: { service: true, customer: true, merchant: true },
  });

  if (!booking) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(booking);
}
