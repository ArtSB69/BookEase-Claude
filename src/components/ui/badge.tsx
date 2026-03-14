import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-brand-100 text-brand-700",
        secondary: "bg-gray-100 text-gray-700",
        success: "bg-emerald-100 text-emerald-700",
        warning: "bg-amber-100 text-amber-700",
        danger: "bg-red-100 text-red-700",
        outline: "border border-gray-200 text-gray-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export function bookingStatusBadge(status: string) {
  const map: Record<string, { label: string; variant: BadgeProps["variant"] }> = {
    pending:   { label: "รอยืนยัน",    variant: "warning" },
    confirmed: { label: "ยืนยันแล้ว",  variant: "default" },
    completed: { label: "เสร็จสิ้น",   variant: "success" },
    cancelled: { label: "ยกเลิก",       variant: "danger"  },
    no_show:   { label: "ไม่มา",        variant: "secondary" },
  };
  const config = map[status] ?? { label: status, variant: "secondary" as const };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function paymentStatusBadge(status: string) {
  const map: Record<string, { label: string; variant: BadgeProps["variant"] }> = {
    unpaid:   { label: "ยังไม่ชำระ",      variant: "secondary" },
    pending:  { label: "รอชำระ",           variant: "warning" },
    paid:     { label: "ชำระแล้ว",         variant: "success" },
    refunded: { label: "คืนเงินแล้ว",      variant: "outline"  },
    failed:   { label: "ชำระไม่สำเร็จ",   variant: "danger"   },
  };
  const config = map[status] ?? { label: status, variant: "secondary" as const };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export { Badge, badgeVariants };
