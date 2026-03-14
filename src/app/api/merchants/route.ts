import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { slugify } from "@/lib/utils";
import { normalizePhone } from "@/lib/otp";

const createMerchantSchema = z.object({
  // User
  userName: z.string().min(1),
  phone: z.string().min(9),
  // Merchant
  name: z.string().min(1),
  businessType: z.string(),
  address: z.string().optional(),
  description: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = createMerchantSchema.parse({
      ...body,
      phone: normalizePhone(body.phone ?? ""),
    });

    // ตรวจเบอร์ซ้ำ
    const existingUser = await prisma.user.findFirst({ where: { phone: data.phone } });
    if (existingUser) {
      return NextResponse.json({ error: "เบอร์โทรนี้มีบัญชีอยู่แล้ว" }, { status: 400 });
    }

    const slug = slugify(data.name);
    const existingSlug = await prisma.merchant.findUnique({ where: { slug } });
    const finalSlug = existingSlug ? `${slug}-${Date.now()}` : slug;

    const merchant = await prisma.merchant.create({
      data: {
        name: data.name,
        slug: finalSlug,
        businessType: data.businessType as never,
        phone: data.phone,
        address: data.address,
        description: data.description,
        isPublished: false,
      },
    });

    const user = await prisma.user.create({
      data: {
        name: data.userName,
        phone: data.phone,
        role: "owner",
        merchantId: merchant.id,
      },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    await prisma.shopAsset.createMany({
      data: [
        { merchantId: merchant.id, type: "booking_link", url: `${appUrl}/${finalSlug}` },
        { merchantId: merchant.id, type: "admin_link", url: `${appUrl}/merchant/dashboard` },
      ],
    });

    return NextResponse.json({ merchant, userId: user.id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
