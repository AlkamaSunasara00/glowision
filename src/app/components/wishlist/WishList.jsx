"use client";

import { useState, useEffect } from "react";
import { Heart, Trash, ShoppingCart, ChevronRight, Star } from "lucide-react";
import Link from "next/link";

// ─── Heart Particles ──────────────────────────────────────────────────────────
function HeartParticles({ active }) {
  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * 360;
        const distance = 28 + Math.random() * 16;
        const rad = (angle * Math.PI) / 180;
        const tx = Math.cos(rad) * distance;
        const ty = Math.sin(rad) * distance;
        const size = 4 + Math.random() * 4;
        const colors = ["#ef4444", "#f87171", "#fca5a5", "#FF6B6B", "#fff"];
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%", left: "50%",
              width: `${size}px`, height: `${size}px`,
              borderRadius: "50%",
              background: colors[i % colors.length],
              transform: "translate(-50%, -50%)",
              animation: `particle-wb-${i} 0.6s ease-out forwards`,
            }}
          >
            <style>{`
              @keyframes particle-wb-${i} {
                0%   { transform: translate(-50%,-50%) translate(0,0) scale(1); opacity:1; }
                100% { transform: translate(-50%,-50%) translate(${tx}px,${ty}px) scale(0); opacity:0; }
              }
            `}</style>
          </div>
        );
      })}
    </div>
  );
}

// ─── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
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

// ─── Badge styles ─────────────────────────────────────────────────────────────
const BADGE_STYLES = {
  "Best Seller": { bg: "#1a2e6e", color: "#fff" },
  New:           { bg: "#16a34a", color: "#fff" },
  Sale:          { bg: "#dc2626", color: "#fff" },
  Premium:       { bg: "#92400e", color: "#fff" },
  Limited:       { bg: "#7c3aed", color: "#fff" },
  Popular:       { bg: "#0369a1", color: "#fff" },
};

// ─── Wishlist Item ────────────────────────────────────────────────────────────
function WishlistItem({ item, onRemove }) {
  const [particles, setParticles] = useState(false);
  const [removing, setRemoving] = useState(false);

  const handleRemove = () => {
    setParticles(true);
    setTimeout(() => setParticles(false), 700);
    setRemoving(true);
    setTimeout(() => onRemove(item.id), 420);
  };

  const discount =
    item.originalPrice > item.price
      ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
      : 0;

  const badgeStyle = BADGE_STYLES[item.badge] || { bg: "#475792", color: "#fff" };

  return (
    <div
      className="group grid gap-5 items-center p-5 bg-[var(--color-white)] hover:bg-[var(--color-bg-main)] border border-[var(--color-border)] rounded-[20px] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all duration-300"
      style={{
        gridTemplateColumns: "120px 1fr auto",
        opacity: removing ? 0 : 1,
        transform: removing ? "scale(0.95) translateX(-20px)" : "scale(1) translateX(0)",
        transition: removing
          ? "opacity 0.42s ease, transform 0.42s ease"
          : "all 0.35s cubic-bezier(0.34, 1.2, 0.64, 1)",
      }}
    >
      {/* IMAGE */}
      <Link href={`/products/${item.id}`} className="block flex-shrink-0">
        <div className="w-[120px] h-[120px] rounded-[14px] overflow-hidden bg-[var(--color-bg-main)] relative shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
          <img
            src={item.images?.[0] || item.image}
            alt={item.name}
            className="w-full h-full object-cover absolute inset-0 opacity-100 group-hover:opacity-0 scale-100 group-hover:scale-105 transition-all duration-500"
          />
          {item.images?.[1] && (
            <img
              src={item.images[1]}
              alt={item.name + " alt"}
              className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-100 transition-all duration-500"
            />
          )}
          {item.badge && (
            <div
              className="absolute top-2 left-2 z-10 text-[9px] font-bold tracking-[0.6px] uppercase px-2 py-1 rounded-full shadow-md"
              style={{ background: badgeStyle.bg, color: badgeStyle.color }}
            >
              {item.badge}
            </div>
          )}
        </div>
      </Link>

      {/* INFO */}
      <div className="min-w-0">
        <p className="font-['DM_Sans'] text-[11px] font-semibold text-[var(--color-blue)] uppercase tracking-[0.8px] mb-1">
          {item.category}
        </p>

        <Link href={`/products/${item.id}`} className="no-underline">
          <h3 className="font-['Playfair_Display'] text-[clamp(15px,2vw,18px)] font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-blue)] leading-[1.35] mb-2 transition-colors duration-200">
            {item.name}
          </h3>
        </Link>

        {item.rating && (
          <div className="flex items-center gap-1.5 mb-2.5">
            <StarRating rating={item.rating} />
            <span className="font-['DM_Sans'] text-[11px] text-[var(--color-text-secondary)]">
              {item.rating} ({item.reviews || 0})
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-['DM_Sans'] text-lg font-bold text-[var(--color-blue-dark)]">
            ₹{item.price.toLocaleString()}
          </span>
          {item.originalPrice > item.price && (
            <span className="font-['DM_Sans'] text-[13px] text-[var(--color-text-secondary)] line-through">
              ₹{item.originalPrice.toLocaleString()}
            </span>
          )}
          {discount > 0 && (
            <span className="bg-red-50 text-red-600 font-['DM_Sans'] text-[11px] font-bold px-2 py-0.5 rounded-full border border-red-200">
              -{discount}%
            </span>
          )}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col items-center gap-2.5 flex-shrink-0">
        {/* Remove button */}
        <div className="relative">
          <HeartParticles active={particles} />
          <button
            onClick={handleRemove}
            title="Remove from wishlist"
            className="w-10 h-10 rounded-full bg-red-50 border border-red-200 flex items-center justify-center cursor-pointer shadow-sm hover:bg-red-500 hover:border-red-500 [&:hover_svg]:text-white transition-all duration-200"
          >
            <Trash size={16} className="text-red-500 transition-colors duration-200" />
          </button>
        </div>

        {/* View product button */}
        <Link href={`/products/${item.id}`}>
          <button
            title="View product"
            className="w-10 h-10 rounded-full bg-[var(--color-gold-soft)] border border-[#F2B461] flex items-center justify-center cursor-pointer shadow-sm hover:bg-[var(--color-gold)] hover:scale-110 transition-all duration-200"
          >
            <ShoppingCart size={16} className="text-[var(--color-blue-dark)]" />
          </button>
        </Link>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("glowison_wishlist") || "[]");
    setWishlist(saved);
    setLoading(false);
  }, []);

  const removeItem = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("glowison_wishlist", JSON.stringify(updated));
  };

  const clearAll = () => {
    if (confirm("Are you sure you want to clear your wishlist?")) {
      setWishlist([]);
      localStorage.removeItem("glowison_wishlist");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-['DM_Sans'] text-[var(--color-blue-dark)] font-semibold">
          Loading...
        </p>
      </div>
    );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');

        .wl-item-row { animation: wlFadeUp 0.45s ease both; }
        .wl-item-row:nth-child(1) { animation-delay: 0.05s; }
        .wl-item-row:nth-child(2) { animation-delay: 0.10s; }
        .wl-item-row:nth-child(3) { animation-delay: 0.15s; }
        .wl-item-row:nth-child(4) { animation-delay: 0.20s; }
        .wl-item-row:nth-child(5) { animation-delay: 0.25s; }
        @keyframes wlFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 580px) {
          .wl-item-grid {
            grid-template-columns: 90px 1fr !important;
            grid-template-rows: auto auto;
          }
          .wl-item-grid .wl-thumb {
            width: 90px !important;
            height: 90px !important;
          }
          .wl-item-actions {
            flex-direction: row !important;
            grid-column: 1 / -1;
            justify-content: flex-end;
            padding-top: 12px;
            border-top: 1px solid var(--color-border);
          }
        }
      `}</style>

      <section className="bg-[var(--color-bg-main)] min-h-screen pt-6 pb-28">
        <div className="max-w-[860px] mx-auto px-4 md:px-6">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[13px] mb-6 flex-wrap font-['DM_Sans']">
            <Link href="/" className="text-[var(--color-text-secondary)] hover:text-[var(--color-blue)] transition-colors">
              Home
            </Link>
            <ChevronRight size={12} className="text-[var(--color-text-secondary)]" />
            <span className="text-[var(--color-text-primary)] font-medium">Wishlist</span>
          </nav>

          {/* ── Header ── */}
          <div className="flex flex-col items-center mb-12 mt-4">
            <h1
              className="font-['Playfair_Display'] font-bold text-[var(--color-blue-dark)] text-center leading-tight mb-3"
              style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
            >
              Your <span className="text-[var(--color-gold)]">Wishlist</span>
            </h1>
            <p className="font-['DM_Sans'] text-[15px] text-[var(--color-text-secondary)] text-center max-w-[420px] leading-relaxed">
              {wishlist.length > 0
                ? `You have ${wishlist.length} saved ${wishlist.length === 1 ? "piece" : "pieces"} waiting for you.`
                : "Pieces you love will appear here. Start exploring our collection."}
            </p>
          </div>

          {/* Gold dot divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-[var(--color-border)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--color-gold)]" />
            <div className="flex-1 h-px bg-[var(--color-border)]" />
          </div>

          {/* Clear all */}
          {wishlist.length > 0 && (
            <div className="flex justify-end mb-5">
              <button
                onClick={clearAll}
                className="font-['DM_Sans'] text-[13px] font-semibold text-[var(--color-text-secondary)] hover:text-red-600 bg-transparent border-none cursor-pointer transition-colors duration-200"
              >
                Clear all
              </button>
            </div>
          )}

          {/* ── EMPTY STATE ── */}
          {wishlist.length === 0 ? (
            <div className="bg-[var(--color-white)] rounded-3xl border border-[var(--color-border)] shadow-[var(--shadow-soft)] px-6 py-20 text-center">
              <div className="w-[72px] h-[72px] rounded-full bg-[var(--color-gold-soft)] flex items-center justify-center mx-auto mb-5">
                <Heart size={28} className="text-[var(--color-gold)] fill-[var(--color-gold)]" />
              </div>

              <h2 className="font-['Playfair_Display'] text-[22px] font-semibold text-[var(--color-blue-dark)] mb-2.5">
                Your Wishlist is Empty
              </h2>

              <p className="font-['DM_Sans'] text-[14px] text-[var(--color-text-secondary)] max-w-[340px] mx-auto mb-8 leading-relaxed">
                Save your favorite decor pieces here and come back anytime.
              </p>

              <Link href="/products">
                <button className="inline-flex items-center gap-2 px-9 py-3.5 rounded-full bg-[var(--color-blue-dark)] text-white font-['DM_Sans'] font-bold text-[14px] border-none cursor-pointer shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-300">
                  Explore Collection <ChevronRight size={16} />
                </button>
              </Link>
            </div>
          ) : (
            /* ── ITEMS LIST ── */
            <div className="flex flex-col gap-4">
              {wishlist.map((item) => (
                <div key={item.id} className="wl-item-row">
                  <WishlistItem item={item} onRemove={removeItem} />
                </div>
              ))}

              {/* Continue shopping CTA */}
              <div className="flex justify-center mt-6">
                <Link href="/products">
                  <button className="inline-flex items-center gap-2 px-9 py-3.5 rounded-full bg-[var(--color-blue-dark)] text-white font-['DM_Sans'] font-bold text-[14px] border-none cursor-pointer shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-300">
                    Continue Shopping <ChevronRight size={16} />
                  </button>
                </Link>
              </div>
            </div>
          )}

        </div>
      </section>

    </>
  );
}