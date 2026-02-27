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

const PRODUCT = PRODUCT_DETAIL;
const SIZES = PRODUCT.sizes || ["16 x 18", "18 x 20", "24 x 27"];
const SIMILAR = PRODUCTS.slice(1, 5);
const WHATSAPP_NUMBER = "919978750622";

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

// --- HELPER COMPONENTS (Defined outside is fine) ---

function WishlistSparkles({ active }) {
  if (!active) return null;
  const sparks = Array.from({ length: 8 });
  return (
    <span className="pointer-events-none absolute inset-0">
      {sparks.map((_, i) => {
        const angle = (i / sparks.length) * 360;
        const rad = (angle * Math.PI) / 180;
        const tx = Math.cos(rad) * 22;
        const ty = Math.sin(rad) * 22;
        const colors = ["#ef4444", "#f97316", "#fbbf24", "#ec4899", "#fff"];
        const color = colors[i % colors.length];
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
              background: color,
              transform: "translate(-50%,-50%)",
              animation: `spark-${i} 0.55s ease-out forwards`,
            }}
          >
            <style>{`
              @keyframes spark-${i} {
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

function StarRow({ rating, reviews }) {
  const full = Math.floor(rating);
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            size={14}
            fill={s <= full ? "var(--color-gold)" : "none"}
            color={s <= full ? "var(--color-gold)" : "#D1D5DB"}
          />
        ))}
      </div>
      <span className="text-[13px] font-semibold text-[var(--color-text-primary)]">
        {rating} Star Rating
      </span>
      <span className="text-[13px] text-[var(--color-text-secondary)]">
        ({reviews} User feedback)
      </span>
    </div>
  );
}

// --- MAIN COMPONENT ---

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

  // 1. Initial Load: Check if product is in wishlist
  useEffect(() => {
    const savedWishlist = JSON.parse(
      localStorage.getItem("glowison_wishlist") || "[]",
    );
    const isPresent = savedWishlist.some((item) => item.id === PRODUCT.id);
    setWishlisted(isPresent);
  }, [PRODUCT.id]);

  // 2. Handle Wishlist Action
  const handleWishlist = () => {
    const savedWishlist = JSON.parse(
      localStorage.getItem("glowison_wishlist") || "[]",
    );

    if (!wishlisted) {
      setSparkle(true);
      setTimeout(() => setSparkle(false), 600);

      const newItem = {
        id: PRODUCT.id,
        name: PRODUCT.name,
        price: PRODUCT.price,
        originalPrice: PRODUCT.originalPrice,
        image: ALL_IMAGES[0],
        category: PRODUCT.category,
      };

      const updatedList = [...savedWishlist, newItem];
      localStorage.setItem("glowison_wishlist", JSON.stringify(updatedList));
      setWishlisted(true);
    } else {
      const updatedList = savedWishlist.filter(
        (item) => item.id !== PRODUCT.id,
      );
      localStorage.setItem("glowison_wishlist", JSON.stringify(updatedList));
      setWishlisted(false);
    }
    window.dispatchEvent(new Event("wishlistUpdate"));
  };

  // Close size dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sizeRef.current && !sizeRef.current.contains(event.target)) {
        setIsSizeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      alert("Link copied to clipboard!");
    }
  };

  const discount = Math.round(
    ((PRODUCT.originalPrice - PRODUCT.price) / PRODUCT.originalPrice) * 100,
  );

  const handleBuyNow = () => {
    const colorName = PRODUCT.colors[selectedColor].name;
    const total = PRODUCT.price * quantity;
    const productUrl = `${window.location.origin}/products/${PRODUCT.id}`;
    const message = [
      `🛒 *Order Inquiry — Glowison*`,
      ``,
      `*Product:* ${PRODUCT.name}`,
      `*Category:* ${PRODUCT.category}`,
      `*Color:* ${colorName}`,
      `*Size:* ${selectedSize}`,
      `*Price:* ₹${PRODUCT.price.toLocaleString()} (MRP ₹${PRODUCT.originalPrice.toLocaleString()})`,
      `*Quantity:* ${quantity}`,
      `*Total:* ₹${total.toLocaleString()}`,
      ``,
      `🔗 *Product Link:* ${productUrl}`,
      ``,
      `Please confirm availability and share payment details. Thank you! 😊`,
    ].join("\n");
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

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

      <div className="min-h-screen bg-[var(--color-bg-main)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[13px] mb-6 flex-wrap">
            <Link
              href="/"
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-blue)] transition-colors"
            >
              Home
            </Link>
            <ChevronRight
              size={12}
              className="text-[var(--color-text-secondary)]"
            />
            <Link
              href="/products"
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-blue)] transition-colors"
            >
              All Products
            </Link>
            <ChevronRight
              size={12}
              className="text-[var(--color-text-secondary)]"
            />
            <span className="text-[var(--color-text-primary)] font-medium">
              {PRODUCT.name}
            </span>
          </nav>

          {/* Main grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-10">
            {/* LEFT — Images */}
            <div className="flex flex-col gap-3">
              <div
                className="relative rounded-2xl overflow-hidden bg-[var(--color-white)] border border-[var(--color-border)] shadow-[var(--shadow-soft)]"
                style={{ aspectRatio: "4/3" }}
              >
                <img
                  key={activeImage}
                  src={ALL_IMAGES[activeImage]}
                  alt={PRODUCT.name}
                  className="w-full h-full object-cover img-fade"
                />
              </div>

              {/* Thumbnails */}
              <div className="relative flex items-center gap-2">
                <button
                  onClick={goPrev}
                  className={`shrink-0 w-9 h-16 rounded-r-2xl flex items-center justify-center shadow-md transition-all duration-300 hover:cursor-pointer ${
                    activeBtn === "left"
                      ? "bg-[var(--color-blue)] text-white"
                      : "bg-white text-[var(--color-blue-dark)] hover:bg-[var(--color-blue)] hover:text-white"
                  }`}
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="flex gap-2 overflow-x-auto flex-1 scrollbar-hide">
                  {ALL_IMAGES.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`rounded-xl overflow-hidden border-2 transition-all duration-200 shrink-0 w-16 h-16 ${
                        activeImage === i
                          ? "border-[var(--color-blue)] shadow-md scale-105"
                          : "border-[var(--color-border)] hover:border-[var(--color-blue)] opacity-70 hover:opacity-100"
                      }`}
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
                  className={`shrink-0 w-9 h-16 rounded-l-2xl flex items-center justify-center shadow-md transition-all duration-300 hover:cursor-pointer ${
                    activeBtn === "right"
                      ? "bg-[var(--color-blue)] text-white"
                      : "bg-white text-[var(--color-blue-dark)] hover:bg-[var(--color-blue)] hover:text-white"
                  }`}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* RIGHT — Content */}
            <div className="flex flex-col gap-3 pt-5">
              <StarRow rating={PRODUCT.rating} reviews={PRODUCT.reviews} />
              <h1 className="pdp-heading text-3xl lg:text-3xl font-bold text-[var(--color-blue-dark)] leading-snug">
                {PRODUCT.name}
              </h1>

              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[13px] mt-2">
                <div>
                  <span className="text-[var(--color-text-secondary)]">
                    ID:{" "}
                  </span>
                  <span className="font-semibold text-[var(--color-text-primary)]">
                    GLW-{PRODUCT.id.toString().padStart(5, "0")}
                  </span>
                </div>
                <div>
                  <span className="text-[var(--color-text-secondary)]">
                    Availability:{" "}
                  </span>
                  <span className="font-semibold text-green-600">In Stock</span>
                </div>
                <div>
                  <span className="text-[var(--color-text-secondary)]">
                    Brand:{" "}
                  </span>
                  <span className="font-semibold text-[var(--color-blue)]">
                    Glowison
                  </span>
                </div>
                <div>
                  <span className="text-[var(--color-text-secondary)]">
                    Category:{" "}
                  </span>
                  <span className="font-semibold text-[var(--color-text-primary)]">
                    {PRODUCT.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-2">
                <span className="text-3xl font-bold text-[var(--color-blue-dark)]">
                  ₹{PRODUCT.price.toLocaleString()}
                </span>
                <span className="text-[15px] text-[var(--color-text-secondary)] line-through">
                  ₹{PRODUCT.originalPrice.toLocaleString()}
                </span>
                <span className="text-[12px] font-bold bg-[var(--color-gold)] text-[var(--color-blue-dark)] px-2.5 py-1 rounded-lg">
                  {discount}% OFF
                </span>
              </div>

              <div className="h-px mt-1 mb-1 bg-[var(--color-border)]" />

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <p className="text-[12px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
                    Color
                  </p>
                  <div className="border border-[var(--color-border)] rounded-xl px-4 h-12 bg-[var(--color-white)] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-5 h-5 rounded-full border border-[var(--color-border)] shrink-0"
                        style={{
                          background: PRODUCT.colors[selectedColor].hex,
                        }}
                      />
                      <span className="text-[14px] font-medium text-[var(--color-text-primary)]">
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
                          className="hover:cursor-pointer"
                          style={{
                            width: "18px",
                            height: "18px",
                            borderRadius: "50%",
                            background: c.hex,
                            border:
                              selectedColor === i
                                ? "2px solid var(--color-blue)"
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

                <div className="flex-1 relative" ref={sizeRef}>
                  <p className="text-[12px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
                    Size in (inch)
                  </p>
                  <button
                    onClick={() => setIsSizeOpen(!isSizeOpen)}
                    className="w-full h-12 border border-[var(--color-border)] rounded-xl px-4 bg-[var(--color-white)] flex items-center justify-between text-[14px] font-medium text-[var(--color-text-primary)] hover:border-[var(--color-blue)] transition-all hover:cursor-pointer"
                  >
                    <span>{selectedSize}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${isSizeOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isSizeOpen && (
                    <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 bg-white border border-[var(--color-border)] rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      {SIZES.map((size) => (
                        <button
                          key={size}
                          onClick={() => {
                            setSelectedSize(size);
                            setIsSizeOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-[14px] transition-colors flex items-center justify-between hover:cursor-pointer ${
                            selectedSize === size
                              ? "bg-[var(--color-blue-soft)] text-[var(--color-blue)] font-bold"
                              : "text-[var(--color-text-primary)] hover:bg-gray-50"
                          }`}
                        >
                          {size}
                          {selectedSize === size && <Check size={14} />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center border border-[var(--color-border)] rounded-xl overflow-hidden bg-[var(--color-white)] shrink-0">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-10 flex items-center justify-center hover:cursor-pointer text-[var(--color-text-secondary)] hover:bg-[var(--color-blue-soft)]"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-9 text-center font-bold text-[14px] text-[var(--color-text-primary)] border-x border-[var(--color-border)]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-10 flex items-center justify-center hover:cursor-pointer text-[var(--color-text-secondary)] hover:bg-[var(--color-blue-soft)]"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                <button
                  onClick={handleWishlist}
                  className={`relative w-10 h-10 rounded-xl border flex items-center justify-center hover:cursor-pointer transition-all duration-200 shrink-0 ${
                    wishlisted
                      ? "border-red-300 bg-red-50"
                      : "border-[var(--color-border)] bg-[var(--color-white)]"
                  }`}
                >
                  <WishlistSparkles active={sparkle} />
                  <Heart
                    size={16}
                    fill={wishlisted ? "#ef4444" : "transparent"}
                    color={
                      wishlisted ? "#ef4444" : "var(--color-text-secondary)"
                    }
                  />
                </button>

                <div className="flex-1">
                  <AddToCartButton onClick={() => {}} />
                </div>
              </div>

              {quantity > 1 && (
                <p className="text-[12px] text-[var(--color-text-secondary)]">
                  Total:{" "}
                  <span className="font-bold text-[var(--color-blue-dark)]">
                    ₹{(PRODUCT.price * quantity).toLocaleString()}
                  </span>
                </p>
              )}

              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={handleBuyNow}
                  className="flex-1 h-11 rounded-xl hover:cursor-pointer font-bold text-[13px] flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#1ebe5a] transition-all"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.559 4.126 1.533 5.856L.054 23.447a.75.75 0 00.916.943l5.724-1.498A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.925 0-3.733-.52-5.284-1.428l-.379-.223-3.397.889.906-3.309-.247-.394A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                  Buy Now
                </button>
                <button
                  onClick={handleShare}
                  className="h-11 px-4 rounded-xl border hover:cursor-pointer border-[var(--color-border)] bg-[var(--color-white)] flex items-center gap-2 text-[13px] font-semibold text-[var(--color-text-secondary)] hover:border-[var(--color-blue)] transition-all shrink-0"
                >
                  <Share2 size={15} />
                  Share
                </button>
              </div>

              <div className="flex items-start gap-2 px-3 py-2 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] mt-1">
                <span className="text-[#16a34a] text-[13px] shrink-0 mt-0.5">
                  ✓
                </span>
                <p className="text-[11px] text-[#15803d] leading-relaxed">
                  Clicking <span className="font-bold">"Buy Now"</span> opens
                  WhatsApp with{" "}
                  <span className="font-bold">{selectedSize}</span> size details
                  pre-filled.
                </p>
              </div>
            </div>
          </div>

          {/* ── Description + Policies tabs section ── */}

          <div className="bg-[var(--color-white)] rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-soft)] mb-12 overflow-hidden">
            {/* Tab headers */}

            <div className="flex border-b border-[var(--color-border)]">
              {["description", "review"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-[13px] font-semibold uppercase tracking-wider transition-all duration-200 relative ${
                    activeTab === tab
                      ? "text-[var(--color-blue-dark)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  {tab}

                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-gold)]" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab content */}

            <div className="p-6">
              {activeTab === "description" ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Description */}

                  <div className="md:col-span-1">
                    <h3 className="font-bold text-[15px] text-[var(--color-text-primary)] mb-3">
                      Description
                    </h3>

                    <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed mb-3">
                      {PRODUCT.description}
                    </p>

                    <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
                      {PRODUCT.description2}
                    </p>
                  </div>

                  {/* Features */}

                  <div className="md:col-span-1">
                    <h3 className="font-bold text-[15px] text-[var(--color-text-primary)] mb-3">
                      Feature
                    </h3>

                    <ul className="flex flex-col gap-2">
                      {PRODUCT.features.map((f, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]"
                        >
                          <Check
                            size={13}
                            className="mt-0.5 shrink-0 text-[var(--color-gold)]"
                          />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <h3 className="font-bold text-[15px] text-[var(--color-text-primary)] mt-5 mb-3">
                      Specification
                    </h3>

                    <ul className="flex flex-col gap-2">
                      {PRODUCT.specifications.map((s, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]"
                        >
                          <Check
                            size={13}
                            className="mt-0.5 shrink-0 text-[var(--color-blue)]"
                          />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Shipping / Policies */}

                  <div className="md:col-span-1">
                    <h3 className="font-bold text-[15px] text-[var(--color-text-primary)] mb-3">
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
                          <div className="w-8 h-8 rounded-lg bg-[var(--color-blue-soft)] flex items-center justify-center shrink-0">
                            <Icon
                              size={15}
                              className="text-[var(--color-blue)]"
                            />
                          </div>

                          <div>
                            <p className="text-[12px] font-semibold text-[var(--color-text-primary)]">
                              {label}
                            </p>

                            <p className="text-[12px] text-[var(--color-text-secondary)]">
                              {value}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 text-[var(--color-text-secondary)]">
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
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-blue)] mb-1">
                        {p.category}
                      </p>

                      <h3 className="text-[13px] font-semibold text-[var(--color-text-primary)] leading-snug mb-2 line-clamp-2">
                        {p.name}
                      </h3>

                      <div className="flex items-center gap-2">
                        <span className="text-[15px] font-bold text-[var(--color-blue-dark)]">
                          ₹{p.price.toLocaleString()}
                        </span>

                        <span className="text-[11px] text-[var(--color-text-secondary)] line-through">
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
