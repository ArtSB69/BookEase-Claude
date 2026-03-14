import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ShareClient } from "./ShareClient";

export const metadata = { title: "แชร์ร้าน" };

export default async function SharePage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user?.merchantId) redirect("/merchant/onboarding");

  const merchant = await prisma.merchant.findUnique({ where: { id: user.merchantId } });
  if (!merchant) redirect("/merchant/onboarding");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const bookingUrl = `${appUrl}/${merchant.slug}`;
  const adminUrl = `${appUrl}/merchant/dashboard`;

  return (
    <ShareClient
      merchant={merchant}
      bookingUrl={bookingUrl}
      adminUrl={adminUrl}
    />
  );
}
