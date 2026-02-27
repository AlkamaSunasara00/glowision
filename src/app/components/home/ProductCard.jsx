"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { PRODUCTS } from "@/app/data/productsData";
import { ArrowDown } from "lucide-react";
import AddToCartButton from "@/app/ui/buttons/AtcButton";

// Badge color map
const BADGE_STYLES = {
  "Best Seller": { bg: "#1a2e6e", color: "#fff" },
  New: { bg: "#16a34a", color: "#fff" },
  Sale: { bg: "#dc2626", color: "#fff" },
  Premium: { bg: "#92400e", color: "#fff" },
  Limited: { bg: "#7c3aed", color: "#fff" },
  Popular: { bg: "#0369a1", color: "#fff" },
};

function HeartParticles({ active }) {
  const particles = Array.from({ length: 10 });
  if (!active) return null;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      {particles.map((_, i) => {
        const angle = (i / particles.length) * 360;
        const distance = 28 + Math.random() * 16;
        const rad = (angle * Math.PI) / 180;
        const tx = Math.cos(rad) * distance;
        const ty = Math.sin(rad) * distance;
        const size = 4 + Math.random() * 4;
        const colors = ["#ef4444", "#f87171", "#fca5a5", "#FF6B6B", "#fff"];
        const color = colors[i % colors.length];
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: "50%",
              background: color,
              transform: "translate(-50%, -50%)",
              animation: `particle-burst-${i} 0.6s ease-out forwards`,
            }}
          >
            <style>{`
              @keyframes particle-burst-${i} {
                0%   { transform: translate(-50%, -50%) translate(0px, 0px) scale(1); opacity: 1; }
                100% { transform: translate(-50%, -50%) translate(${tx}px, ${ty}px) scale(0); opacity: 0; }
              }
            `}</style>
          </div>
        );
      })}
    </div>
  );
}

function StarRating({ rating }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={11}
          style={{
            fill: s <= Math.round(rating) ? "#475792" : "transparent",
            color: s <= Math.round(rating) ? "#475792" : "#D1D5DB",
          }}
        />
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [particles, setParticles] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!wishlisted) {
      setParticles(true);
      setTimeout(() => setParticles(false), 700);
    }
    setWishlisted((w) => !w);
  };

  const handleCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1800);
  };

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  const badgeStyle = BADGE_STYLES[product.badge] || {
    bg: "#475792",
    color: "#fff",
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--color-white)",
        borderRadius: "20px",
        overflow: "hidden",
        border: "1px solid var(--color-border)",
        boxShadow: hovered ? "var(--shadow-hover)" : "var(--shadow-soft)",
        transition: "all 0.35s cubic-bezier(0.34, 1.2, 0.64, 1)",
        cursor: "pointer",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ================= IMAGE ================= */}
      <div
        style={{
          position: "relative",
          aspectRatio: "1/1",
          overflow: "hidden",
          background: "var(--color-bg-main)",
        }}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            inset: 0,
            opacity: hovered ? 0 : 1,
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "all 0.5s ease",
          }}
        />
        <img
          src={product.images[1]}
          alt={product.name + " alt"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            inset: 0,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "scale(1)" : "scale(1.08)",
            transition: "all 0.5s ease",
          }}
        />

        {/* Badge — top left */}
        {product.badge && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              background: badgeStyle.bg,
              color: badgeStyle.color,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.6px",
              textTransform: "uppercase",
              padding: "4px 10px",
              borderRadius: "999px",
              zIndex: 5,
              boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
            }}
          >
            {product.badge}
          </div>
        )}

        {/* Discount % — top right */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "#fff",
            color: "#dc2626",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px",
            fontWeight: 700,
            padding: "4px 8px",
            borderRadius: "999px",
            zIndex: 5,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            border: "1px solid #fecaca",
          }}
        >
          -{discount}%
        </div>

        {/* Wishlist button — below discount */}
        <div
          style={{
            position: "absolute",
            top: "46px",
            right: "10px",
            zIndex: 5,
          }}
        >
          <div style={{ position: "relative" }}>
            <HeartParticles active={particles} />
            <button
              onClick={handleWishlist}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: wishlisted ? "#fff1f1" : "rgba(255,255,255,0.95)",
                border: wishlisted
                  ? "1.5px solid #fca5a5"
                  : "1.5px solid rgba(200,200,200,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 2px 12px rgba(0,0,0,0.14)",
                transition: "all 0.25s ease",
                transform: wishlisted ? "scale(1.12)" : "scale(1)",
              }}
            >
              <Heart
                size={15}
                style={{
                  fill: wishlisted ? "#ef4444" : "transparent",
                  color: wishlisted ? "#ef4444" : "#475792",
                  transition: "all 0.25s ease",
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ================= CARD BODY ================= */}
      <div
        style={{
          padding: "12px 12px 13px",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            color: "var(--color-blue)",
            textTransform: "uppercase",
            letterSpacing: "0.8px",
            marginBottom: "5px",
          }}
        >
          {product.category}
        </p>

        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "15px",
            fontWeight: 600,
            color: "var(--color-text-primary)",
            marginBottom: "8px",
            lineHeight: 1.4,
          }}
        >
          {product.name}
        </h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "12px",
          }}
        >
          <StarRating rating={product.rating} />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              color: "var(--color-text-secondary)",
            }}
          >
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "14px",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "18px",
              fontWeight: 700,
              color: "var(--color-blue-dark)",
            }}
          >
            ₹{product.price.toLocaleString()}
          </span>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              fontWeight: 400,
              color: "var(--color-text-secondary)",
              textDecoration: "line-through",
            }}
          >
            ₹{product.originalPrice.toLocaleString()}
          </span>
        </div>

        {/* Add to Cart */}
        <div style={{ marginTop: "auto" }}>
          <AddToCartButton onClick={handleCart} />
        </div>
      </div>
    </div>
  );
}

export default function ProductsSection() {
  const [visibleCount, setVisibleCount] = useState(4);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const visibleProducts = PRODUCTS.slice(0, visibleCount);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
        .product-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        @media (min-width: 640px) { .product-grid { grid-template-columns: repeat(3, 1fr); gap: 20px; } }
        @media (min-width: 1024px) { .product-grid { grid-template-columns: repeat(4, 1fr); gap: 24px; } }
      `}</style>

      <section
        style={{ background: "var(--color-bg-main)", padding: "72px 0 80px" }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: isMobile ? "0 10px" : "0 24px",
          }}
        >
          {/* Section Header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "48px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "var(--color-gold-soft)",
                border: "1px solid #F2B461",
                borderRadius: "999px",
                padding: "6px 16px",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--color-gold)",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#E6A24A",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                Handcrafted with Love
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 700,
                color: "var(--color-blue-dark)",
                textAlign: "center",
                lineHeight: 1.2,
                marginBottom: "14px",
              }}
            >
              Our Featured{" "}
              <span style={{ color: "var(--color-gold)" }}>Collection</span>
            </h2>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "15px",
                color: "var(--color-text-secondary)",
                textAlign: "center",
                maxWidth: "480px",
                lineHeight: 1.7,
              }}
            >
              Beautifully crafted Islamic home decor that brings elegance and
              spiritual meaning to every corner of your home.
            </p>
          </div>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "var(--color-border)",
              }}
            />
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "var(--color-gold)",
              }}
            />
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "var(--color-border)",
              }}
            />
          </div>

          {/* Product Grid */}
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More */}
          {visibleCount < PRODUCTS.length && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "52px",
              }}
            >
              <button
                onClick={() => setVisibleCount((prev) => prev + 4)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 36px",
                  borderRadius: "999px",
                  background: "var(--color-blue-dark)",
                  color: "white",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(0,0,0,0.08)";
                }}
              >
                Load More
                <ArrowDown size={16} />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
