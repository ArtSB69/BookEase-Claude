import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const merchant = await prisma.merchant.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(merchant);
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const merchant = await prisma.merchant.findUnique({
    where: { id: params.id },
    include: { services: { orderBy: { sortOrder: "asc" } } },
  });
  if (!merchant) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(merchant);
}
