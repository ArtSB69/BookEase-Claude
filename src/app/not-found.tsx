import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-6xl font-bold text-brand-200">404</p>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">ไม่พบหน้านี้</h1>
        <p className="mt-2 text-gray-500">อาจถูกย้ายหรือลบไปแล้ว</p>
        <Link href="/" className="mt-6 inline-block">
          <Button size="lg">กลับหน้าหลัก</Button>
        </Link>
      </div>
    </div>
  );
}
