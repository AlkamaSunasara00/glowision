"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Star,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Heart,
  Check,
  Plus,
  Minus,
  Share2,
  Truck,
  RefreshCw,
  ShieldCheck,
  Headphones,
  Package,
} from "lucide-react";
import Link from "next/link";
import { PRODUCTS, PRODUCT_DETAIL } from "@/app/data/productsData";
import AddToCartButton from "@/app/ui/buttons/AtcButton";
import BuyNowButton from "@/app/ui/buttons/BuyNowButton";

const PRODUCT = PRODUCT_DETAIL;
const SIZES = PRODUCT.sizes || ["16 x 18", "18 x 20", "24 x 27"];
const SIMILAR = PRODUCTS.slice(1, 5);

const BADGE_STYLES = {
  "Best Seller": { bg: "#1a2e6e", color: "#fff" },
  New: { bg: "#16a34a", color: "#fff" },
  Sale: { bg: "#dc2626", color: "#fff" },
  Premium: { bg: "#92400e", color: "#fff" },
  Limited: { bg: "#7c3aed", color: "#fff" },
  Popular: { bg: "#0369a1", color: "#fff" },
};

const ALL_IMAGES = Array.from(
  new Map(
    PRODUCT.colors.flatMap((c) => c.images).map((img) => [img, img]),
  ).values(),
);

// ── Wishlist Sparkles ─────────────────────────────────────────────────────────
function WishlistSparkles({ active }) {
  if (!active) return null;
  return (
    <span className="pointer-events-none absolute inset-0">
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * 360;
        const rad = (angle * Math.PI) / 180;
        const tx = Math.cos(rad) * 22;
        const ty = Math.sin(rad) * 22;
        const colors = ["#ef4444", "#f97316", "#fbbf24", "#ec4899", "#fff"];
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: colors[i % colors.length],
              transform: "translate(-50%,-50%)",
              animation: `spark-pdp-${i} 0.55s ease-out forwards`,
            }}
          >
            <style>{`
              @keyframes spark-pdp-${i} {
                0%   { transform: translate(-50%,-50%) translate(0,0) scale(1); opacity:1; }
                100% { transform: translate(-50%,-50%) translate(${tx}px,${ty}px) scale(0); opacity:0; }
              }
            `}</style>
          </span>
        );
      })}
    </span>
  );
}

// ── Star Row ──────────────────────────────────────────────────────────────────
function StarRow({ rating, reviews }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            size={14}
            fill={s <= Math.floor(rating) ? "#F2B461" : "none"}
            color={s <= Math.floor(rating) ? "#F2B461" : "#D1D5DB"}
          />
        ))}
      </div>
      <span className="text-[13px] font-semibold text-text-primary">
        {rating} Star Rating
      </span>
      <span className="text-[13px] text-text-secondary">
        ({reviews} User feedback)
      </span>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ProductDetailPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [activeBtn, setActiveBtn] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(SIZES[0]);
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [sparkle, setSparkle] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const sizeRef = useRef(null);
  const isAnimating = useRef(false);

  // Sync wishlist state on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("glowison_wishlist") || "[]");
    setWishlisted(saved.some((item) => item.id === PRODUCT.id));
  }, []);

  // Close size dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (sizeRef.current && !sizeRef.current.contains(e.target))
        setIsSizeOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleWishlist = () => {
    const saved = JSON.parse(localStorage.getItem("glowison_wishlist") || "[]");
    if (!wishlisted) {
      setSparkle(true);
      setTimeout(() => setSparkle(false), 600);
      const newItem = {
        id: PRODUCT.id,
        name: PRODUCT.name,
        price: PRODUCT.price,
        originalPrice: PRODUCT.originalPrice,
        images: ALL_IMAGES,
        category: PRODUCT.category,
        rating: PRODUCT.rating,
        reviews: PRODUCT.reviews,
        badge: PRODUCT.badge || null,
      };
      localStorage.setItem(
        "glowison_wishlist",
        JSON.stringify([...saved, newItem]),
      );
    } else {
      localStorage.setItem(
        "glowison_wishlist",
        JSON.stringify(saved.filter((i) => i.id !== PRODUCT.id)),
      );
    }
    setWishlisted((w) => !w);
    window.dispatchEvent(new Event("wishlistUpdate"));
  };

  const goNext = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setActiveBtn("right");
    setActiveImage((prev) => (prev + 1) % ALL_IMAGES.length);
    setTimeout(() => {
      isAnimating.current = false;
      setActiveBtn(null);
    }, 400);
  }, []);

  const goPrev = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setActiveBtn("left");
    setActiveImage(
      (prev) => (prev - 1 + ALL_IMAGES.length) % ALL_IMAGES.length,
    );
    setTimeout(() => {
      isAnimating.current = false;
      setActiveBtn(null);
    }, 400);
  }, []);

  const handleShare = () => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/products/${PRODUCT.id}`
        : "";
    if (navigator.share) {
      navigator.share({ title: PRODUCT.name, url });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied!");
    }
  };

  const discount = Math.round(
    ((PRODUCT.originalPrice - PRODUCT.price) / PRODUCT.originalPrice) * 100,
  );

  // Build WhatsApp message
  const buyNowMessage = [
    `🛒 GLOWISON PURCHASE REQUEST`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `🛍 Product Information`,
    `Product Name : ${PRODUCT.name}`,
    `Category     : ${PRODUCT.category}`,
    `Color        : ${PRODUCT.colors[selectedColor].name}`,
    `Size         : ${selectedSize}`,
    ``,
    `💰 Pricing Summary`,
    `Unit Price   : ₹${PRODUCT.price.toLocaleString()}`,
    `MRP          : ₹${PRODUCT.originalPrice.toLocaleString()}`,
    `Quantity     : ${quantity}`,
    `Total Amount : ₹${(PRODUCT.price * quantity).toLocaleString()}`,
    ``,
    `🔗 Product Link:`,
    typeof window !== "undefined"
      ? `${window.location.origin}/products/${PRODUCT.id}`
      : "",
    ``,
    `Please confirm availability and share payment details.`,
    `Thank you! 😊`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
  ].join("\n");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .pdp-heading { font-family: 'Playfair Display', serif; }
        .img-fade { animation: imgFade 0.3s ease; }
        @keyframes imgFade { from { opacity: 0.5; } to { opacity: 1; } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="min-h-screen bg-bg-main">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[16px] mb-3 flex-wrap pb-6 border-b border-border">
            <Link
              href="/"
              className="text-text-secondary hover:text-blue transition-colors"
            >
              Home
            </Link>
            <ChevronRight size={12} className="text-text-secondary" />
            <Link
              href="/products"
              className="text-text-secondary hover:text-blue transition-colors"
            >
              All Products
            </Link>
            <ChevronRight size={12} className="text-text-secondary" />
            <span className="text-text-primary font-medium">
              {PRODUCT.name}
            </span>
          </nav>

          {/* Main grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-10">
            {/* LEFT */}
            <div className="flex flex-col gap-3">
              <div
                className="relative rounded-2xl overflow-hidden bg-white border border-border shadow-soft"
                style={{ aspectRatio: "4/3" }}
              >
                <img
                  key={activeImage}
                  src={ALL_IMAGES[activeImage]}
                  alt={PRODUCT.name}
                  className="w-full h-full object-cover img-fade"
                />
                <div className="absolute top-3 left-3 bg-gold text-blue-dark text-[10px] font-bold px-2.5 py-1 rounded-full z-10">
                  -{discount}% OFF
                </div>
              </div>

              {/* Thumbnails */}
              <div className="relative flex items-center gap-2">
                <button
                  onClick={goPrev}
                  className={`shrink-0 w-9 h-16 rounded-r-2xl flex items-center justify-center shadow-md transition-all duration-300 cursor-pointer ${activeBtn === "left" ? "bg-gold text-white" : "bg-white text-blue-dark hover:bg-gold hover:text-white"}`}
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="flex gap-2 overflow-x-auto flex-1 scrollbar-hide">
                  {ALL_IMAGES.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`rounded-xl overflow-hidden border-2 transition-all duration-200 shrink-0 w-16 h-16 ${activeImage === i ? "border-blue shadow-md scale-105" : "border-border hover:border-blue opacity-70 hover:opacity-100"}`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
                <button
                  onClick={goNext}
                  className={`shrink-0 w-9 h-16 rounded-l-2xl flex items-center justify-center shadow-md transition-all duration-300 cursor-pointer ${activeBtn === "right" ? "bg-gold text-white" : "bg-white text-blue-dark hover:bg-gold hover:text-white"}`}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-3 pt-5">
              <StarRow rating={PRODUCT.rating} reviews={PRODUCT.reviews} />

              <h1 className="pdp-heading text-3xl font-bold text-blue-dark leading-snug">
                {PRODUCT.name}
              </h1>

              {/* ID / Availability / Brand / Category */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[13px] mt-1">
                <div>
                  <span className="text-text-secondary">ID: </span>
                  <span className="font-semibold text-text-primary">
                    GLW-{PRODUCT.id.toString().padStart(5, "0")}
                  </span>
                </div>
                <div>
                  <span className="text-text-secondary">Availability: </span>
                  <span className="font-semibold text-green-600">In Stock</span>
                </div>
                <div>
                  <span className="text-text-secondary">Brand: </span>
                  <span className="font-semibold text-blue">Glowison</span>
                </div>
                <div>
                  <span className="text-text-secondary">Category: </span>
                  <span className="font-semibold text-text-primary">
                    {PRODUCT.category}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mt-1">
                <span className="text-3xl font-bold text-blue-dark">
                  ₹{PRODUCT.price.toLocaleString()}
                </span>
                <span className="text-[15px] text-text-secondary line-through">
                  ₹{PRODUCT.originalPrice.toLocaleString()}
                </span>
                <span className="text-[12px] font-bold bg-gold text-blue-dark px-2.5 py-1 rounded-lg">
                  {discount}% OFF
                </span>
              </div>

              <div className="h-px bg-border mt-1 mb-1" />

              {/* Color + Size */}
              <div className="flex flex-col md:flex-row gap-4">
                {/* Color */}
                <div className="flex-1">
                  <p className="text-[12px] font-semibold text-text-secondary uppercase tracking-wider mb-2">
                    Color
                  </p>
                  <div className="border border-border rounded-xl px-4 h-12 bg-white flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-5 h-5 rounded-full border border-border shrink-0"
                        style={{
                          background: PRODUCT.colors[selectedColor].hex,
                        }}
                      />
                      <span className="text-[14px] font-medium text-text-primary">
                        {PRODUCT.colors[selectedColor].name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {PRODUCT.colors.map((c, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setSelectedColor(i);
                            const idx = ALL_IMAGES.indexOf(c.images[0]);
                            if (idx !== -1) setActiveImage(idx);
                          }}
                          className="cursor-pointer"
                          style={{
                            width: "18px",
                            height: "18px",
                            borderRadius: "50%",
                            background: c.hex,
                            border:
                              selectedColor === i
                                ? "2px solid #475792"
                                : "1px solid #ddd",
                            transform:
                              selectedColor === i ? "scale(1.1)" : "scale(1)",
                            transition: "all 0.2s ease",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Size */}
                <div className="flex-1 relative" ref={sizeRef}>
                  <p className="text-[12px] font-semibold text-text-secondary uppercase tracking-wider mb-2">
                    Size (inch)
                  </p>
                  <button
                    onClick={() => setIsSizeOpen(!isSizeOpen)}
                    className="w-full h-12 border border-border rounded-xl px-4 bg-white flex items-center justify-between text-[14px] font-medium text-text-primary hover:border-blue transition-all cursor-pointer"
                  >
                    <span>{selectedSize}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${isSizeOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isSizeOpen && (
                    <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 bg-white border border-border rounded-xl shadow-hover overflow-hidden">
                      {SIZES.map((size) => (
                        <button
                          key={size}
                          onClick={() => {
                            setSelectedSize(size);
                            setIsSizeOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-[14px] transition-colors flex items-center justify-between cursor-pointer ${selectedSize === size ? "bg-blue-soft text-blue font-bold" : "text-text-primary hover:bg-bg-main"}`}
                        >
                          {size}
                          {selectedSize === size && <Check size={14} />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Qty + Wishlist + Add to Cart */}
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center border border-border rounded-xl overflow-hidden bg-white shrink-0">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-10 flex items-center justify-center cursor-pointer text-text-secondary hover:bg-blue-soft hover:text-blue transition-colors"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-9 text-center font-bold text-[14px] text-text-primary border-x border-border">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-10 flex items-center justify-center cursor-pointer text-text-secondary hover:bg-blue-soft hover:text-blue transition-colors"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                <button
                  onClick={handleWishlist}
                  className={`relative w-10 h-10 rounded-xl border flex items-center justify-center cursor-pointer transition-all duration-200 shrink-0 ${wishlisted ? "border-red-300 bg-red-50" : "border-border bg-white hover:border-red-300 hover:bg-red-50"}`}
                >
                  <WishlistSparkles active={sparkle} />
                  <Heart
                    size={16}
                    fill={wishlisted ? "#ef4444" : "transparent"}
                    color={wishlisted ? "#ef4444" : "#6B7280"}
                  />
                </button>

                <div className="flex-1">
                  <AddToCartButton
                    product={{
                      ...PRODUCT,
                      images: ALL_IMAGES,
                      selectedColor: PRODUCT.colors[selectedColor].name,
                      qty: quantity,
                    }}
                  />
                </div>
              </div>

              {quantity > 1 && (
                <p className="text-[12px] text-text-secondary -mt-0.5">
                  Total:{" "}
                  <span className="font-bold text-blue-dark">
                    ₹{(PRODUCT.price * quantity).toLocaleString()}
                  </span>
                </p>
              )}

              {/* Buy Now + Share */}
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1">
                  <BuyNowButton
                    mode="direct"
                    label="Buy Now"
                    product={{
                      id: PRODUCT.id,
                      name: PRODUCT.name,
                      category: PRODUCT.category,
                      price: PRODUCT.price,
                      originalPrice: PRODUCT.originalPrice,
                      images: ALL_IMAGES,
                      badge: PRODUCT.badge || null,
                      rating: PRODUCT.rating || null,
                      reviews: PRODUCT.reviews || null,
                      selectedColor: PRODUCT.colors[selectedColor].name,
                      qty: quantity,
                    }}
                  />
                </div>
                <button
                  onClick={handleShare}
                  className="h-11 px-4 rounded-xl border border-border bg-white flex items-center gap-2 text-[13px] font-semibold text-text-secondary hover:border-blue hover:text-blue hover:bg-blue-soft transition-all duration-200 shrink-0 cursor-pointer"
                >
                  <Share2 size={15} />
                  Share
                </button>
              </div>

              {/* WhatsApp note */}
              <div className="flex items-start gap-2 px-3 py-2 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0]">
                <span className="text-[#16a34a] text-[13px] shrink-0 mt-0.5">
                  ✓
                </span>
                <p className="text-[11px] text-[#15803d] leading-relaxed">
                  Clicking <span className="font-bold">"Buy Now"</span> opens
                  WhatsApp with{" "}
                  <span className="font-bold">{selectedSize}</span> size details
                  pre-filled. Just hit <span className="font-bold">Send</span>!
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl border border-border shadow-soft mb-12 overflow-hidden">
            <div className="flex border-b border-border">
              {["description", "review"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-[13px] font-semibold uppercase tracking-wider transition-all duration-200 relative cursor-pointer ${activeTab === tab ? "text-blue-dark" : "text-text-secondary hover:text-text-primary"}`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
                  )}
                </button>
              ))}
            </div>
            <div className="p-6">
              {activeTab === "description" ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Description */}
                  <div>
                    <h3 className="font-bold text-[15px] text-text-primary mb-3">
                      Description
                    </h3>
                    <p className="text-[13px] text-text-secondary leading-relaxed mb-3">
                      {PRODUCT.description}
                    </p>
                    <p className="text-[13px] text-text-secondary leading-relaxed">
                      {PRODUCT.description2}
                    </p>
                  </div>
                  {/* Features + Specs */}
                  <div>
                    <h3 className="font-bold text-[15px] text-text-primary mb-3">
                      Feature
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {PRODUCT.features.map((f, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[13px] text-text-secondary"
                        >
                          <Check
                            size={13}
                            className="mt-0.5 shrink-0 text-gold"
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <h3 className="font-bold text-[15px] text-text-primary mt-5 mb-3">
                      Specification
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {PRODUCT.specifications.map((s, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[13px] text-text-secondary"
                        >
                          <Check
                            size={13}
                            className="mt-0.5 shrink-0 text-blue"
                          />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Shipping */}
                  <div>
                    <h3 className="font-bold text-[15px] text-text-primary mb-3">
                      Shipping Information
                    </h3>
                    <div className="flex flex-col gap-3">
                      {[
                        {
                          icon: Truck,
                          label: "Standard Delivery",
                          value: "5–7 business days, Free",
                        },
                        {
                          icon: Package,
                          label: "Express Delivery",
                          value: "2–3 business days, ₹99",
                        },
                        {
                          icon: RefreshCw,
                          label: "Easy Returns",
                          value: "7-day hassle-free return",
                        },
                        {
                          icon: ShieldCheck,
                          label: "Warranty",
                          value: "1 Year manufacturing warranty",
                        },
                        {
                          icon: Headphones,
                          label: "Customer Support",
                          value: "24/7 WhatsApp support",
                        },
                      ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-soft flex items-center justify-center shrink-0">
                            <Icon size={15} className="text-blue" />
                          </div>
                          <div>
                            <p className="text-[12px] font-semibold text-text-primary">
                              {label}
                            </p>
                            <p className="text-[12px] text-text-secondary">
                              {value}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 text-text-secondary">
                  <Star size={32} className="mx-auto mb-3 opacity-30" />
                  <p className="font-semibold text-[15px]">No reviews yet</p>
                  <p className="text-[13px] mt-1">
                    Be the first to review this product.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Similar Products */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="pdp-heading text-xl font-bold text-blue-dark">
                Similar Product
              </h2>
              <Link
                href="/products"
                className="flex items-center gap-1.5 text-[13px] font-semibold text-text-primary border border-border px-4 py-2 rounded-full hover:border-blue hover:text-blue transition-all duration-200"
              >
                VIEW MORE <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {SIMILAR.map((p) => {
                const bs = BADGE_STYLES[p.badge] || {
                  bg: "#475792",
                  color: "#fff",
                };
                return (
                  <Link
                    key={p.id}
                    href={`/products/${p.id}`}
                    className="bg-white rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-hover transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="relative aspect-square overflow-hidden bg-bg-main">
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
                      <p className="text-[10px] font-bold uppercase tracking-wider text-blue mb-1">
                        {p.category}
                      </p>
                      <h3 className="text-[13px] font-semibold text-text-primary leading-snug mb-2 line-clamp-2">
                        {p.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] font-bold text-blue-dark">
                          ₹{p.price.toLocaleString()}
                        </span>
                        <span className="text-[11px] text-text-secondary line-through">
                          ₹{p.originalPrice.toLocaleString()}
                        </span>
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
