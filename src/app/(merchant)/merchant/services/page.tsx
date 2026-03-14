import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ServicesClient } from "./ServicesClient";

export const metadata = { title: "บริการ" };

export default async function ServicesPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user?.merchantId) redirect("/merchant/onboarding");

  const services = await prisma.service.findMany({
    where: { merchantId: user.merchantId },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return <ServicesClient services={services} merchantId={user.merchantId} />;
}
