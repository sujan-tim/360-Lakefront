-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "roomSlug" TEXT NOT NULL,
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3) NOT NULL,
    "nights" INTEGER NOT NULL DEFAULT 1,
    "adults" INTEGER NOT NULL,
    "children" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "notes" TEXT,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "totalAmountCents" INTEGER NOT NULL,
    "exchangeRateNprPerUsd" INTEGER NOT NULL DEFAULT 145,
    "totalAmountNpr" INTEGER NOT NULL DEFAULT 0,
    "totalAmountNprBase" INTEGER NOT NULL DEFAULT 0,
    "discountNpr" INTEGER NOT NULL DEFAULT 0,
    "paymentStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "paymentProvider" TEXT,
    "paymentReference" TEXT,
    "stripeCheckoutSessionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Booking_stripeCheckoutSessionId_key" ON "Booking"("stripeCheckoutSessionId");

-- CreateIndex
CREATE INDEX "Booking_roomSlug_checkIn_checkOut_idx" ON "Booking"("roomSlug", "checkIn", "checkOut");

