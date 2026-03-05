// FILE: src/app/components/home/NewArrivals.jsx
"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";
import { PRODUCTS } from "@/app/data/productsData";
import ProductCard  from "@/app/ui/cards/ProductCard";

export default function NewArrivals() {
  const scrollRef = useRef(null);

  const newProducts = PRODUCTS
    .filter((p) => p.badge === "New" || p.id >= PRODUCTS.length - 6)
    .slice(0, 8);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 260, behavior: "smooth" });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
      {/* Header */}
      <div className="flex items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
            style={{ background: "var(--color-blue-soft)", border: "1px solid var(--color-blue)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
            <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-blue)", letterSpacing: "1px", textTransform: "uppercase" }}>
              New Arrivals
            </span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 600, color: "var(--color-blue-dark)", lineHeight: 1.15 }}>
            Fresh to the Collection
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Scroll arrows — desktop */}
          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => scroll(-1)}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
              style={{ background: "var(--color-white)", border: "1px solid var(--color-border)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-blue-dark)"; e.currentTarget.style.borderColor = "var(--color-blue-dark)"; e.currentTarget.querySelector("*").style.color = "white"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--color-white)"; e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.querySelector("*").style.color = "var(--color-text-secondary)"; }}>
              <ChevronLeft size={16} style={{ color: "var(--color-text-secondary)" }} />
            </button>
            <button onClick={() => scroll(1)}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
              style={{ background: "var(--color-white)", border: "1px solid var(--color-border)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-blue-dark)"; e.currentTarget.style.borderColor = "var(--color-blue-dark)"; e.currentTarget.querySelector("*").style.color = "white"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--color-white)"; e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.querySelector("*").style.color = "var(--color-text-secondary)"; }}>
              <ChevronRightIcon size={16} style={{ color: "var(--color-text-secondary)" }} />
            </button>
          </div>

          <Link href="/products"
            className="flex items-center gap-1.5 text-[13px] font-semibold transition-colors"
            style={{ color: "var(--color-blue)" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-blue-dark)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-blue)"}>
            View All <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Mobile: horizontal scroll / Desktop: grid */}
      <div
        ref={scrollRef}
        className="md:hidden flex gap-3 overflow-x-auto pb-3"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {newProducts.map((product) => (
          <div key={product.id} style={{ minWidth: "160px", maxWidth: "200px", flex: "0 0 auto" }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {newProducts.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}