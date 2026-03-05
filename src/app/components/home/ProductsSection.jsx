// FILE: src/app/components/ProductsSection.jsx
// Uses new productsData shape:
//   product.title, product.slug, product.category (slug), product.discount,
//   product.dimensions ([{size, mrp}]), product.images ([{color, hex?, images:[]}])

"use client";

import { useEffect, useState } from "react";
import { useRouter }           from "next/navigation";
import { Heart, Star }         from "lucide-react";
import { ArrowDown }           from "lucide-react";
import { PRODUCTS }            from "@/app/data/productsData";
import AddToCartButton         from "@/app/ui/buttons/AtcButton";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const BADGE_STYLES = {
  "Best Seller": { bg: "#1a2e6e", color: "#fff" },
  New:           { bg: "#16a34a", color: "#fff" },
  Sale:          { bg: "#dc2626", color: "#fff" },
  Premium:       { bg: "#92400e", color: "#fff" },
  Limited:       { bg: "#7c3aed", color: "#fff" },
  Popular:       { bg: "#0369a1", color: "#fff" },
};

// ─────────────────────────────────────────────────────────────────────────────
// HEART PARTICLES
// ─────────────────────────────────────────────────────────────────────────────
function HeartParticles({ active }) {
  if (!active) return null;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10 }}>
      {Array.from({ length: 10 }).map((_, i) => {
        const angle    = (i / 10) * 360;
        const distance = 28 + Math.random() * 16;
        const rad      = (angle * Math.PI) / 180;
        const tx       = Math.cos(rad) * distance;
        const ty       = Math.sin(rad) * distance;
        const size     = 4 + Math.random() * 4;
        const colors   = ["#ef4444", "#f87171", "#fca5a5", "#FF6B6B", "#fff"];
        return (
          <div key={i} style={{
            position: "absolute", top: "50%", left: "50%",
            width: `${size}px`, height: `${size}px`, borderRadius: "50%",
            background: colors[i % colors.length],
            transform: "translate(-50%,-50%)",
            animation: `hpburst-ps-${i} 0.6s ease-out forwards`,
          }}>
            <style>{`
              @keyframes hpburst-ps-${i} {
                0%   { transform:translate(-50%,-50%) translate(0,0) scale(1); opacity:1; }
                100% { transform:translate(-50%,-50%) translate(${tx}px,${ty}px) scale(0); opacity:0; }
              }
            `}</style>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STAR RATING
// ─────────────────────────────────────────────────────────────────────────────
function StarRating({ rating }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={11} style={{
          fill:  s <= Math.round(rating) ? "#F2B461" : "transparent",
          color: s <= Math.round(rating) ? "#F2B461" : "#D1D5DB",
        }} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT CARD  (inline — uses new data shape)
// ─────────────────────────────────────────────────────────────────────────────
function ProductCard({ product }) {
  const router = useRouter();

  const [hovered,    setHovered]    = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [particles,  setParticles]  = useState(false);

  // ── Derived values ────────────────────────────────────────────────────────
  // Flatten all images from every color entry
  const allImages = product.images.flatMap((e) => e.images);
  const img1      = allImages[0] || "";
  const img2      = allImages[1] || img1;

  // Price from smallest dimension
  const baseDim  = product.dimensions[0];
  const mrp      = baseDim?.mrp || 0;
  const price    = Math.round(mrp * (1 - product.discount / 100));

  const badgeStyle = BADGE_STYLES[product.badge] || { bg: "#475792", color: "#fff" };

  // Cart product shape for AddToCartButton
  const cartProduct = {
    id:            product.id,
    name:          product.title,
    category:      product.category,
    price,
    originalPrice: mrp,
    images:        allImages,
    badge:         product.badge   || null,
    rating:        product.rating  || null,
    reviews:       product.reviews || null,
    selectedColor: null,
    qty:           1,
    slug:          product.slug,
  };

  // ── Sync wishlist ─────────────────────────────────────────────────────────
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("glowison_wishlist") || "[]");
    setWishlisted(saved.some((i) => i.id === product.id));
  }, [product.id]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  // Navigate to /{category}/{slug}
  const handleCardClick = () => router.push(`/${product.category}/${product.slug}`);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const saved = JSON.parse(localStorage.getItem("glowison_wishlist") || "[]");
    if (!wishlisted) {
      setParticles(true);
      setTimeout(() => setParticles(false), 700);
      localStorage.setItem("glowison_wishlist", JSON.stringify([...saved, {
        id:            product.id,
        name:          product.title,
        price,
        originalPrice: mrp,
        images:        allImages,
        category:      product.category,
        slug:          product.slug,
        rating:        product.rating,
        reviews:       product.reviews,
        badge:         product.badge || null,
      }]));
      setWishlisted(true);
    } else {
      localStorage.setItem("glowison_wishlist",
        JSON.stringify(saved.filter((i) => i.id !== product.id))
      );
      setWishlisted(false);
    }
    window.dispatchEvent(new Event("wishlistUpdate"));
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--color-white)", borderRadius: "20px",
        overflow: "hidden", border: "1px solid var(--color-border)",
        boxShadow: hovered ? "var(--shadow-hover)" : "var(--shadow-soft)",
        transition: "all 0.35s cubic-bezier(0.34,1.2,0.64,1)",
        cursor: "pointer", position: "relative",
        display: "flex", flexDirection: "column",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* ── Image area ── */}
      <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", background: "var(--color-bg-main)" }}>
        <img src={img1} alt={product.title} style={{
          width: "100%", height: "100%", objectFit: "cover",
          position: "absolute", inset: 0,
          opacity: hovered ? 0 : 1,
          transform: hovered ? "scale(1.08)" : "scale(1)",
          transition: "all 0.5s ease",
        }} />
        <img src={img2} alt={product.title + " alt"} style={{
          width: "100%", height: "100%", objectFit: "cover",
          position: "absolute", inset: 0,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scale(1)" : "scale(1.08)",
          transition: "all 0.5s ease",
        }} />

        {/* Badge */}
        {product.badge && (
          <div style={{
            position: "absolute", top: "10px", left: "10px",
            background: badgeStyle.bg, color: badgeStyle.color,
            fontFamily: "'DM Sans',sans-serif", fontSize: "10px",
            fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase",
            padding: "4px 10px", borderRadius: "999px", zIndex: 5,
            boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
          }}>
            {product.badge}
          </div>
        )}

        {/* Discount */}
        <div style={{
          position: "absolute", top: "10px", right: "10px",
          background: "#fff", color: "#dc2626",
          fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 700,
          padding: "4px 8px", borderRadius: "999px", zIndex: 5,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)", border: "1px solid #fecaca",
        }}>
          -{product.discount}%
        </div>

        {/* Wishlist */}
        <div style={{ position: "absolute", top: "46px", right: "10px", zIndex: 5 }}>
          <div style={{ position: "relative" }}>
            <HeartParticles active={particles} />
            <button onClick={handleWishlist} style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: wishlisted ? "#fff1f1" : "rgba(255,255,255,0.95)",
              border: wishlisted ? "1.5px solid #fca5a5" : "1.5px solid rgba(200,200,200,0.6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.14)",
              transition: "all 0.25s ease",
              transform: wishlisted ? "scale(1.12)" : "scale(1)",
            }}>
              <Heart size={15} style={{
                fill:  wishlisted ? "#ef4444" : "transparent",
                color: wishlisted ? "#ef4444" : "#475792",
                transition: "all 0.25s ease",
              }} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Info area ── */}
      <div style={{ padding: "12px 12px 13px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        {/* Category label — human readable */}
        <p style={{
          fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 600,
          color: "var(--color-blue)", textTransform: "uppercase",
          letterSpacing: "0.8px", marginBottom: "5px",
        }}>
          {product.category.replace(/-/g, " ")}
        </p>

        {/* Title — uses product.title */}
        <h3 style={{
          fontFamily: "'Playfair Display',serif", fontSize: "15px",
          fontWeight: 600, color: "var(--color-text-primary)",
          marginBottom: "8px", lineHeight: 1.4,
        }}>
          {product.title}
        </h3>

        {/* Stars */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
          <StarRating rating={product.rating} />
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "var(--color-text-secondary)" }}>
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price — from dimensions[0] */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "18px", fontWeight: 700, color: "var(--color-blue-dark)" }}>
            ₹{price.toLocaleString()}
          </span>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "var(--color-text-secondary)", textDecoration: "line-through" }}>
            ₹{mrp.toLocaleString()}
          </span>
        </div>

        {/* Add to Cart */}
        <div style={{ marginTop: "auto" }}>
          <AddToCartButton product={cartProduct} />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCTS SECTION
// ─────────────────────────────────────────────────────────────────────────────
export default function ProductsSection() {
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const update = () => setVisibleCount(window.innerWidth >= 1024 ? 8 : 4);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const featuredProducts = PRODUCTS.filter((product) => product.tags?.featured);
  const sourceProducts =
    featuredProducts.length > 0 ? featuredProducts : PRODUCTS;
  const visibleProducts = sourceProducts.slice(0, visibleCount);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
        .ps-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:16px; }
        @media (min-width:640px)  { .ps-grid { grid-template-columns:repeat(3,1fr); gap:20px; } }
        @media (min-width:1024px) { .ps-grid { grid-template-columns:repeat(4,1fr); gap:24px; } }
      `}</style>

      <section style={{ background: "var(--color-bg-main)", padding: "72px 0 80px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 14px" }}>

          {/* Header */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "48px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "var(--color-gold-soft)", border: "1px solid #F2B461",
              borderRadius: "999px", padding: "6px 16px", marginBottom: "16px",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-gold)" }} />
              <span style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 700,
                color: "#E6A24A", letterSpacing: "1px", textTransform: "uppercase",
              }}>
                Handcrafted with Love
              </span>
            </div>

            <h2 style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(28px,4vw,44px)", fontWeight: 700,
              color: "var(--color-blue-dark)", textAlign: "center",
              lineHeight: 1.2, marginBottom: "14px",
            }}>
              Our Featured <span style={{ color: "var(--color-gold)" }}>Collection</span>
            </h2>

            <p style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: "15px",
              color: "var(--color-text-secondary)", textAlign: "center",
              maxWidth: "480px", lineHeight: 1.7,
            }}>
              Beautifully crafted Islamic home decor that brings elegance and
              spiritual meaning to every corner of your home.
            </p>
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "40px" }}>
            <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--color-gold)" }} />
            <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
          </div>

          {/* Grid */}
          <div className="ps-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More */}
          {visibleCount < sourceProducts.length && (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "52px" }}>
              <button
                onClick={() => setVisibleCount((prev) => prev + 4)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "14px 36px", borderRadius: "999px",
                  background: "var(--color-blue-dark)", color: "white",
                  fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "14px",
                  border: "none", cursor: "pointer", transition: "all 0.3s ease",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)";
                }}
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
