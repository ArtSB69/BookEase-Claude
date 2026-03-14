import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { MerchantNav, MobileBottomNav } from "@/components/layout/MerchantNav";

export default async function MerchantLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login?callbackUrl=/merchant/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MerchantNav />
      {/* Main content — offset by sidebar on desktop */}
      <main className="lg:pl-60 pb-20 lg:pb-0">
        <div className="mx-auto max-w-4xl px-4 py-6">
          {children}
        </div>
      </main>
      <MobileBottomNav />
    </div>
  );
}
