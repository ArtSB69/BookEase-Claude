import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { SettingsClient } from "./SettingsClient";

export const metadata = { title: "ตั้งค่า" };

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user?.merchantId) redirect("/merchant/onboarding");

  const merchant = await prisma.merchant.findUnique({ where: { id: user.merchantId } });
  if (!merchant) redirect("/merchant/onboarding");

  return <SettingsClient merchant={merchant} />;
}
