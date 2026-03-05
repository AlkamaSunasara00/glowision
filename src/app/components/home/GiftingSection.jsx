// FILE: src/app/components/home/GiftingSection.jsx
"use client";

import Link from "next/link";
import { ArrowRight, Gift } from "lucide-react";
import { PRODUCTS } from "@/app/data/productsData";
import ProductCard  from "@/app/ui/cards/ProductCard";

const OCCASIONS = [
  { label: "Eid Gifts",       slug: "eid-special",        emoji: "🌙" },
  { label: "Wedding Gifts",   slug: "gift-sets",          emoji: "💍" },
  { label: "Housewarming",    slug: "islamic-wall-art",   emoji: "🏠" },
  { label: "Ramadan",         slug: "ramadan-collection", emoji: "✨" },
];

export default function GiftingSection() {
  const giftProducts = PRODUCTS
    .filter((p) => ["gift-sets", "eid-special", "ramadan-collection"].includes(p.category) || p.badge === "Sale")
    .slice(0, 4);

  return (
    <section style={{ background: "var(--color-white)", borderTop: "1px solid var(--color-border)" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
              style={{ background: "var(--color-gold-soft)", border: "1px solid var(--color-gold)" }}>
              <Gift size={11} style={{ color: "var(--color-gold)" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-gold)", letterSpacing: "1px", textTransform: "uppercase" }}>
                Gifting
              </span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 600, color: "var(--color-blue-dark)", lineHeight: 1.15 }}>
              Perfect for Every Occasion
            </h2>
            <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginTop: 6, maxWidth: 400 }}>
              From Eid mornings to wedding gifts — our pieces make moments unforgettable.
            </p>
          </div>

          {/* Occasion pills */}
          <div className="flex flex-wrap gap-2">
            {OCCASIONS.map(({ label, slug, emoji }) => (
              <Link key={slug} href={`/${slug}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold transition-all"
                style={{ background: "var(--color-bg-main)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-blue-dark)"; e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = "var(--color-blue-dark)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "var(--color-bg-main)"; e.currentTarget.style.color = "var(--color-text-primary)"; e.currentTarget.style.borderColor = "var(--color-border)"; }}>
                <span>{emoji}</span> {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
          {giftProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Banner strip */}
        <div className="rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ background: "var(--color-gold-soft)", border: "1px solid var(--color-gold)" }}>
          <div className="flex items-center gap-4">
            <div style={{ fontSize: 36 }}>🎁</div>
            <div>
              <p style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-blue-dark)" }}>
                Need a custom gift?
              </p>
              <p style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>
                Personalised name, message, or design — we'll make it special.
              </p>
            </div>
          </div>
          <Link href="/quote">
            <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 22px", borderRadius: "999px", background: "var(--color-blue-dark)", color: "white", fontWeight: 700, fontSize: "13px", cursor: "pointer", border: "none", fontFamily: "'DM Sans',sans-serif", whiteSpace: "nowrap", transition: "all 0.2s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(26,46,110,0.25)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              Customise a Gift <ArrowRight size={14} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}