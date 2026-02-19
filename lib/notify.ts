import type { Booking } from "@prisma/client";
import { formatMoney, formatNpr } from "@/lib/money";
import { getRoomBySlug } from "@/lib/rooms";

type NotifyKind = "created" | "paid";

function getAdminEmail() {
  return process.env.ADMIN_EMAIL?.trim() || "";
}

function getResendApiKey() {
  return process.env.RESEND_API_KEY?.trim() || "";
}

function getFromEmail() {
  // Resend supports an onboarding sender for testing; for production you should use a verified domain.
  return process.env.RESEND_FROM?.trim() || "onboarding@resend.dev";
}

function getReplyToEmail() {
  return process.env.RESEND_REPLY_TO?.trim() || getAdminEmail() || undefined;
}

function bookingSummaryLines(booking: Booking) {
  const room = getRoomBySlug(booking.roomSlug);
  const roomName = room?.name ?? booking.roomSlug;

  const lines: string[] = [];
  lines.push(`Booking ID: ${booking.id}`);
  lines.push(`Room: ${roomName}`);
  lines.push(`Check-in: ${booking.checkIn.toISOString().slice(0, 10)}`);
  lines.push(`Check-out: ${booking.checkOut.toISOString().slice(0, 10)}`);
  lines.push(`Nights: ${booking.nights}`);
  lines.push(`Guests: ${booking.adults} adult(s), ${booking.children} child(ren)`);
  lines.push(`Name: ${booking.name}`);
  lines.push(`Email: ${booking.email}`);
  lines.push(`Phone: ${booking.phone}`);
  if (booking.notes) lines.push(`Notes: ${booking.notes}`);
  lines.push(`Payment status: ${booking.paymentStatus}`);
  if (booking.paymentProvider) lines.push(`Payment provider: ${booking.paymentProvider}`);
  if (booking.paymentReference) lines.push(`Payment reference: ${booking.paymentReference}`);
  lines.push(`Total (USD): ${formatMoney(booking.totalAmountCents, booking.currency)}`);
  lines.push(`Total (NPR): ${formatNpr(booking.totalAmountNpr)}`);
  if (booking.discountNpr > 0) lines.push(`Discount (NPR): -${formatNpr(booking.discountNpr)}`);
  lines.push(`FX rate: 1 USD = ${booking.exchangeRateNprPerUsd} NPR`);
  return lines;
}

async function sendResendEmail(params: {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}) {
  const apiKey = getResendApiKey();
  const to = params.to.trim();
  if (!apiKey || !to) return;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      from: getFromEmail(),
      to: [to],
      reply_to: params.replyTo,
      subject: params.subject,
      text: params.text,
      html: params.html
    })
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Resend error (${response.status}): ${body || response.statusText}`);
  }
}

export async function notifyAdminBooking(kind: NotifyKind, booking: Booking) {
  const adminEmail = getAdminEmail();
  if (!adminEmail) return;

  const room = getRoomBySlug(booking.roomSlug);
  const roomName = room?.name ?? booking.roomSlug;

  const subjectPrefix = kind === "paid" ? "Booking paid" : "New booking";
  const subject = `${subjectPrefix} — ${roomName} (${booking.id})`;
  const lines = bookingSummaryLines(booking);
  const text = lines.join("\n");
  const html = `<pre style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; white-space: pre-wrap;">${text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")}</pre>`;

  try {
    await sendResendEmail({ to: adminEmail, subject, text, html, replyTo: getReplyToEmail() });
  } catch (err) {
    console.error("[notifyAdminBooking] Failed to send email:", err);
  }
}

export async function notifyCustomerBookingPaid(booking: Booking) {
  const customerEmail = booking.email?.trim();
  if (!customerEmail) return;

  const room = getRoomBySlug(booking.roomSlug);
  const roomName = room?.name ?? "Room booking";

  const checkIn = booking.checkIn.toISOString().slice(0, 10);
  const checkOut = booking.checkOut.toISOString().slice(0, 10);

  const subject = `Booking confirmed — ${roomName} (${checkIn} to ${checkOut})`;

  const lines: string[] = [];
  lines.push("Your booking is confirmed. Thank you!");
  lines.push("");
  lines.push(`Booking ID: ${booking.id}`);
  lines.push(`Room: ${roomName}`);
  lines.push(`Check-in: ${checkIn}`);
  lines.push(`Check-out: ${checkOut}`);
  lines.push(`Nights: ${booking.nights}`);
  lines.push(`Guests: ${booking.adults} adult(s), ${booking.children} child(ren)`);
  lines.push("");
  lines.push(`Paid (USD): ${formatMoney(booking.totalAmountCents, booking.currency)}`);
  if (booking.paymentProvider === "ESEWA") {
    lines.push(`Paid (NPR): ${formatNpr(booking.totalAmountNpr)}`);
    if (booking.discountNpr > 0) lines.push(`Discount applied (NPR): -${formatNpr(booking.discountNpr)}`);
    lines.push(`Exchange rate used: 1 USD = ${booking.exchangeRateNprPerUsd} NPR`);
  }
  lines.push("");
  lines.push("Need help?");
  lines.push("Phone/WhatsApp: +977 9846265394");
  lines.push("Email: 360lakefront@gmail.com");

  const text = lines.join("\n");
  const html = `<div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
    <h2 style="margin:0 0 12px;">Booking confirmed</h2>
    <p style="margin:0 0 16px;">Your booking is confirmed. Thank you!</p>
    <div style="padding:14px 16px; border:1px solid #e5e5e5; border-radius:12px;">
      <div><strong>Booking ID:</strong> ${booking.id}</div>
      <div><strong>Room:</strong> ${roomName}</div>
      <div><strong>Check-in:</strong> ${checkIn}</div>
      <div><strong>Check-out:</strong> ${checkOut}</div>
      <div><strong>Nights:</strong> ${booking.nights}</div>
      <div><strong>Guests:</strong> ${booking.adults} adult(s), ${booking.children} child(ren)</div>
      <div style="margin-top:10px;"><strong>Paid (USD):</strong> ${formatMoney(booking.totalAmountCents, booking.currency)}</div>
      ${
        booking.paymentProvider === "ESEWA"
          ? `<div><strong>Paid (NPR):</strong> ${formatNpr(booking.totalAmountNpr)}</div>
             ${booking.discountNpr > 0 ? `<div><strong>Discount:</strong> -${formatNpr(booking.discountNpr)}</div>` : ""}
             <div><strong>FX rate used:</strong> 1 USD = ${booking.exchangeRateNprPerUsd} NPR</div>`
          : ""
      }
    </div>
    <p style="margin:16px 0 0; color:#555;">
      Need help? Call/WhatsApp <strong>+977 9846265394</strong> or email <strong>360lakefront@gmail.com</strong>.
    </p>
  </div>`;

  try {
    await sendResendEmail({ to: customerEmail, subject, text, html, replyTo: getReplyToEmail() });
  } catch (err) {
    console.error("[notifyCustomerBookingPaid] Failed to send email:", err);
  }
}
