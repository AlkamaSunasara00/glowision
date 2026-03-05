// FILE: src/app/components/home/Testimonials.jsx
"use client";

import { useRef, useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

const REVIEWS = [
  { name: "Ayesha K.",    city: "Mumbai",    rating: 5, text: "The Ayatul Kursi frame exceeded all expectations. Gold detail is stunning, packaging was impeccable. Already ordered again for my sister's wedding!", product: "Ayatul Kursi Gold Frame" },
  { name: "Rashid M.",    city: "Hyderabad", rating: 5, text: "Bought the Kaaba 3D shadow box as a wedding gift. The couple was completely overwhelmed. Glowison's quality is unmatched anywhere in India.",     product: "Kaaba 3D Shadow Box"     },
  { name: "Fatima Z.",    city: "Delhi",     rating: 5, text: "The Bismillah key holder is the first thing guests see entering our home. So many compliments every day! Delivered in just 3 days.",               product: "Bismillah Key Holder"    },
//   { name: "Imran H.",     city: "Surat",     rating: 5, text: "Ordered 12 pieces for our mosque renovation. Every single one arrived perfectly packed, perfectly finished. Will recommend to every committee.",       product: "Bulk Order — Mosque"     },
//   { name: "Zainab A.",    city: "Chennai",   rating: 5, text: "The 99 Names of Allah frame is breathtaking. I stare at it every morning. Worth every rupee — the craftsmanship is clearly a labour of love.",       product: "99 Names of Allah Frame" },
//   { name: "Omar F.",      city: "Lucknow",   rating: 5, text: "Ramadan Collection arrived 2 days before Ramadan started — perfect timing! The whole family was amazed. This is truly a premium brand.",             product: "Ramadan Collection Set"  },
];

export default function Testimonials() {
  const [ref, inView] = useInView();

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
          style={{ background: "var(--color-gold-soft)", border: "1px solid var(--color-gold)" }}>
          <Star size={11} style={{ color: "var(--color-gold)" }} fill="currentColor" />
          <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-gold)", letterSpacing: "1px", textTransform: "uppercase" }}>
            Reviews
          </span>
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 600, color: "var(--color-blue-dark)", lineHeight: 1.15 }}>
          What Our Customers Say
        </h2>
        {/* Overall rating */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} style={{ color: "var(--color-gold)" }} fill="currentColor" />
            ))}
          </div>
          <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--color-blue-dark)" }}>4.9</span>
          <span style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>from 1,200+ reviews</span>
        </div>
      </div>

      {/* Reviews grid */}
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {REVIEWS.map((r, i) => (
          <div key={i}
            style={{
              opacity:    inView ? 1 : 0,
              transform:  inView ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.55s ease ${i * 70}ms, transform 0.55s ease ${i * 70}ms`,
              background: "var(--color-white)",
              border:     "1px solid var(--color-border)",
              borderRadius: 20,
              padding:    24,
              display:    "flex",
              flexDirection: "column",
              gap: 14,
            }}>
            {/* Quote icon */}
            <Quote size={20} style={{ color: "var(--color-gold)", opacity: 0.6 }} />

            {/* Stars */}
            <div className="flex gap-0.5">
              {[...Array(r.rating)].map((_, j) => (
                <Star key={j} size={13} style={{ color: "var(--color-gold)" }} fill="currentColor" />
              ))}
            </div>

            {/* Text */}
            <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: 1.78, flex: 1, fontStyle: "italic" }}>
              "{r.text}"
            </p>

            {/* Product tag */}
            <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-blue)", background: "var(--color-blue-soft)", padding: "3px 10px", borderRadius: "999px", display: "inline-block", width: "fit-content" }}>
              {r.product}
            </span>

            {/* Author */}
            <div className="flex items-center gap-3 pt-3"
              style={{ borderTop: "1px solid var(--color-border)" }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-[13px]"
                style={{ background: "var(--color-blue-dark)", color: "white" }}>
                {r.name[0]}
              </div>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-blue-dark)" }}>{r.name}</p>
                <p style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{r.city}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}