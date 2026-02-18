"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  bookingId: string;
};

type ApiState =
  | { status: "idle"; error?: undefined }
  | { status: "submitting"; error?: undefined }
  | { status: "error"; error: string };

export default function CheckoutPaymentMethods({ bookingId }: Props) {
  const [apiState, setApiState] = useState<ApiState>({ status: "idle" });

  async function payWithCard() {
    setApiState({ status: "submitting" });
    try {
      const res = await fetch("/api/payments/stripe/session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ bookingId })
      });

      const json = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !json.url) {
        setApiState({ status: "error", error: json.error || "Unable to start card checkout." });
        return;
      }
      window.location.assign(json.url);
    } catch {
      setApiState({ status: "error", error: "Network error. Please try again." });
    }
  }

  function payWithEsewa() {
    window.location.assign(`/api/payments/esewa/initiate?booking_id=${encodeURIComponent(bookingId)}`);
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {apiState.status === "error" ? <div className="error">{apiState.error}</div> : null}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button className="btn btnPrimary" type="button" onClick={payWithCard} disabled={apiState.status === "submitting"}>
          {apiState.status === "submitting" ? "Redirecting…" : "Pay with Card (Visa/Mastercard)"}
        </button>
        <button className="btn" type="button" onClick={payWithEsewa} disabled={apiState.status === "submitting"}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <Image src="/gallery/esewalogo.png" alt="" width={18} height={18} />
            <span>Pay with eSewa</span>
          </span>
        </button>
      </div>
      <div style={{ color: "var(--muted)", fontSize: 13 }}>
        Card payments are charged in USD. eSewa payments use the converted NPR total.
      </div>
    </div>
  );
}
