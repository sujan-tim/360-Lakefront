import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

const FeedbackSchema = z.object({
  name: z.string().trim().min(2).max(60),
  rating: z.coerce.number().int().min(1).max(5),
  message: z.string().trim().min(10).max(600),
  website: z.string().optional() // honeypot
});

export async function GET() {
  try {
    const items = await prisma.feedback.findMany({
      orderBy: { createdAt: "desc" },
      take: 20
    });

    return NextResponse.json({ items }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = FeedbackSchema.safeParse(json);
    if (!parsed.success) return NextResponse.json({ error: "Invalid feedback." }, { status: 400 });

    const { name, rating, message, website } = parsed.data;
    if (website && website.trim().length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const item = await prisma.feedback.create({
      data: { name, rating, message }
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Unable to submit feedback." }, { status: 500 });
  }
}

