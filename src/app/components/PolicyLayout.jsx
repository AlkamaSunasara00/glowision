// FILE: src/app/components/PolicyLayout.jsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PolicyLayout({ title, lastUpdated, children }) {
  return (
    <div className="min-h-screen bg-bg-main">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-20">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-text-secondary hover:text-blue-dark transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>

        {/* Header */}
        <div className="mb-10 pb-8 border-b border-border">
          <div
            className="inline-flex items-center px-3 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-[1.5px] mb-4"
            style={{ background: "var(--color-blue-soft)", color: "var(--color-blue-dark)", border: "1px solid var(--color-border)" }}
          >
            Legal
          </div>
          <h1
            className="text-[clamp(28px,5vw,42px)] font-bold text-blue-dark leading-tight mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {title}
          </h1>
          <p className="text-[13px] text-text-secondary">
            Last updated: <span className="font-semibold">{lastUpdated}</span>
          </p>
        </div>

        {/* Content */}
        <div className="policy-content">
          {children}
        </div>

        {/* Footer note */}
        <div
          className="mt-12 p-5 rounded-2xl text-[13px] text-text-secondary leading-relaxed"
          style={{ background: "var(--color-blue-soft)", border: "1px solid var(--color-border)" }}
        >
          Questions about this policy? Contact us at{" "}
          <a
            href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@glowison.com"}`}
            className="font-semibold text-blue-dark hover:underline"
          >
            {process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@glowison.com"}
          </a>{" "}
          or call{" "}
          <a
            href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+919978750622"}`}
            className="font-semibold text-blue-dark hover:underline"
          >
            {process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+91 99787 50622"}
          </a>
          .
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&display=swap');

        .policy-content h2 {
          font-size: 18px;
          font-weight: 700;
          color: var(--color-blue-dark);
          margin-top: 32px;
          margin-bottom: 10px;
        }
        .policy-content p {
          font-size: 14px;
          color: var(--color-text-secondary);
          line-height: 1.8;
          margin-bottom: 14px;
        }
        .policy-content ul {
          list-style: none;
          padding: 0;
          margin-bottom: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .policy-content ul li {
          font-size: 14px;
          color: var(--color-text-secondary);
          line-height: 1.7;
          padding-left: 20px;
          position: relative;
        }
        .policy-content ul li::before {
          content: "→";
          position: absolute;
          left: 0;
          color: var(--color-blue);
          font-size: 12px;
        }
        .policy-content strong {
          color: var(--color-text-primary);
          font-weight: 600;
        }
        .policy-content a {
          color: var(--color-blue-dark);
          font-weight: 600;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}