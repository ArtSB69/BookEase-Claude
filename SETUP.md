# BookEase — Setup Guide

## Prerequisites
- Node.js 20+
- PostgreSQL (local or cloud e.g. Supabase, Neon)
- npm / pnpm / bun

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env — set DATABASE_URL and NEXTAUTH_SECRET

# 3. Set up database
npm run db:generate    # generate Prisma client
npm run db:push        # push schema to DB
npm run db:seed        # seed demo data

# 4. Run dev server
npm run dev
```

Open http://localhost:3000

## Demo Accounts

| Email | Password | Role |
|-------|----------|------|
| salon@bookease.th | bookease123 | Salon owner |
| spa@bookease.th | bookease123 | Spa owner |

## Demo Storefronts

- http://localhost:3000/bloom-salon  (Salon)
- http://localhost:3000/serenity-spa (Spa)
- http://localhost:3000/glow-clinic  (Clinic)

## Key URLs

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/[slug]` | Merchant public storefront |
| `/[slug]/book` | Booking flow |
| `/merchant/onboarding` | Merchant signup wizard |
| `/merchant/dashboard` | Merchant dashboard |
| `/merchant/bookings` | Booking management |
| `/merchant/services` | Service management |
| `/merchant/share` | QR & share page |
| `/merchant/settings` | Shop settings |
| `/auth/login` | Login |
| `/account` | Customer account |

## Tech Stack

- **Next.js 15** — App Router, Server Components
- **TypeScript** — Full type safety
- **Tailwind CSS** — Mobile-first styling
- **Prisma + PostgreSQL** — Database ORM
- **NextAuth v5** — Authentication
- **Radix UI** — Accessible UI primitives
- **QRCode** — QR generation
- **Zod** — Schema validation

## Architecture

```
src/
├── app/
│   ├── (public)/[slug]/     # Merchant storefront + booking flow
│   ├── (customer)/account/  # Customer account
│   ├── (merchant)/merchant/ # Merchant admin
│   ├── auth/                # Login/signup
│   └── api/                 # API routes
├── components/
│   ├── ui/                  # Base components
│   ├── booking/             # Booking-specific
│   ├── merchant/            # Merchant-specific
│   └── layout/              # Nav/layout
├── lib/                     # Prisma, auth, utils
└── types/                   # Shared types
```
