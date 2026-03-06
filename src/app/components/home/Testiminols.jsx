// FILE: src/app/components/home/Testimonials.jsx
"use client";

import { useRef, useEffect, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const REVIEWS = [
  { name: "Ayesha K.",  city: "Mumbai",    rating: 5, text: "The Ayatul Kursi frame exceeded all expectations. Gold detail is stunning, packaging was impeccable. Already ordered again for my sister's wedding!", product: "Ayatul Kursi Gold Frame" },
  { name: "Rashid M.",  city: "Hyderabad", rating: 5, text: "Bought the Kaaba 3D shadow box as a wedding gift. The couple was completely overwhelmed. Glowison's quality is unmatched anywhere in India.",     product: "Kaaba 3D Shadow Box"     },
  { name: "Fatima Z.",  city: "Delhi",     rating: 5, text: "The Bismillah key holder is the first thing guests see entering our home. So many compliments every day! Delivered in just 3 days.",               product: "Bismillah Key Holder"    },
  { name: "Imran H.",   city: "Surat",     rating: 5, text: "Ordered 12 pieces for our mosque renovation. Every single one arrived perfectly packed, perfectly finished. Will recommend to every committee.",       product: "Bulk Order — Mosque"     },
  { name: "Zainab A.",  city: "Chennai",   rating: 5, text: "The 99 Names of Allah frame is breathtaking. I stare at it every morning. Worth every rupee — the craftsmanship is clearly a labour of love.",       product: "99 Names of Allah Frame" },
  { name: "Omar F.",    city: "Lucknow",   rating: 5, text: "Ramadan Collection arrived 2 days before Ramadan started — perfect timing! The whole family was amazed. This is truly a premium brand.",             product: "Ramadan Collection Set"  },
];

// Avatar colours cycling through brand palette
const AVATAR_COLORS = [
  "var(--color-blue-dark)",
  "#b45309",
  "#047857",
  "#6d28d9",
  "#be123c",
  "#0369a1",
];

export default function Testimonials() {
  const sliderRef              = useRef(null);
  const [activeBtn, setActiveBtn] = useState(null);

  const move = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    setActiveBtn(direction > 0 ? "right" : "left");
    setTimeout(() => setActiveBtn(null), 260);

    // Snap one card width at a time (card + gap)
    const firstCard = slider.querySelector("[data-review-card]");
    const step = firstCard ? firstCard.clientWidth + 16 : slider.clientWidth;
    slider.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <section className="py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* ── Header ── */}
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-[11px] font-bold uppercase tracking-[1px] text-blue">
              Customer Reviews
            </p>
            <h2 className="text-2xl font-bold text-blue-dark md:text-3xl">
              What Our Customers Say
            </h2>

            {/* Overall rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} style={{ color: "var(--color-gold)" }} fill="currentColor" />
                ))}
              </div>
              <span className="text-[13px] font-bold text-blue-dark">4.9</span>
              <span className="text-[12px] text-text-secondary">from 1,200+ reviews</span>
            </div>
          </div>
        </div>

        {/* ── Slider ── */}
        <div className="group relative">

          {/* Left arrow */}
          <button
            type="button"
            onClick={() => move(-1)}
            className={`absolute left-0 top-1/2 z-10 flex h-16 w-9 -translate-y-1/2 items-center justify-center rounded-r-2xl shadow-md transition-all duration-300 md:h-20 md:w-10 ${
              activeBtn === "left"
                ? "bg-gold text-white"
                : "bg-white text-blue-dark hover:bg-gold hover:text-white"
            }`}
          >
            <ChevronLeft size={18} />
          </button>

          {/* Cards track */}
          <div
            ref={sliderRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                data-review-card
                className="
                  snap-start shrink-0 flex flex-col
                  w-[calc(100%-32px)]
                  sm:w-[calc(50%-10px)]
                  lg:w-[calc(33.333%-11px)]
                  rounded-2xl border border-border bg-white p-6
                  transition-shadow duration-300
                  hover:shadow-[0_8px_28px_rgba(26,46,110,0.09)]
                "
              >
                {/* Quote icon */}
                <Quote size={20} style={{ color: "var(--color-gold)", opacity: 0.55 }} className="mb-3 shrink-0" />

                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {[...Array(r.rating)].map((_, j) => (
                    <Star key={j} size={13} style={{ color: "var(--color-gold)" }} fill="currentColor" />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-[13.5px] leading-relaxed text-text-secondary italic flex-1 mb-4">
                  "{r.text}"
                </p>

                {/* Product tag */}
                <span
                  className="text-[11px] font-semibold w-fit px-3 py-1 rounded-full mb-4"
                  style={{ background: "var(--color-blue-soft)", color: "var(--color-blue)" }}
                >
                  {r.product}
                </span>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold text-white shrink-0"
                    style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                  >
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-blue-dark leading-tight">{r.name}</p>
                    <p className="text-[11px] text-text-secondary">{r.city}</p>
                  </div>
                  {/* Verified badge */}
                  <div className="ml-auto flex items-center gap-1 shrink-0">
                    <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-[10px] font-semibold text-green-600">Verified</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button
            type="button"
            onClick={() => move(1)}
            className={`absolute right-0 top-1/2 z-10 flex h-16 w-9 -translate-y-1/2 items-center justify-center rounded-l-2xl shadow-md transition-all duration-300 md:h-20 md:w-10 ${
              activeBtn === "right"
                ? "bg-gold text-white"
                : "bg-white text-blue-dark hover:bg-gold hover:text-white"
            }`}
          >
            <ChevronRight size={18} />
          </button>

        </div>
      </div>
    </section>
  );
}