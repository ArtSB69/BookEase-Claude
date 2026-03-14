import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { normalizePhone } from "@/lib/otp";
import { z } from "zod";

const schema = z.object({
  phone: z.string(),
  code: z.string().length(6, "รหัส OTP ต้องมี 6 หลัก"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, code } = schema.parse({
      phone: normalizePhone(body.phone ?? ""),
      code: body.code ?? "",
    });

    const otp = await prisma.otpCode.findFirst({
      where: {
        phone,
        code,
        used: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!otp) {
      return NextResponse.json(
        { error: "รหัส OTP ไม่ถูกต้องหรือหมดอายุ" },
        { status: 400 }
      );
    }

    // ไม่ mark as used ตรงนี้ — จะ mark เมื่อ signIn จริง
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}
