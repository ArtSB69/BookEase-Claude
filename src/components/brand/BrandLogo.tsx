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
  inverted?: boolean;
}

function BrandLogoWordmark({
  className,
  size = "md",
  inverted = false,
}: Omit<BrandLogoProps, "withLink" | "href">) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-black leading-none tracking-[-0.06em]",
        sizeMap[size],
        className
      )}
      aria-label="BookEase"
    >
      <span className={inverted ? "text-white" : "text-navy-800"}>Book</span>
      <span className={inverted ? "text-cyan-300" : "text-cyan-500"}>Ease</span>
    </span>
  );
}

export function BrandLogo({
  className,
  size = "md",
  withLink = false,
  href = "/",
  inverted = false,
}: BrandLogoProps) {
  const logo = <BrandLogoWordmark className={className} size={size} inverted={inverted} />;

  if (!withLink) return logo;

  return (
    <Link href={href} className="inline-flex items-center" aria-label="BookEase home">
      {logo}
    </Link>
  );
}
