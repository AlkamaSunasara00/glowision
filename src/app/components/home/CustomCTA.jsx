// FILE: src/app/components/home/CustomCTABanner.jsx
"use client";

import Link from "next/link";
import { ArrowRight, PenTool, Users, Gift, Zap } from "lucide-react";

export default function CustomCTABanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-4">
      <div className="relative overflow-hidden rounded-3xl"
        style={{ background: "linear-gradient(135deg, var(--color-blue-dark) 0%, #1e2f5a 55%, #0d1a3a 100%)" }}>

        {/* Gold top bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,transparent,var(--color-gold),transparent)" }} />
        {/* Dot grid */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "radial-gradient(circle,white 1px,transparent 1px)", backgroundSize: "26px 26px", pointerEvents: "none" }} />
        {/* Orb */}
        <div style={{ position: "absolute", top: "-30%", right: "-5%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle,rgba(242,180,97,0.1) 0%,transparent 65%)", pointerEvents: "none" }} />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-0 px-8 md:px-14 py-12 md:py-16">

          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(242,180,97,0.12)", border: "1px solid rgba(242,180,97,0.3)" }}>
              <PenTool size={11} style={{ color: "var(--color-gold)" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-gold)", letterSpacing: "1px", textTransform: "uppercase" }}>
                Custom Orders
              </span>
            </div>

            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,4.5vw,50px)", fontWeight: 600, color: "#fff", lineHeight: 1.1, marginBottom: 14 }}>
              Want Something<br />
              <em style={{ color: "var(--color-gold)" }}>Made Just for You?</em>
            </h2>

            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: 460, marginBottom: 28 }}>
              Custom sizes, custom text, bulk orders, wedding gifts, corporate pieces — tell us what you need and we'll craft it exactly to your specifications. Free quote within 24 hours.
            </p>

            {/* Feature chips */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8">
              {[
                { icon: PenTool, text: "Custom Design"   },
                { icon: Users,   text: "Bulk Orders"     },
                { icon: Gift,    text: "Gift Wrapping"   },
                { icon: Zap,     text: "Quote in 24hrs"  },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-1.5 px-3 py-2 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <Icon size={12} style={{ color: "var(--color-gold)" }} />
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{text}</span>
                </div>
              ))}
            </div>

            <Link href="/quote">
              <button style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", borderRadius: "999px", background: "var(--color-gold)", color: "var(--color-blue-dark)", fontWeight: 800, fontSize: "15px", cursor: "pointer", border: "none", fontFamily: "'DM Sans',sans-serif", transition: "all 0.25s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(242,180,97,0.4)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                Get a Free Quote
                <ArrowRight size={17} />
              </button>
            </Link>
          </div>

          {/* Right — process mini-steps */}
          <div className="flex-shrink-0 w-full lg:w-72 xl:w-80">
            <div className="rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-gold)", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 14 }}>
                How It Works
              </p>
              {[
                { n: "01", t: "Share Your Idea",   d: "Tell us design, size, material."      },
                { n: "02", t: "Receive a Quote",   d: "Free detailed quote within 24 hrs."   },
                { n: "03", t: "We Craft It",       d: "Precision production, 5–7 days."      },
                { n: "04", t: "Delivered to You",  d: "Safely packed, shipped India-wide."   },
              ].map(({ n, t, d }, i) => (
                <div key={i} className="flex items-start gap-3 py-3"
                  style={{ borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "20px", fontWeight: 700, color: "rgba(242,180,97,0.4)", lineHeight: 1, flexShrink: 0, width: 24 }}>{n}</span>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 700, color: "#fff", marginBottom: 2 }}>{t}</p>
                    <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}