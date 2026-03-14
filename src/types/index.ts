import type { Merchant, Service, Booking, Customer, Payment, User } from "@prisma/client";

export type { Merchant, Service, Booking, Customer, Payment, User };

export type MerchantWithServices = Merchant & {
  services: Service[];
};

export type BookingWithDetails = Booking & {
  service: Service;
  customer: Customer;
  merchant: Merchant;
  payments?: Payment[];
};

export type BookingWithServiceAndCustomer = Booking & {
  service: Service;
  customer: Customer;
};

export type MerchantStats = {
  todayBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  totalRevenue: number;
};

export type TimeSlot = {
  time: string;
  available: boolean;
};

export type OnboardingData = {
  step: number;
  name: string;
  businessType: string;
  phone: string;
  email: string;
  address: string;
  description: string;
  services: Array<{
    name: string;
    description: string;
    durationMinutes: number;
    price: number;
    category: string;
  }>;
};

export type BookingFormData = {
  serviceId: string;
  bookingDate: string;
  startTime: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  note?: string;
};
