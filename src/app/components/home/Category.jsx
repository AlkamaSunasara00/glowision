// FILE: src/app/components/home/CategoryShowcase.jsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/app/data/categoriesData";
import { PRODUCTS }   from "@/app/data/productsData";

// Map category slugs to emojis/colors as fallback when no image
const CAT_META = {
  "islamic-wall-art":    { emoji: "🖼️",  gradient: "135deg, #1a2e6e, #2d3d7a" },
  "islamic-wall-clocks": { emoji: "🕐",  gradient: "135deg, #92400e, #b45309" },
  "islamic-key-holders": { emoji: "🗝️",  gradient: "135deg, #065f46, #047857" },
  "ramadan-collection":  { emoji: "🌙",  gradient: "135deg, #4c1d95, #6d28d9" },
  "eid-special":         { emoji: "✨",  gradient: "135deg, #991b1b, #dc2626" },
  "gift-sets":           { emoji: "🎁",  gradient: "135deg, #1e40af, #2563eb" },
};

export default function CategoryShowcase() {
  const cats = CATEGORIES.slice(0, 6);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
      {/* Header */}
      <div className="flex items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
            style={{ background: "var(--color-blue-soft)", border: "1px solid var(--color-blue)" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-blue)", letterSpacing: "1px", textTransform: "uppercase" }}>
              Browse by Category
            </span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 600, color: "var(--color-blue-dark)", lineHeight: 1.15 }}>
            Find What You Love
          </h2>
        </div>
        <Link href="/products"
          className="hidden md:flex items-center gap-1.5 text-[13px] font-semibold shrink-0 transition-colors"
          style={{ color: "var(--color-blue)" }}
          onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-blue-dark)"}
          onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-blue)"}>
          All Categories <ArrowRight size={14} />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {cats.map((cat) => {
          const count = PRODUCTS.filter((p) => p.category === cat.slug).length;
          const meta  = CAT_META[cat.slug] || { emoji: "🎨", gradient: "135deg, #1a2e6e, #253573" };

          return (
            <Link key={cat.slug} href={`/${cat.slug}`}
              className="group flex flex-col items-center gap-3 rounded-2xl p-4 transition-all duration-200"
              style={{ background: "var(--color-white)", border: "1px solid var(--color-border)" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(26,46,110,0.1)"; e.currentTarget.style.borderColor = "var(--color-blue)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)";    e.currentTarget.style.boxShadow = "none";                               e.currentTarget.style.borderColor = "var(--color-border)"; }}>

              {/* Image / Icon */}
              <div className="w-full aspect-square rounded-xl overflow-hidden flex items-center justify-center relative"
                style={{ background: `linear-gradient(${meta.gradient})` }}>
                {cat.image ? (
                  <img src={cat.image} alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => e.target.style.display = "none"} />
                ) : null}
                <div className="absolute inset-0 flex items-center justify-center" style={{ fontSize: 32 }}>
                  {meta.emoji}
                </div>
              </div>

              {/* Label */}
              <div className="text-center">
                <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-blue-dark)", lineHeight: 1.3 }}>
                  {cat.name}
                </p>
                <p style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginTop: 2 }}>
                  {count} items
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Mobile see all */}
      <div className="mt-6 flex justify-center md:hidden">
        <Link href="/products"
          className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[13px] font-semibold"
          style={{ background: "var(--color-blue-dark)", color: "white" }}>
          All Categories <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}