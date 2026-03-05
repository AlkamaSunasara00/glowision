// FILE: src/app/components/home/Newsletter.jsx
"use client";

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused,   setFocused]   = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section style={{ background: "var(--color-bg-main)", borderTop: "1px solid var(--color-border)" }}>
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-14 md:py-20 text-center">

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
          style={{ background: "var(--color-blue-soft)", border: "1px solid var(--color-blue)" }}>
          <Mail size={11} style={{ color: "var(--color-blue)" }} />
          <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-blue)", letterSpacing: "1px", textTransform: "uppercase" }}>
            Newsletter
          </span>
        </div>

        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(24px,4vw,38px)", fontWeight: 600, color: "var(--color-blue-dark)", lineHeight: 1.15, marginBottom: 10 }}>
          Get 10% Off Your First Order
        </h2>
        <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: 1.75, maxWidth: 420, margin: "0 auto 28px" }}>
          Subscribe for exclusive deals, new arrivals, Ramadan collections, and Islamic decor inspiration delivered to your inbox.
        </p>

        {submitted ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: "#f0fdf4" }}>
              <CheckCircle size={28} style={{ color: "#16a34a" }} />
            </div>
            <p style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-blue-dark)" }}>
              You're in! 🎉
            </p>
            <p style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>
              Check your inbox for your 10% discount code.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <div className="flex-1 flex items-center gap-2.5 rounded-xl px-4 py-3 transition-all"
              style={{ background: "var(--color-white)", border: `1.5px solid ${focused ? "var(--color-blue)" : "var(--color-border)"}`, boxShadow: focused ? "0 0 0 3px rgba(71,87,146,0.1)" : "none" }}>
              <Mail size={15} style={{ color: "var(--color-text-secondary)", flexShrink: 0 }} />
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "14px", color: "var(--color-text-primary)", fontFamily: "'DM Sans',sans-serif" }}
              />
            </div>
            <button type="submit"
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "12px 22px", borderRadius: "12px", background: "var(--color-blue-dark)", color: "white", fontWeight: 700, fontSize: "14px", cursor: "pointer", border: "none", fontFamily: "'DM Sans',sans-serif", whiteSpace: "nowrap", transition: "all 0.2s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(26,46,110,0.25)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              Subscribe <ArrowRight size={15} />
            </button>
          </form>
        )}

        <p style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginTop: 14, opacity: 0.8 }}>
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}