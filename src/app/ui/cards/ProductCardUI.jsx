import { Heart, Star } from "lucide-react";
import AddToCartButton from "@/app/ui/buttons/AtcButton";

const BADGE_STYLES = {
  "Best Seller": { bg: "#1a2e6e", color: "#fff" },
  New:           { bg: "#16a34a", color: "#fff" },
  Sale:          { bg: "#dc2626", color: "#fff" },
  Premium:       { bg: "#92400e", color: "#fff" },
  Limited:       { bg: "#7c3aed", color: "#fff" },
  Popular:       { bg: "#0369a1", color: "#fff" },
};

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
          <div key={i} style={{ position: "absolute", top: "50%", left: "50%", width: `${size}px`, height: `${size}px`, borderRadius: "50%", background: colors[i % colors.length], transform: "translate(-50%,-50%)", animation: `hpburst${i} 0.6s ease-out forwards` }}>
            <style>{`@keyframes hpburst${i}{0%{transform:translate(-50%,-50%) translate(0,0) scale(1);opacity:1}100%{transform:translate(-50%,-50%) translate(${tx}px,${ty}px) scale(0);opacity:0}}`}</style>
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
        <Star key={s} size={11} style={{ fill: s <= Math.round(rating) ? "var(--color-gold)" : "transparent", color: s <= Math.round(rating) ? "var(--color-gold)" : "#D1D5DB", transition: "all 0.2s ease" }} />
      ))}
    </div>
  );
}

// ── Pure UI — receives everything via props ───────────────────────────────────
export default function ProductCardUI({
  product,
  hovered       = false,
  wishlisted    = false,
  particles     = false,
  onCardClick,
  onWishlist,
  onMouseEnter,
  onMouseLeave,
}) {
  const discount   = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const badgeStyle = BADGE_STYLES[product.badge] || { bg: "#475792", color: "#fff" };

  return (
    <div
      onClick={onCardClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ background: "var(--color-white)", borderRadius: "20px", overflow: "hidden", border: "1px solid var(--color-border)", boxShadow: hovered ? "var(--shadow-hover)" : "var(--shadow-soft)", transition: "all 0.35s cubic-bezier(0.34,1.2,0.64,1)", cursor: "pointer", position: "relative", display: "flex", flexDirection: "column" }}
    >
      {/* ── Image Area ── */}
      <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", background: "var(--color-bg-main)" }}>
        <img src={product.images[0]} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0, opacity: hovered ? 0 : 1, transform: hovered ? "scale(1.08)" : "scale(1)", transition: "all 0.5s ease" }} />
        <img src={product.images[1]} alt={product.name + " alt"} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0, opacity: hovered ? 1 : 0, transform: hovered ? "scale(1)" : "scale(1.08)", transition: "all 0.5s ease" }} />

        {/* Badge */}
        {product.badge && (
          <div style={{ position: "absolute", top: "10px", left: "10px", background: badgeStyle.bg, color: badgeStyle.color, fontFamily: "'DM Sans',sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase", padding: "4px 10px", borderRadius: "999px", zIndex: 5, boxShadow: "0 2px 8px rgba(0,0,0,0.18)" }}>
            {product.badge}
          </div>
        )}

        {/* Discount */}
        <div style={{ position: "absolute", top: "10px", right: "10px", background: "#fff", color: "#dc2626", fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 700, padding: "4px 8px", borderRadius: "999px", zIndex: 5, boxShadow: "0 2px 8px rgba(0,0,0,0.1)", border: "1px solid #fecaca" }}>
          -{discount}%
        </div>

        {/* Wishlist */}
        <div style={{ position: "absolute", top: "46px", right: "10px", zIndex: 5 }}>
          <div style={{ position: "relative" }}>
            <HeartParticles active={particles} />
            <button
              onClick={onWishlist}
              style={{ width: "36px", height: "36px", borderRadius: "50%", background: wishlisted ? "#fff1f1" : "rgba(255,255,255,0.95)", border: wishlisted ? "1.5px solid #fca5a5" : "1.5px solid rgba(200,200,200,0.6)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.14)", transition: "all 0.25s ease", transform: wishlisted ? "scale(1.12)" : "scale(1)" }}
            >
              <Heart size={15} style={{ fill: wishlisted ? "#ef4444" : "transparent", color: wishlisted ? "#ef4444" : "#475792", transition: "all 0.25s ease" }} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Info Area ── */}
      <div style={{ padding: "12px 12px 13px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 600, color: "var(--color-blue)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "5px" }}>
          {product.category}
        </p>
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "15px", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "8px", lineHeight: 1.4 }}>
          {product.name}
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
          <StarRating rating={product.rating} />
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "var(--color-text-secondary)" }}>
            {product.rating} ({product.reviews})
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "18px", fontWeight: 700, color: "var(--color-blue-dark)" }}>
            ₹{product.price.toLocaleString()}
          </span>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "var(--color-text-secondary)", textDecoration: "line-through" }}>
            ₹{product.originalPrice.toLocaleString()}
          </span>
        </div>
        <div style={{ marginTop: "auto" }}>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}