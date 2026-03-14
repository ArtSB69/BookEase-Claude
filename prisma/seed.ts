import { PrismaClient, BusinessType, BookingStatus, PaymentStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding BookEase database...");

  // ── Merchant 1: Salon ──────────────────────────────────────
  const salon = await prisma.merchant.upsert({
    where: { slug: "bloom-salon" },
    update: {},
    create: {
      name: "Bloom Salon",
      slug: "bloom-salon",
      businessType: BusinessType.salon,
      phone: "0812345678",
      email: "hello@bloomsalon.th",
      address: "123 Sukhumvit Soi 11, Bangkok 10110",
      description: "ร้านเสริมสวยครบวงจร บริการตัดผม ทำสี ยืด ดัด และบำรุงผม โดยช่างมืออาชีพ",
      coverImageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80",
      logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Bloom&backgroundColor=6366f1",
      isPublished: true,
      openTime: "09:00",
      closeTime: "20:00",
      workDays: ["MON", "TUE", "WED", "THU", "FRI", "SAT"],
      platformFee: 3.9,
    },
  });

  const salonServices = await Promise.all([
    prisma.service.upsert({
      where: { id: "svc-bloom-1" },
      update: {},
      create: {
        id: "svc-bloom-1",
        merchantId: salon.id,
        name: "ตัดผม + จัดทรง",
        description: "ตัดผมและจัดทรงโดยช่างผู้เชี่ยวชาญ",
        durationMinutes: 60,
        price: 350,
        category: "ตัดผม",
        sortOrder: 1,
        isActive: true,
      },
    }),
    prisma.service.upsert({
      where: { id: "svc-bloom-2" },
      update: {},
      create: {
        id: "svc-bloom-2",
        merchantId: salon.id,
        name: "ทำสีผม",
        description: "ทำสีผมครบทรง พร้อมบำรุงหลังทำสี",
        durationMinutes: 120,
        price: 1200,
        category: "ทำสี",
        sortOrder: 2,
        isActive: true,
      },
    }),
    prisma.service.upsert({
      where: { id: "svc-bloom-3" },
      update: {},
      create: {
        id: "svc-bloom-3",
        merchantId: salon.id,
        name: "ยืดผม",
        description: "ยืดผมตรง ลดความฟู นุ่มเป็นธรรมชาติ",
        durationMinutes: 180,
        price: 2500,
        category: "ยืด/ดัด",
        sortOrder: 3,
        isActive: true,
      },
    }),
    prisma.service.upsert({
      where: { id: "svc-bloom-4" },
      update: {},
      create: {
        id: "svc-bloom-4",
        merchantId: salon.id,
        name: "ทรีทเม้นท์ผม",
        description: "บำรุงผมเข้มข้น ฟื้นฟูผมเสีย",
        durationMinutes: 60,
        price: 600,
        category: "บำรุงผม",
        sortOrder: 4,
        isActive: true,
      },
    }),
  ]);

  // ── Merchant 2: Spa ──────────────────────────────────────
  const spa = await prisma.merchant.upsert({
    where: { slug: "serenity-spa" },
    update: {},
    create: {
      name: "Serenity Spa",
      slug: "serenity-spa",
      businessType: BusinessType.spa,
      phone: "0823456789",
      email: "book@serenityspa.th",
      address: "88 Thonglor Soi 5, Bangkok 10110",
      description: "สปาผ่อนคลายระดับพรีเมียม นวดไทย อโรมา และบำรุงผิว",
      coverImageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80",
      logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Serenity&backgroundColor=8b5cf6",
      isPublished: true,
      openTime: "10:00",
      closeTime: "22:00",
      workDays: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
      platformFee: 3.9,
    },
  });

  const spaServices = await Promise.all([
    prisma.service.upsert({
      where: { id: "svc-spa-1" },
      update: {},
      create: {
        id: "svc-spa-1",
        merchantId: spa.id,
        name: "นวดไทย",
        description: "นวดไทยแบบดั้งเดิม ผ่อนคลายกล้ามเนื้อ คลายเครียด",
        durationMinutes: 90,
        price: 800,
        category: "นวด",
        sortOrder: 1,
        isActive: true,
      },
    }),
    prisma.service.upsert({
      where: { id: "svc-spa-2" },
      update: {},
      create: {
        id: "svc-spa-2",
        merchantId: spa.id,
        name: "นวดอโรมาเทอราพี",
        description: "นวดผ่อนคลายด้วยน้ำมันหอมระเหย บำรุงผิวพรรณ",
        durationMinutes: 90,
        price: 1200,
        category: "นวด",
        sortOrder: 2,
        isActive: true,
      },
    }),
    prisma.service.upsert({
      where: { id: "svc-spa-3" },
      update: {},
      create: {
        id: "svc-spa-3",
        merchantId: spa.id,
        name: "บอดี้สครับ",
        description: "ขัดผิวเพื่อผิวขาวกระจ่างใส",
        durationMinutes: 60,
        price: 900,
        category: "บำรุงผิว",
        sortOrder: 3,
        isActive: true,
      },
    }),
  ]);

  // ── Merchant 3: Clinic ──────────────────────────────────────
  const clinic = await prisma.merchant.upsert({
    where: { slug: "glow-clinic" },
    update: {},
    create: {
      name: "Glow Clinic",
      slug: "glow-clinic",
      businessType: BusinessType.clinic,
      phone: "0834567890",
      email: "contact@glowclinic.th",
      address: "250 Phrom Phong, Sukhumvit 33, Bangkok",
      description: "คลินิกความงามครบวงจร ดูแลผิวหน้า ฉีดโบท็อก ฟิลเลอร์ และเลเซอร์",
      coverImageUrl: "https://images.unsplash.com/photo-1576765607924-3f7b8410a787?w=1200&q=80",
      logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Glow&backgroundColor=ec4899",
      isPublished: true,
      openTime: "09:00",
      closeTime: "19:00",
      workDays: ["MON", "TUE", "WED", "THU", "FRI", "SAT"],
      platformFee: 3.9,
    },
  });

  const clinicServices = await Promise.all([
    prisma.service.upsert({
      where: { id: "svc-clinic-1" },
      update: {},
      create: {
        id: "svc-clinic-1",
        merchantId: clinic.id,
        name: "ฉีดโบท็อก",
        description: "ลดริ้วรอย ผิวเรียบเนียน โดยแพทย์ผู้เชี่ยวชาญ",
        durationMinutes: 30,
        price: 4500,
        category: "โบท็อก/ฟิลเลอร์",
        sortOrder: 1,
        isActive: true,
      },
    }),
    prisma.service.upsert({
      where: { id: "svc-clinic-2" },
      update: {},
      create: {
        id: "svc-clinic-2",
        merchantId: clinic.id,
        name: "เลเซอร์ขาว",
        description: "เลเซอร์ลดจุดด่างดำ ผิวกระจ่างใส",
        durationMinutes: 45,
        price: 3500,
        category: "เลเซอร์",
        sortOrder: 2,
        isActive: true,
      },
    }),
    prisma.service.upsert({
      where: { id: "svc-clinic-3" },
      update: {},
      create: {
        id: "svc-clinic-3",
        merchantId: clinic.id,
        name: "ทำความสะอาดผิวหน้า",
        description: "ดูดสิว ทำความสะอาดลึก เปิดรูขุมขน",
        durationMinutes: 60,
        price: 1200,
        category: "ดูแลผิวหน้า",
        sortOrder: 3,
        isActive: true,
      },
    }),
  ]);

  // ── Demo Users (merchant owners) ──────────────────────────────────────
  const passwordHash = await bcrypt.hash("bookease123", 10);

  const user1 = await prisma.user.upsert({
    where: { email: "salon@bookease.th" },
    update: {},
    create: {
      name: "นิดา สุขใจ",
      email: "salon@bookease.th",
      phone: "0812345678",
      passwordHash,
      role: "owner",
      merchantId: salon.id,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "spa@bookease.th" },
    update: {},
    create: {
      name: "พิม อรุณ",
      email: "spa@bookease.th",
      phone: "0823456789",
      passwordHash,
      role: "owner",
      merchantId: spa.id,
    },
  });

  // ── Demo Customers ──────────────────────────────────────
  const customers = await Promise.all([
    prisma.customer.upsert({
      where: { id: "cust-1" },
      update: {},
      create: { id: "cust-1", name: "สมหญิง รักดี", phone: "0891234567", email: "somying@email.com" },
    }),
    prisma.customer.upsert({
      where: { id: "cust-2" },
      update: {},
      create: { id: "cust-2", name: "มาลี ดอกไม้", phone: "0892345678", email: "malee@email.com" },
    }),
    prisma.customer.upsert({
      where: { id: "cust-3" },
      update: {},
      create: { id: "cust-3", name: "วิชัย ดีงาม", phone: "0893456789" },
    }),
    prisma.customer.upsert({
      where: { id: "cust-4" },
      update: {},
      create: { id: "cust-4", name: "ปนัดดา มงคล", phone: "0894567890" },
    }),
    prisma.customer.upsert({
      where: { id: "cust-5" },
      update: {},
      create: { id: "cust-5", name: "อนุชา สว่าง", phone: "0895678901" },
    }),
  ]);

  // ── Demo Bookings (today + recent) ──────────────────────────────────────
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const bookings = await Promise.all([
    // Today's bookings for salon
    prisma.booking.upsert({
      where: { id: "bk-1" },
      update: {},
      create: {
        id: "bk-1",
        merchantId: salon.id,
        serviceId: salonServices[0].id,
        customerId: customers[0].id,
        bookingDate: today,
        startTime: "10:00",
        endTime: "11:00",
        status: BookingStatus.confirmed,
        paymentStatus: PaymentStatus.unpaid,
        paymentAmount: 350,
        note: "ลูกค้าขาประจำ ชอบทรงสั้นด้านข้าง",
      },
    }),
    prisma.booking.upsert({
      where: { id: "bk-2" },
      update: {},
      create: {
        id: "bk-2",
        merchantId: salon.id,
        serviceId: salonServices[1].id,
        customerId: customers[1].id,
        bookingDate: today,
        startTime: "11:30",
        endTime: "13:30",
        status: BookingStatus.confirmed,
        paymentStatus: PaymentStatus.unpaid,
        paymentAmount: 1200,
      },
    }),
    prisma.booking.upsert({
      where: { id: "bk-3" },
      update: {},
      create: {
        id: "bk-3",
        merchantId: salon.id,
        serviceId: salonServices[0].id,
        customerId: customers[2].id,
        bookingDate: today,
        startTime: "14:00",
        endTime: "15:00",
        status: BookingStatus.pending,
        paymentStatus: PaymentStatus.unpaid,
        paymentAmount: 350,
      },
    }),
    prisma.booking.upsert({
      where: { id: "bk-4" },
      update: {},
      create: {
        id: "bk-4",
        merchantId: salon.id,
        serviceId: salonServices[2].id,
        customerId: customers[3].id,
        bookingDate: today,
        startTime: "15:00",
        endTime: "18:00",
        status: BookingStatus.pending,
        paymentStatus: PaymentStatus.unpaid,
        paymentAmount: 2500,
      },
    }),
    // Spa bookings
    prisma.booking.upsert({
      where: { id: "bk-5" },
      update: {},
      create: {
        id: "bk-5",
        merchantId: spa.id,
        serviceId: spaServices[0].id,
        customerId: customers[4].id,
        bookingDate: today,
        startTime: "13:00",
        endTime: "14:30",
        status: BookingStatus.confirmed,
        paymentStatus: PaymentStatus.paid,
        paymentAmount: 800,
      },
    }),
  ]);

  // ── Shop Assets ──────────────────────────────────────
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  await prisma.shopAsset.upsert({
    where: { id: "asset-bloom-booking" },
    update: {},
    create: {
      id: "asset-bloom-booking",
      merchantId: salon.id,
      type: "booking_link",
      url: `${appUrl}/${salon.slug}`,
    },
  });

  await prisma.shopAsset.upsert({
    where: { id: "asset-bloom-admin" },
    update: {},
    create: {
      id: "asset-bloom-admin",
      merchantId: salon.id,
      type: "admin_link",
      url: `${appUrl}/merchant/dashboard`,
    },
  });

  console.log("✅ Seed complete!");
  console.log(`   Merchants: ${[salon.name, spa.name, clinic.name].join(", ")}`);
  console.log(`   Services:  ${salonServices.length + spaServices.length + clinicServices.length}`);
  console.log(`   Customers: ${customers.length}`);
  console.log(`   Bookings:  ${bookings.length}`);
  console.log("\n📧 Demo login:");
  console.log("   Email: salon@bookease.th  Password: bookease123");
  console.log("   Email: spa@bookease.th    Password: bookease123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
