"use client";

import { useState } from "react";
import { Star, ChevronDown, ChevronRight, Heart, ShoppingCart, Check } from "lucide-react";
import Link from "next/link";
import { PRODUCTS } from "@/app/data/productsData";

// ── Mock product detail data ──
const PRODUCT = {
  id: 1,
  name: "Ayatul Kursi Gold Frame",
  price: 1299,
  originalPrice: 1799,
  rating: 4.8,
  reviews: 124,
  category: "Islamic Wall Art",
  description:
    "A masterpiece of Islamic artistry, this Ayatul Kursi frame features precision laser-cut Arabic calligraphy finished in 24K gold plating. Crafted from premium solid wood, each frame is hand-inspected to ensure flawless detail and lasting beauty.",
  description2:
    "The frame arrives fully assembled with mounting hardware included. Its timeless design makes it a perfect centerpiece for any room, blending spiritual significance with refined aesthetic elegance that elevates your living space.",
  colors: [
    { name: "Gold", hex: "#D4A843" },
    { name: "Silver", hex: "#9CA3AF" },
    { name: "Black", hex: "#1F2937" },
    { name: "Rose Gold", hex: "#C4806A" },
    { name: "Ivory", hex: "#E8DCC8" },
  ],
  specifications: [
    "Dimensions: 60cm (H) x 45cm (W) x 2cm (D)",
    "Material: Solid Sheesham Wood + Gold Plating",
    "Arabic Script: Ayatul Kursi — Surah Al-Baqarah 2:255",
    "Finish: Hand-polished 24K gold leaf",
    "Mounting: Wall-ready with included hardware",
  ],
  features: [
    "Precision CNC laser-cut calligraphy",
    "UV-resistant coating for lasting shine",
    "Comes in premium gift packaging",
    "Certificate of authenticity included",
  ],
  images: [
    "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    "https://images.unsplash.com/photo-1540479859555-17af45c78602?w=800&q=80",
    "https://images.unsplash.com/photo-1490750967868-88df5691cc38?w=800&q=80",
  ],
};

const SIMILAR = PRODUCTS.slice(1, 5);

const BADGE_STYLES = {
  "Best Seller": { bg: "#1a2e6e", color: "#fff" },
  New:           { bg: "#16a34a", color: "#fff" },
  Sale:          { bg: "#dc2626", color: "#fff" },
  Premium:       { bg: "#92400e", color: "#fff" },
  Limited:       { bg: "#7c3aed", color: "#fff" },
  Popular:       { bg: "#0369a1", color: "#fff" },
};

function StarRow({ rating, reviews }) {
  return (
    <div className="flex items-center gap-2">
      <Star size={16} fill="var(--color-gold)" color="var(--color-gold)" />
      <span className="font-semibold text-[var(--color-text-primary)] text-sm">{rating}</span>
      <span className="text-[var(--color-text-secondary)] text-sm underline cursor-pointer">
        {reviews.toLocaleString()} Reviews
      </span>
    </div>
  );
}

function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[var(--color-border)] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3.5 bg-[var(--color-white)] hover:bg-[var(--color-blue-soft)] transition-colors duration-200"
      >
        <span className="font-semibold text-[14px] text-[var(--color-text-primary)]">{title}</span>
        <ChevronDown
          size={16}
          className="text-[var(--color-text-secondary)] transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 pt-2 bg-[var(--color-bg-main)]">
          {children}
        </div>
      )}
    </div>
  );
}

export default function ProductDetailPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [cartPhase, setCartPhase] = useState("idle"); // idle | added

  

  const handleAddToCart = () => {
    if (cartPhase !== "idle") return;
    setCartPhase("added");
  };

  const discount = Math.round(
    ((PRODUCT.originalPrice - PRODUCT.price) / PRODUCT.originalPrice) * 100
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .pdp-heading { font-family: 'Playfair Display', serif; }
      `}</style>

      <div className="min-h-screen bg-[var(--color-bg-main)]">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">

          {/* ── Breadcrumb ── */}
          <nav className="flex items-center gap-1.5 text-[13px] mb-6">
            <Link href="/" className="text-[var(--color-text-secondary)] hover:text-[var(--color-blue)] transition-colors">Home</Link>
            <ChevronRight size={13} className="text-[var(--color-text-secondary)]" />
            <Link href="/products" className="text-[var(--color-text-secondary)] hover:text-[var(--color-blue)] transition-colors">All Products</Link>
            <ChevronRight size={13} className="text-[var(--color-text-secondary)]" />
            <span className="text-[var(--color-text-primary)] font-medium">{PRODUCT.name}</span>
          </nav>

          {/* ── Main Product Section ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">

            {/* LEFT — Images */}
            <div className="flex flex-col gap-3">
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden bg-[var(--color-white)] border border-[var(--color-border)] aspect-square shadow-[var(--shadow-soft)]">
                <img
                  src={PRODUCT.images[activeImage]}
                  alt={PRODUCT.name}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
                {/* Discount badge on main image */}
                <div className="absolute top-3 left-3 bg-[var(--color-gold)] text-[var(--color-blue-dark)] text-[11px] font-bold px-3 py-1 rounded-full">
                  -{discount}% OFF
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {PRODUCT.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`rounded-xl overflow-hidden border-2 transition-all duration-200 flex-1 aspect-square ${
                      activeImage === i
                        ? "border-[var(--color-blue)] shadow-md"
                        : "border-[var(--color-border)] hover:border-[var(--color-blue-soft)]"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT — Details */}
            <div className="flex flex-col gap-4">

              {/* Title + Price */}
              <div className="flex items-start justify-between gap-4">
                <h1 className="pdp-heading text-2xl lg:text-3xl font-bold text-[var(--color-blue-dark)] leading-tight">
                  {PRODUCT.name}
                </h1>
                <div className="text-right shrink-0">
                  <div className="text-2xl font-bold text-[var(--color-blue-dark)]">
                    ₹{PRODUCT.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-[var(--color-text-secondary)] line-through">
                    ₹{PRODUCT.originalPrice.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Rating */}
              <StarRow rating={PRODUCT.rating} reviews={PRODUCT.reviews} />

              {/* Divider */}
              <div className="h-px bg-[var(--color-border)]" />

              {/* Description heading */}
              <div>
                <h2 className="font-semibold text-[15px] text-[var(--color-text-primary)] mb-2">
                  Product Description
                </h2>

                {/* Color swatches */}
                <div className="flex items-center gap-2 mb-3">
                  {PRODUCT.colors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(i)}
                      title={c.name}
                      className={`w-7 h-7 rounded-full border-2 transition-all duration-200 ${
                        selectedColor === i
                          ? "border-[var(--color-blue)] scale-110 shadow-md"
                          : "border-transparent hover:scale-105"
                      }`}
                      style={{ background: c.hex, outline: selectedColor === i ? "2px solid var(--color-blue-soft)" : "none", outlineOffset: "1px" }}
                    />
                  ))}
                  <span className="text-[13px] text-[var(--color-text-secondary)] ml-1">
                    {PRODUCT.colors[selectedColor].name}
                  </span>
                </div>

                <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed mb-2">
                  {PRODUCT.description}
                </p>
                <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed">
                  {PRODUCT.description2}
                </p>
              </div>

              {/* Accordions */}
              <div className="flex flex-col gap-2">
                <Accordion title="Specification">
                  <ul className="flex flex-col gap-1.5">
                    {PRODUCT.specifications.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                        <Check size={13} className="mt-0.5 shrink-0 text-[var(--color-blue)]" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </Accordion>

                <Accordion title="Feature">
                  <ul className="flex flex-col gap-1.5">
                    {PRODUCT.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                        <Check size={13} className="mt-0.5 shrink-0 text-[var(--color-gold)]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </Accordion>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 mt-2">
                {/* Buy Now / Added */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 h-12 rounded-xl font-bold text-[14px] flex items-center justify-center gap-2 transition-all duration-300 ${
                    cartPhase === "added"
                      ? "bg-[#22c55e] text-white shadow-lg"
                      : "bg-[var(--color-blue-dark)] text-white hover:bg-[var(--color-blue)] hover:shadow-lg hover:-translate-y-0.5"
                  }`}
                >
                  {cartPhase === "added" ? (
                    <>
                      <Check size={16} strokeWidth={3} />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={16} />
                      Buy Now
                    </>
                  )}
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => setWishlisted((w) => !w)}
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-200 ${
                    wishlisted
                      ? "border-red-300 bg-red-50"
                      : "border-[var(--color-border)] bg-[var(--color-white)] hover:border-red-300 hover:bg-red-50"
                  }`}
                >
                  <Heart
                    size={18}
                    fill={wishlisted ? "#ef4444" : "transparent"}
                    color={wishlisted ? "#ef4444" : "var(--color-text-secondary)"}
                    className="transition-all duration-200"
                  />
                </button>

                {/* Cart icon button */}
                <button className="w-12 h-12 rounded-xl border border-[var(--color-border)] bg-[var(--color-white)] flex items-center justify-center hover:border-[var(--color-blue)] hover:bg-[var(--color-blue-soft)] transition-all duration-200">
                  <ShoppingCart size={18} className="text-[var(--color-text-secondary)]" />
                </button>
              </div>
            </div>
          </div>

          {/* ── Similar Products ── */}
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="pdp-heading text-xl font-bold text-[var(--color-blue-dark)]">
                Similar Product
              </h2>
              <Link
                href="/products"
                className="flex items-center gap-1.5 text-[13px] font-semibold text-[var(--color-text-primary)] border border-[var(--color-border)] px-4 py-2 rounded-full hover:border-[var(--color-blue)] hover:text-[var(--color-blue)] transition-all duration-200"
              >
                VIEW MORE <ChevronRight size={14} />
              </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {SIMILAR.map((p) => {
                const bs = BADGE_STYLES[p.badge] || { bg: "#475792", color: "#fff" };
                const disc = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
                return (
                  <Link
                    key={p.id}
                    href={`/products/${p.id}`}
                    className="bg-[var(--color-white)] rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="relative aspect-square overflow-hidden bg-[var(--color-bg-main)]">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {p.badge && (
                        <div
                          className="absolute top-2 left-2 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full"
                          style={{ background: bs.bg, color: bs.color }}
                        >
                          {p.badge}
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-blue)] mb-1">{p.category}</p>
                      <h3 className="text-[13px] font-semibold text-[var(--color-text-primary)] leading-snug mb-2 line-clamp-2">{p.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] font-bold text-[var(--color-blue-dark)]">₹{p.price.toLocaleString()}</span>
                        <span className="text-[11px] text-[var(--color-text-secondary)] line-through">₹{p.originalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}