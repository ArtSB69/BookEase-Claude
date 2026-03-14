import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateOtp, sendOtp, normalizePhone } from "@/lib/otp";
import { z } from "zod";

const schema = z.object({
  phone: z.string().regex(/^0[0-9]{8,9}$/, "เบอร์โทรไม่ถูกต้อง (ตัวอย่าง: 0812345678)"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone } = schema.parse({ phone: normalizePhone(body.phone ?? "") });

    const code = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 นาที

    // ยกเลิก OTP เก่าของเบอร์นี้
    await prisma.otpCode.updateMany({
      where: { phone, used: false },
      data: { used: true },
    });

    await prisma.otpCode.create({
      data: { phone, code, expiresAt },
    });

    await sendOtp(phone, code);

    return NextResponse.json({
      success: true,
      // คืน OTP ใน dev mode เพื่อทดสอบ (ถอดออกก่อน production)
      ...(process.env.NODE_ENV !== "production" && { devOtp: code }),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "ไม่สามารถส่ง OTP ได้" }, { status: 500 });
  }
}
