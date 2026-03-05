// FILE: src/app/components/home/BestSellers.jsx
"use client";

import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { PRODUCTS } from "@/app/data/productsData";
import ProductCard  from "@/app/ui/cards/ProductCard";

export default function BestSellers() {
  const bestSellers = PRODUCTS
    .filter((p) => p.badge === "Best Seller" || p.rating >= 4.7)
    .slice(0, 8);

  return (
    <section style={{ background: "var(--color-white)", borderTop: "1px solid var(--color-border)" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">

        {/* Header */}
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
              style={{ background: "var(--color-gold-soft)", border: "1px solid var(--color-gold)" }}>
              <Star size={11} style={{ color: "var(--color-gold)" }} fill="currentColor" />
              <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-gold)", letterSpacing: "1px", textTransform: "uppercase" }}>
                Best Sellers
              </span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 600, color: "var(--color-blue-dark)", lineHeight: 1.15 }}>
              Most Loved Pieces
            </h2>
            <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginTop: 6 }}>
              Handpicked favourites trusted by thousands of customers.
            </p>
          </div>
          <Link href="/products"
            className="hidden md:flex items-center gap-1.5 text-[13px] font-semibold shrink-0 transition-colors"
            style={{ color: "var(--color-blue)" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-blue-dark)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-blue)"}>
            View All <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link href="/products"
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[13px] font-semibold"
            style={{ background: "var(--color-blue-dark)", color: "white" }}>
            View All Products <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}