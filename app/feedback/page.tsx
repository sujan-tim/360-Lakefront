import FeedbackBoard from "@/components/FeedbackBoard";
import Link from "next/link";

export default function FeedbackPage() {
  return (
    <div>
      <section className="hero heroTight" style={{ ["--hero-image" as any]: 'url("/gallery/view4.jpeg")' }}>
        <div className="container heroInner">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Feedback</span>
          </div>

          <div className="pill">Reviews</div>
          <h1 className="heroTitle">Feedback</h1>
          <p className="heroLead">Share your experience — it helps us improve.</p>
        </div>
      </section>

      <div className="container" style={{ padding: "30px 0" }}>
        <FeedbackBoard />
      </div>
    </div>
  );
}
