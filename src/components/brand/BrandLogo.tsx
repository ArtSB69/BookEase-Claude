"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandLogoSize = "sm" | "md" | "lg";

const sizeMap: Record<BrandLogoSize, string> = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl",
};

interface BrandLogoProps {
  className?: string;
  size?: BrandLogoSize;
  withLink?: boolean;
  href?: string;
}

function BrandLogoWordmark({ className, size = "md" }: Omit<BrandLogoProps, "withLink" | "href">) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-black leading-none tracking-[-0.06em]",
        sizeMap[size],
        className
      )}
      aria-label="BookEase"
    >
      <span className="text-navy-800">Book</span>
      <span className="text-cyan-500">Ease</span>
    </span>
  );
}

export function BrandLogo({ className, size = "md", withLink = false, href = "/" }: BrandLogoProps) {
  const logo = <BrandLogoWordmark className={className} size={size} />;

  if (!withLink) return logo;

  return (
    <Link href={href} className="inline-flex items-center" aria-label="BookEase home">
      {logo}
    </Link>
  );
}
