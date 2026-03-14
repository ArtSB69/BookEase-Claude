import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { normalizePhone } from "@/lib/otp";
import { z } from "zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
        token.merchantId = (user as { merchantId?: string }).merchantId;
        token.phone = (user as { phone?: string }).phone;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
        (session.user as { merchantId?: string }).merchantId = token.merchantId as string;
        (session.user as { phone?: string }).phone = token.phone as string;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        phone: { label: "Phone", type: "tel" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        const parsed = z
          .object({ phone: z.string(), otp: z.string().length(6) })
          .safeParse({
            phone: normalizePhone((credentials?.phone as string) ?? ""),
            otp: credentials?.otp,
          });

        if (!parsed.success) return null;

        const { phone, otp } = parsed.data;

        // ตรวจสอบ OTP
        const otpRecord = await prisma.otpCode.findFirst({
          where: {
            phone,
            code: otp,
            used: false,
            expiresAt: { gt: new Date() },
          },
          orderBy: { createdAt: "desc" },
        });

        if (!otpRecord) return null;

        // Mark OTP as used
        await prisma.otpCode.update({
          where: { id: otpRecord.id },
          data: { used: true },
        });

        const user = await prisma.user.findFirst({
          where: { phone },
        });

        if (!user) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          merchantId: user.merchantId,
        };
      },
    }),
  ],
});
