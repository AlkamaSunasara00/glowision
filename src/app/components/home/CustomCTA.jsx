// FILE: src/app/components/home/CustomCTABanner.jsx
"use client";

import Link from "next/link";
import { ArrowRight, PenTool, Users, Gift, Zap, CheckCircle2 } from "lucide-react";

const FEATURES = [
  { icon: PenTool, text: "Custom Design"  },
  { icon: Users,   text: "Bulk Orders"    },
  { icon: Gift,    text: "Gift Wrapping"  },
  { icon: Zap,     text: "Quote in 24hrs" },
];

const STEPS = [
  { n: "01", t: "Share Your Idea",  d: "Tell us design, size & material." },
  { n: "02", t: "Get a Free Quote", d: "Detailed quote within 24 hours."  },
  { n: "03", t: "We Craft It",      d: "Precision made in 5–7 days."      },
  { n: "04", t: "Delivered",        d: "Safely packed, shipped India-wide."},
];

export default function CustomCTABanner() {
  return (
    <>
      <style>{`
        @keyframes ctaFadeUp {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .cta-a1 { animation: ctaFadeUp 0.5s ease 0.05s both; }
        .cta-a2 { animation: ctaFadeUp 0.5s ease 0.15s both; }
        .cta-a3 { animation: ctaFadeUp 0.5s ease 0.25s both; }
        .cta-a4 { animation: ctaFadeUp 0.5s ease 0.35s both; }
        .cta-a5 { animation: ctaFadeUp 0.5s ease 0.45s both; }
      `}</style>

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div
          className="relative overflow-hidden rounded-3xl"
          style={{ background: "linear-gradient(135deg, #0d1a3a 0%, var(--color-blue-dark) 50%, #1e3060 100%)" }}
        >
          {/* ── Decorations ── */}
          {/* Dot grid */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

          {/* Top gold rule */}
          <div className="absolute top-0 left-0 right-0 h-[3px]"
            style={{ background: "linear-gradient(90deg, transparent, var(--color-gold) 30%, var(--color-gold) 70%, transparent)" }} />

          {/* Radial glow — right */}
          <div className="absolute -top-1/3 -right-10 w-[420px] h-[420px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(242,180,97,0.09) 0%, transparent 65%)" }} />

          {/* Radial glow — left bottom */}
          <div className="absolute -bottom-1/3 -left-10 w-[300px] h-[300px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(71,87,146,0.25) 0%, transparent 65%)" }} />

          {/* ── Inner content ── */}
          <div className="relative z-10 flex flex-col lg:flex-row gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/10">

            {/* ══ LEFT — Text + CTA ══ */}
            <div className="flex-1 px-8 md:px-12 py-12 md:py-14 flex flex-col items-start">

              {/* Badge */}
              <div className="cta-a1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
                style={{ background: "rgba(242,180,97,0.1)", border: "1px solid rgba(242,180,97,0.28)" }}>
                <PenTool size={11} style={{ color: "var(--color-gold)" }} />
                <span className="text-[10.5px] font-bold tracking-[1.5px] uppercase" style={{ color: "var(--color-gold)" }}>
                  Custom Orders
                </span>
              </div>

              {/* Headline */}
              <h2 className="cta-a2 text-[clamp(26px,4vw,46px)] font-bold leading-[1.1] tracking-tight text-white mb-5">
                Want Something<br />
                <span style={{ color: "var(--color-gold)" }}>Made Just for You?</span>
              </h2>

              {/* Body */}
              <p className="cta-a3 text-[14px] leading-[1.8] mb-8 max-w-[440px]"
                style={{ color: "rgba(255,255,255,0.52)" }}>
                Custom sizes, custom text, bulk orders, wedding gifts, corporate pieces — tell us what you need and we'll craft it to your exact specifications.
              </p>

              {/* Feature chips */}
              <div className="cta-a4 flex flex-wrap gap-2 mb-10">
                {FEATURES.map(({ icon: Icon, text }, i) => (
                  <div key={i}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <Icon size={12} style={{ color: "var(--color-gold)" }} />
                    <span className="text-[12px] font-600 text-white/80">{text}</span>
                  </div>
                ))}
              </div>

              {/* CTA button */}
              <Link href="/quote" className="cta-a5">
                <button
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-bold text-[15px] transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                  style={{
                    background: "var(--color-gold)",
                    color: "var(--color-blue-dark)",
                    boxShadow: "0 4px 20px rgba(242,180,97,0.3)",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 10px 32px rgba(242,180,97,0.48)"}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 4px 20px rgba(242,180,97,0.3)"}
                >
                  Get a Free Quote
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>

            {/* ══ RIGHT — How It Works ══ */}
            <div className="lg:w-80 xl:w-96 px-8 md:px-10 py-12 md:py-14 flex flex-col">

              {/* Section label */}
              <p className="text-[10.5px] font-bold tracking-[2px] uppercase mb-8"
                style={{ color: "rgba(242,180,97,0.6)" }}>
                How It Works
              </p>

              {/* Steps */}
              <div className="flex flex-col gap-0 flex-1">
                {STEPS.map(({ n, t, d }, i) => (
                  <div key={i} className="flex gap-4 group">

                    {/* Left: number + connector line */}
                    <div className="flex flex-col items-center shrink-0">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-[12px] font-bold shrink-0"
                        style={{
                          background: "rgba(242,180,97,0.1)",
                          border: "1px solid rgba(242,180,97,0.25)",
                          color: "var(--color-gold)",
                        }}
                      >
                        {n}
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className="w-px flex-1 my-1.5" style={{ background: "rgba(255,255,255,0.08)" }} />
                      )}
                    </div>

                    {/* Right: text */}
                    <div className="pb-6">
                      <p className="text-[13.5px] font-bold text-white mb-1 leading-tight">{t}</p>
                      <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{d}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust note */}
              <div className="mt-4 flex items-center gap-2">
                <CheckCircle2 size={14} className="text-green-400 shrink-0" />
                <span className="text-[12px] font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Free consultation · No commitment required
                </span>
              </div>
            </div>

          </div>

          {/* Bottom gold rule */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{ background: "linear-gradient(90deg, transparent, rgba(242,180,97,0.35) 30%, rgba(242,180,97,0.35) 70%, transparent)" }} />
        </div>
      </section>
    </>
  );
}