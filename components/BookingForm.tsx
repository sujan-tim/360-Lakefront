"use client";

import { useMemo, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { ROOMS, getRoomBySlug } from "@/lib/rooms";
import { formatMoney } from "@/lib/money";
import { dateStringToUtcNoon } from "@/lib/dates";

type Props = {
  initialRoomSlug?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
};

type ApiState =
  | { status: "idle"; error?: undefined }
  | { status: "submitting"; error?: undefined }
  | { status: "error"; error: string };

function formatDateInput(date: Date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export default function BookingForm({ initialRoomSlug, initialCheckIn, initialCheckOut }: Props) {
  const [roomSlug, setRoomSlug] = useState<string>(initialRoomSlug ?? ROOMS[0]?.slug ?? "standard");
  const [checkIn, setCheckIn] = useState<string>(initialCheckIn ?? "");
  const [checkOut, setCheckOut] = useState<string>(initialCheckOut ?? "");
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [apiState, setApiState] = useState<ApiState>({ status: "idle" });

  const room = useMemo(() => getRoomBySlug(roomSlug) ?? ROOMS[0] ?? null, [roomSlug]);

  const nights = useMemo(() => {
    const start = dateStringToUtcNoon(checkIn);
    const end = dateStringToUtcNoon(checkOut);
    if (!start || !end) return 0;
    const diff = differenceInCalendarDays(end, start);
    return diff > 0 ? diff : 0;
  }, [checkIn, checkOut]);

  const estimatedTotal = useMemo(() => (room ? nights * room.pricePerNightCents : 0), [nights, room]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    setApiState({ status: "submitting" });

    try {
      const response = await fetch("/api/bookings/create", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          roomSlug,
          checkIn,
          checkOut,
          adults,
          children,
          name,
          email,
          phone,
          notes
        })
      });

      const json = (await response.json()) as { bookingId?: string; error?: string };
      if (!response.ok || !json.bookingId) {
        setApiState({ status: "error", error: json.error || "Unable to start checkout." });
        return;
      }

      window.location.assign(`/checkout?booking_id=${encodeURIComponent(json.bookingId)}`);
    } catch (err) {
      setApiState({ status: "error", error: "Network error. Please try again." });
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div style={{ display: "grid", gap: 14 }}>
        <div>
          <label className="label" htmlFor="roomSlug">
            Room type
          </label>
          <select
            id="roomSlug"
            className="select"
            value={roomSlug}
            onChange={(e) => setRoomSlug(e.target.value)}
          >
            {ROOMS.map((r) => (
              <option key={r.slug} value={r.slug}>
                {r.name} — {formatMoney(r.pricePerNightCents, "USD")}/night
              </option>
            ))}
          </select>
        </div>

        <div className="grid2">
          <div>
            <label className="label" htmlFor="checkIn">
              Check-in
            </label>
            <input
              id="checkIn"
              className="input"
              type="date"
              value={checkIn}
              onChange={(e) => {
                const next = e.target.value;
                setCheckIn(next);
                if (checkOut && next && checkOut <= next) {
                  const d = new Date(next);
                  if (!Number.isNaN(d.getTime())) setCheckOut(formatDateInput(addDays(d, 1)));
                }
              }}
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="checkOut">
              Check-out
            </label>
            <input
              id="checkOut"
              className="input"
              type="date"
              value={checkOut}
              min={checkIn || undefined}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid2">
          <div>
            <label className="label" htmlFor="adults">
              Adults
            </label>
            <input
              id="adults"
              className="input"
              type="number"
              min={1}
              max={10}
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="children">
              Children
            </label>
            <input
              id="children"
              className="input"
              type="number"
              min={0}
              max={10}
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              required
            />
          </div>
        </div>

        <div className="grid2">
          <div>
            <label className="label" htmlFor="name">
              Full name
            </label>
            <input id="name" className="input" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="label" htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              className="input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="label" htmlFor="notes">
            Notes (optional)
          </label>
          <textarea
            id="notes"
            className="textarea"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Late check-in, special requests, etc."
          />
        </div>

        <div className="card" style={{ borderColor: "var(--border)" }}>
          <div className="cardInner" style={{ display: "grid", gap: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
              <div style={{ color: "var(--muted)" }}>Estimated total</div>
              <div style={{ fontWeight: 800 }}>{formatMoney(estimatedTotal, "USD")}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
              <div style={{ color: "var(--muted)" }}>Nights</div>
              <div>{nights || "—"}</div>
            </div>
            {room ? (
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div style={{ color: "var(--muted)" }}>Capacity</div>
                <div>
                  Up to {room.capacity} guest{room.capacity === 1 ? "" : "s"}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {apiState.status === "error" ? <div className="error">{apiState.error}</div> : null}

        <button
          className="btn btnPrimary"
          type="submit"
          disabled={apiState.status === "submitting" || nights < 1}
          aria-disabled={apiState.status === "submitting" || nights < 1}
        >
          {apiState.status === "submitting" ? "Continuing…" : "Continue to payment"}
        </button>
        <div style={{ color: "var(--muted)", fontSize: 13 }}>
          Next step: choose Card (USD) or eSewa (NPR) to complete payment.
        </div>
      </div>
    </form>
  );
}
