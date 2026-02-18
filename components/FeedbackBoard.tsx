"use client";

import { useEffect, useMemo, useState } from "react";

type Feedback = {
  id: string;
  name: string;
  rating: number;
  message: string;
  createdAt: string;
};

type ApiState =
  | { status: "idle"; error?: undefined }
  | { status: "loading"; error?: undefined }
  | { status: "submitting"; error?: undefined }
  | { status: "error"; error: string };

const FALLBACK_FEEDBACK: Feedback[] = [
  {
    id: "local-1",
    name: "A happy guest",
    rating: 5,
    message: "Great rooms, friendly staff, and the breakfast was amazing.",
    createdAt: new Date().toISOString()
  },
  {
    id: "local-2",
    name: "Restaurant visitor",
    rating: 5,
    message: "Fast service and delicious food — will come back again.",
    createdAt: new Date().toISOString()
  }
];

function stars(rating: number) {
  const safe = Math.max(1, Math.min(5, Math.round(rating)));
  return "★★★★★☆☆☆☆☆".slice(5 - safe, 10 - safe);
}

export default function FeedbackBoard() {
  const [apiState, setApiState] = useState<ApiState>({ status: "idle" });
  const [items, setItems] = useState<Feedback[]>([]);

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  const visibleItems = useMemo(() => (items.length ? items : FALLBACK_FEEDBACK), [items]);

  async function load() {
    setApiState({ status: "loading" });
    try {
      const res = await fetch("/api/feedback", { method: "GET" });
      if (!res.ok) throw new Error("Failed to load feedback.");
      const json = (await res.json()) as { items: Feedback[] };
      setItems(json.items || []);
      setApiState({ status: "idle" });
    } catch (err) {
      setApiState({ status: "error", error: "Feedback is not available yet (database not configured)." });
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setApiState({ status: "submitting" });
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, rating, message, website })
      });
      const json = (await res.json()) as { item?: Feedback; error?: string };
      if (!res.ok) throw new Error(json.error || "Unable to submit feedback.");
      if (json.item) setItems((prev) => [json.item!, ...prev].slice(0, 20));
      setName("");
      setRating(5);
      setMessage("");
      setWebsite("");
      setApiState({ status: "idle" });
    } catch (err) {
      setApiState({ status: "error", error: err instanceof Error ? err.message : "Unable to submit feedback." });
    }
  }

  return (
    <div className="grid2">
      <div className="card">
        <div className="cardInner">
          <h2 style={{ margin: 0, fontSize: 22 }}>Leave feedback</h2>
          <form onSubmit={submit} style={{ marginTop: 14, display: "grid", gap: 12 }}>
            <div>
              <label className="label" htmlFor="fb_name">
                Name
              </label>
              <input
                id="fb_name"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                minLength={2}
                maxLength={60}
                required
              />
            </div>

            <div>
              <label className="label" htmlFor="fb_rating">
                Rating
              </label>
              <select
                id="fb_rating"
                className="select"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} star{r === 1 ? "" : "s"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label" htmlFor="fb_message">
                Message
              </label>
              <textarea
                id="fb_message"
                className="textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                minLength={10}
                maxLength={600}
                required
              />
            </div>

            <input
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }}
              aria-hidden="true"
            />

            {apiState.status === "error" ? <div className="error">{apiState.error}</div> : null}

            <button className="btn btnPrimary" type="submit" disabled={apiState.status === "submitting"}>
              {apiState.status === "submitting" ? "Submitting…" : "Submit feedback"}
            </button>
          </form>
        </div>
      </div>

      <div className="card">
        <div className="cardInner">
          <h2 style={{ margin: 0, fontSize: 22 }}>Recent feedback</h2>
          <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
            {visibleItems.map((fb) => (
              <div
                key={fb.id}
                style={{
                  borderTop: "1px solid var(--border)",
                  paddingTop: 12
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                  <div style={{ fontWeight: 800 }}>{fb.name}</div>
                  <div className="pill" style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas" }}>
                    {stars(fb.rating)}
                  </div>
                </div>
                <div style={{ marginTop: 6, color: "var(--muted)" }}>{fb.message}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, color: "var(--muted)", fontSize: 13 }}>
            Tip: Configure the database to store real feedback permanently.
          </div>
        </div>
      </div>
    </div>
  );
}
