import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const serviceSchema = z.object({
  merchantId: z.string(),
  name: z.string().min(1),
  description: z.string().optional(),
  durationMinutes: z.number().min(15).max(480),
  price: z.number().min(0),
  category: z.string().optional(),
  sortOrder: z.number().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = serviceSchema.parse(body);
    const service = await prisma.service.create({ data });
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
