# Hotel + Restaurant Website

Next.js website for a hotel + restaurant with:
- Home
- Rooms + room booking (Stripe Checkout payment)
- Restaurants & Bars
- Menu
- Gallery
- Feedback form + list

## 1) Setup

### Install
```bash
npm install
```

### Environment variables
```bash
cp .env.example .env
```

Fill in:
- `STRIPE_SECRET_KEY` (Stripe test secret key)
- `STRIPE_WEBHOOK_SECRET` (optional, for webhooks)

### Database (Prisma + SQLite)
```bash
npx prisma migrate dev --name init
```

## 2) Run locally
```bash
npm run dev
```
Open `http://localhost:3000`.

## 3) Stripe webhook (optional but recommended)

To automatically mark bookings as **PAID**, forward Stripe events to:
- `POST /api/webhooks/stripe`

With Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the printed webhook secret into `STRIPE_WEBHOOK_SECRET` in `.env`.

## 4) Customize content

- Hotel + Restaurant name, address, phone: `app/layout.tsx`
- Room types/prices/images: `lib/rooms.ts`
- Restaurants & bars data: `lib/dining.ts`
- Menu categories/items/prices: `lib/menu.ts` (shown on `/menu`)
- Gallery images: replace files in `public/gallery/`
- Dining images: replace files in `public/dining/`
