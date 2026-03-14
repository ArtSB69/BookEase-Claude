import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { BookingFlowClient } from "./BookingFlowClient";

interface Props {
  params: { slug: string };
  searchParams: { serviceId?: string };
}

export const metadata: Metadata = { title: "จองบริการ" };

export default async function BookPage({ params, searchParams }: Props) {
  const merchant = await prisma.merchant.findUnique({
    where: { slug: params.slug, isPublished: true },
    include: {
      services: { where: { isActive: true }, orderBy: { sortOrder: "asc" } },
    },
  });

  if (!merchant) notFound();

  const preSelectedService = searchParams.serviceId
    ? merchant.services.find((s) => s.id === searchParams.serviceId) ?? null
    : null;

  return (
    <BookingFlowClient
      merchant={merchant}
      services={merchant.services}
      preSelectedService={preSelectedService}
    />
  );
}
