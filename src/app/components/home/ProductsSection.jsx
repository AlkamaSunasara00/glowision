"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { PRODUCTS } from "@/app/data/productsData";
import ProductCard  from "@/app/ui/cards/ProductCard";

export default function ProductsSection() {
  const [visibleCount, setVisibleCount] = useState(4);
  const visibleProducts = PRODUCTS.slice(0, visibleCount);

  useEffect(() => {
    let lastWidth = window.innerWidth;
    const update = () => {
      const w = window.innerWidth;
      if (w === lastWidth) return;
      lastWidth = w;
      if (w >= 1024) setVisibleCount((p) => Math.max(p, 8));
      else           setVisibleCount((p) => Math.max(p, 4));
    };
    setVisibleCount(window.innerWidth >= 1024 ? 8 : 4);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
        .product-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 16px; }
        @media (min-width: 640px)  { .product-grid { grid-template-columns: repeat(3,1fr); gap: 20px; } }
        @media (min-width: 1024px) { .product-grid { grid-template-columns: repeat(4,1fr); gap: 24px; } }
      `}</style>

      <section style={{ background: "var(--color-bg-main)", padding: "72px 0 80px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 14px" }}>

          {/* Header */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "48px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--color-gold-soft)", border: "1px solid #F2B461", borderRadius: "999px", padding: "6px 16px", marginBottom: "16px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-gold)" }} />
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 700, color: "#E6A24A", letterSpacing: "1px", textTransform: "uppercase" }}>
                Handcrafted with Love
              </span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: "var(--color-blue-dark)", textAlign: "center", lineHeight: 1.2, marginBottom: "14px" }}>
              Our Featured <span style={{ color: "var(--color-gold)" }}>Collection</span>
            </h2>
          </div>

          {/* Grid */}
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More */}
          {visibleCount < PRODUCTS.length && (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "52px" }}>
              <button
                onClick={() => setVisibleCount((prev) => prev + 4)}
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 36px", borderRadius: "999px", background: "var(--color-blue-dark)", color: "white", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer", transition: "all 0.3s ease", boxShadow: "0 6px 20px rgba(0,0,0,0.08)" }}
              >
                Load More <ArrowDown size={16} />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}