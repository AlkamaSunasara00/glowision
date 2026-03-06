"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { CATEGORIES } from "@/app/data/categoriesData";
import { PRODUCTS }   from "@/app/data/productsData";

export default function CategoryShowcase() {
  const cats = CATEGORIES.slice(0, 6);
  const sliderRef = useRef(null);
  const [activeBtn, setActiveBtn] = useState(null);

  const move = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    setActiveBtn(direction > 0 ? "right" : "left");
    window.setTimeout(() => setActiveBtn(null), 260);

    const firstCard = slider.querySelector("[data-cat-card='true']");
    const step = firstCard ? firstCard.clientWidth + 14 : slider.clientWidth * 0.85;
    slider.scrollBy({ left: direction * step * 2, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @keyframes csUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .cs-card {
          opacity: 0;
          animation: csUp 0.5s ease forwards;
        }
        .cs-card:nth-child(1) { animation-delay: 0.04s; }
        .cs-card:nth-child(2) { animation-delay: 0.10s; }
        .cs-card:nth-child(3) { animation-delay: 0.16s; }
        .cs-card:nth-child(4) { animation-delay: 0.22s; }
        .cs-card:nth-child(5) { animation-delay: 0.28s; }
        .cs-card:nth-child(6) { animation-delay: 0.34s; }

        .cs-img-wrap { transition: transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94); }
        .cs-card:hover .cs-img-wrap { transform: scale(1.07); }

        .cs-arrow {
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .cs-card:hover .cs-arrow {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>

      <section className="bg-bg-main border-y border-border py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          {/* ── Header ── */}
          <div className="flex items-end justify-between gap-4 mb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-2"
                style={{ background: "var(--color-blue-soft)", border: "1px solid var(--color-blue)" }}>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span className="text-[10.5px] font-bold tracking-[1.5px] uppercase text-blue-700">
                  Browse by Category
                </span>
              </div>
              <h2 className="text-2xl font-bold text-blue-dark md:text-3xl">
                Find What You Love
              </h2>
              <p className="mt-1 text-sm text-text-secondary">
                {cats.length} collections · {PRODUCTS.length}+ products
              </p>
            </div>

            <Link href="/products"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 hover:gap-2.5 shrink-0"
              style={{ color: "var(--color-blue-dark)", border: "1.5px solid var(--color-border)", background: "var(--color-white)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-blue-dark)"; e.currentTarget.style.background = "var(--color-blue-soft)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.background = "var(--color-white)"; }}
            >
              View All Categories <ArrowRight size={14} />
            </Link>
          </div>

          {/* ── Slider ── */}
          <div className="group relative">

            {/* Left button */}
            <button
              type="button"
              onClick={() => move(-1)}
              className={`absolute left-0 top-1/2 z-10 flex h-16 w-9 hover:cursor-pointer -translate-y-1/2 items-center justify-center rounded-r-2xl shadow-md transition-all duration-300 md:h-20 md:w-10 ${
                activeBtn === "left"
                  ? "bg-blue-dark text-white"
                  : "bg-white text-blue-dark hover:bg-blue-dark hover:text-white"
              }`}
            >
              <ChevronLeft size={18} />
            </button>

            {/* Cards */}
            <div
              ref={sliderRef}
              className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-7 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {cats.map((cat) => {
                const count = PRODUCTS.filter((p) => p.category === cat.slug).length;
                const subs  = cat.subcategories?.length || 0;

                return (
                  <div
                    key={cat.slug}
                    data-cat-card="true"
                    className="flex shrink-0 snap-start w-[46vw] sm:w-[30vw] md:w-[22vw] lg:w-[17vw]"
                  >
                    <Link
                      href={`/${cat.slug}`}
                      className="cs-card group block w-full rounded-2xl overflow-hidden border border-border bg-white hover:border-transparent transition-all duration-300"
                      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)"; e.currentTarget.style.transform = "translateY(0)"; }}
                    >
                      {/* Image area */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-bg-main">
                        {cat.image ? (
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="cs-img-wrap absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-blue-50">
                            <span className="text-4xl">🎨</span>
                          </div>
                        )}

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                        {/* Count badge */}
                        <div className="absolute top-2.5 right-2.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-blue-dark backdrop-blur-sm">
                            {count} items
                          </span>
                        </div>

                        {/* Hover arrow */}
                        <div className="absolute bottom-3 right-3 cs-arrow">
                          <div className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                            <ChevronRight size={14} className="text-gray-800" />
                          </div>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="px-3.5 py-3">
                        <p className="text-[13px] font-bold text-blue-dark leading-tight mb-0.5 group-hover:text-blue-600 transition-colors">
                          {cat.name}
                        </p>
                        {subs > 0 && (
                          <p className="text-[11px] text-text-secondary font-medium">
                            {subs} subcategories
                          </p>
                        )}
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Right button */}
            <button
              type="button"
              onClick={() => move(1)}
              className={`absolute right-0 top-1/2 z-10 flex h-16 w-9 -translate-y-1/2 items-center hover:cursor-pointer justify-center rounded-l-2xl shadow-md transition-all duration-300 md:h-20 md:w-10 ${
                activeBtn === "right"
                  ? "bg-blue-dark text-white"
                  : "bg-white text-blue-dark hover:bg-blue-dark hover:text-white"
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Mobile CTA */}
          <div className="mt-6 flex justify-center md:hidden">
            <Link
              href="/products"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl text-[13px] font-bold text-white transition-all duration-200 active:scale-95"
              style={{ background: "var(--color-blue-dark)" }}
            >
              View All Categories
              <ArrowRight size={15} />
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}