import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container" style={{ padding: "56px 0" }}>
      <h1 style={{ margin: 0, fontSize: 34 }}>Page not found</h1>
      <p style={{ color: "var(--muted)", marginTop: 10 }}>The page you’re looking for doesn’t exist.</p>
      <Link className="btn" href="/">
        Go home
      </Link>
    </div>
  );
}

