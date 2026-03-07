"use client";

import { useEffect, useState } from "react";
import { X, Tag, Minus, Plus, Star, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "919978750622";
const COUPONS = { SAVE10: 10, GLOWISON20: 20, FIRST15: 15 };

// ── WhatsApp SVG ──────────────────────────────────────────────────────────────
function WhatsAppIcon({ size = 18, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ── Star Rating ───────────────────────────────────────────────────────────────
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={11}
          fill={s <= Math.round(rating) ? "#475792" : "transparent"}
          color={s <= Math.round(rating) ? "#475792" : "#D1D5DB"}
        />
      ))}
    </div>
  );
}

// ── CART MODE — Simple confirm-only dialog ────────────────────────────────────
// No summary, no coupon — just "are you sure?" then open WhatsApp
function ConfirmSheet({ open, onClose, onConfirm, itemCount, total }) {
  if (!open) return null;
  return (
    <>
      <div
        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="fixed bottom-0 left-0 right-0 z-[9999] bg-white rounded-t-2xl shadow-xl"
        style={{ maxWidth: 480, margin: "0 auto" }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        <div className="px-6 pb-10 pt-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#dcfce7] flex items-center justify-center">
                <WhatsAppIcon size={18} color="#16a34a" />
              </div>
              <h2 className="text-[16px] font-bold text-blue-dark">
                Send Order on WhatsApp
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-bg-main flex items-center justify-center hover:bg-border transition-colors cursor-pointer"
            >
              <X size={15} className="text-text-secondary" />
            </button>
          </div>

          {/* Info pill */}
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-bg-main border border-border mb-6">
            <MessageCircle size={18} className="text-blue shrink-0" />
            <div>
              <p className="text-[13px] font-semibold text-text-primary">
                {itemCount} item{itemCount !== 1 ? "s" : ""} · ₹
                {total.toLocaleString()} total
              </p>
              <p className="text-[11px] text-text-secondary mt-0.5">
                Full order details will be sent to our team
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-2.5 mb-6">
            {[
              {
                n: "1",
                text: "WhatsApp opens with your full order pre-filled",
              },
              { n: "2", text: "Review the message and tap Send" },
              { n: "3", text: "Our team confirms and arranges delivery" },
            ].map(({ n, text }) => (
              <div key={n} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-dark text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                  {n}
                </span>
                <span className="text-[13px] text-text-secondary">{text}</span>
              </div>
            ))}
          </div>

          {/* Confirm button */}
          <button
            onClick={onConfirm}
            className="w-full h-12 rounded-xl font-bold text-[14px] flex items-center justify-center gap-2.5 bg-[#16a34a] text-white hover:bg-[#15803d] transition-colors duration-200 cursor-pointer"
          >
            <WhatsAppIcon size={18} color="#fff" />
            Open WhatsApp & Send Order
          </button>

          <button
            onClick={onClose}
            className="w-full mt-2.5 h-10 rounded-xl text-[13px] font-semibold text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <p className="text-[11px] text-text-secondary text-center mt-2 leading-relaxed">
            By placing an order you agree to our{" "}
            <a
              href="/shipping-policy"
              className="text-blue underline underline-offset-2 hover:text-blue-dark transition-colors"
            >
              Shipping Policy
            </a>
            {" & "}
            <a
              href="/terms-of-use"
              className="text-blue underline underline-offset-2 hover:text-blue-dark transition-colors"
            >
              Terms of Use
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

// ── PRODUCT PAGE MODE — Order sheet with summary + coupon ─────────────────────
function ProductOrderSheet({ open, onClose, product, price, mrp }) {
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [quantity, setQuantity] = useState(product?.qty || 1);
  const [sending, setSending] = useState(false);

  if (!open || !product) return null;

  const subtotal = price * quantity;
  const discountAmt = appliedCoupon
    ? Math.round((subtotal * appliedCoupon.pct) / 100)
    : 0;
  const delivery = subtotal > 999 ? 0 : 99;
  const total = subtotal - discountAmt + delivery;
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (COUPONS[code]) {
      setAppliedCoupon({ code, pct: COUPONS[code] });
      setCouponError("");
    } else {
      setAppliedCoupon(null);
      setCouponError("Invalid coupon code");
    }
  };

  const handleConfirm = () => {
    const message = [
      `🛒 *ORDER REQUEST — GLOWISON*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      ``,
      `📦 Product Details`,
      `  Name       : ${product.name}`,
      `  Category   : ${(product.category || "").replace(/-/g, " ")}`,
      product.selectedColor ? `  Color      : ${product.selectedColor}` : null,
      product.rating
        ? `  Rating     : ${product.rating}★ (${product.reviews || 0} reviews)`
        : null,
      `  Product ID : GLW-${String(product.id).padStart(5, "0")}`,
      product.category && product.slug
        ? `  Link       : ${origin}/${product.category}/${product.slug}`
        : null,
      ``,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `💰 *Pricing*`,
      `  Unit Price : ₹${price.toLocaleString()}`,
      `  MRP        : ₹${mrp.toLocaleString()}`,
      `  Quantity   : ${quantity}`,
      `  Subtotal   : ₹${subtotal.toLocaleString()}`,
      appliedCoupon
        ? `  Coupon     : ${appliedCoupon.code} (−${appliedCoupon.pct}% = −₹${discountAmt.toLocaleString()})`
        : null,
      `  Delivery   : ${delivery === 0 ? "Free 🎉" : `₹${delivery}`}`,
      `  *Total     : ₹${total.toLocaleString()}*`,
      ``,
      `Please confirm availability and share payment details. Thank you! 🙏`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    ]
      .filter(Boolean)
      .join("\n");

    setSending(true);
    setTimeout(() => {
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
        "_blank",
      );
      setSending(false);
      onClose();
    }, 380);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[99998] bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="fixed bottom-0 left-0 right-0 z-[99999] bg-white rounded-t-2xl shadow-xl"
        style={{ maxWidth: 480, margin: "0 auto" }}
      >
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        <div className="px-5 pb-10 pt-2">
          <div className="flex items-center justify-between mb-5">
            <h2
              className="text-[16px] font-bold text-blue-dark"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Order Summary
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-bg-main flex items-center justify-center hover:bg-border transition-colors cursor-pointer"
            >
              <X size={15} className="text-text-secondary" />
            </button>
          </div>

          {/* Product card */}
          <div className="group bg-white hover:bg-bg-main border border-border rounded-2xl shadow-soft p-4 mb-5 transition-all duration-300">
            <div className="flex items-start gap-3">
              {product.images?.[0] && (
                <div className="w-[100px] h-[100px] rounded-xl overflow-hidden bg-bg-main relative shadow-sm shrink-0">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-blue uppercase tracking-[0.7px] mb-0.5 capitalize">
                  {(product.category || "").replace(/-/g, " ")}
                </p>
                <h3
                  className="font-semibold text-text-primary leading-snug mb-1.5 line-clamp-2"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(14px,1.6vw,17px)",
                  }}
                >
                  {product.name}
                </h3>
                {product.rating && (
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <StarRating rating={product.rating} />
                    <span className="text-[11px] text-text-secondary">
                      {product.rating} ({product.reviews || 0})
                    </span>
                  </div>
                )}
                {product.selectedColor && (
                  <p className="text-[11px] text-text-secondary mb-1.5">
                    Color:{" "}
                    <span className="font-semibold text-text-primary">
                      {product.selectedColor}
                    </span>
                  </p>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-[17px] font-bold text-blue-dark">
                    ₹{price.toLocaleString()}
                  </span>
                  {mrp > price && (
                    <span className="text-[13px] text-text-secondary line-through">
                      ₹{mrp.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
            {/* Qty */}
            <div className="flex justify-end mt-3">
              <div className="flex items-center border border-border rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center cursor-pointer text-text-secondary hover:bg-blue-soft hover:text-blue transition-colors"
                >
                  <Minus size={13} />
                </button>
                <span className="w-10 text-center font-bold text-[14px] text-text-primary border-x border-border">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-9 h-9 flex items-center justify-center cursor-pointer text-text-secondary hover:bg-blue-soft hover:text-blue transition-colors"
                >
                  <Plus size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* Coupon */}
          <div className="flex items-center gap-2 mb-1">
            <div className="flex-1 flex items-center gap-2 border border-border rounded-xl px-3 py-2.5 bg-bg-main">
              <Tag size={14} className="text-text-secondary shrink-0" />
              <input
                type="text"
                placeholder="Coupon Code"
                value={coupon}
                onChange={(e) => {
                  setCoupon(e.target.value);
                  setCouponError("");
                }}
                className="flex-1 bg-transparent border-none outline-none text-[13px] text-text-primary placeholder:text-text-secondary"
              />
            </div>
            <button
              onClick={applyCoupon}
              className="px-4 py-2.5 rounded-xl bg-blue-dark text-white text-[13px] font-bold hover:bg-blue transition-colors duration-200 shrink-0 cursor-pointer"
            >
              Apply
            </button>
          </div>
          {couponError && (
            <p className="text-[11px] text-red-500 mb-3 px-1">{couponError}</p>
          )}
          {appliedCoupon && (
            <p className="text-[11px] text-green-600 font-semibold mb-3 px-1">
              ✓ {appliedCoupon.code} applied — {appliedCoupon.pct}% off!
            </p>
          )}

          <div className="h-px bg-border my-4" />

          {/* Price breakdown */}
          <div className="flex flex-col gap-3 mb-4">
            <div className="flex items-center justify-between text-[14px]">
              <span className="text-text-secondary">
                Subtotal (×{quantity})
              </span>
              <span className="font-semibold text-text-primary">
                ₹{subtotal.toLocaleString()}
              </span>
            </div>
            {discountAmt > 0 && (
              <div className="flex items-center justify-between text-[14px]">
                <span className="text-text-secondary">
                  Discount ({appliedCoupon.pct}%)
                </span>
                <span className="font-semibold text-red-500">
                  -₹{discountAmt.toLocaleString()}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between text-[14px]">
              <span className="text-text-secondary">Delivery Fee</span>
              <span
                className={`font-semibold ${delivery === 0 ? "text-green-600" : "text-text-primary"}`}
              >
                {delivery === 0 ? "Free" : `₹${delivery}`}
              </span>
            </div>
            {delivery > 0 && (
              <p className="text-[11px] text-text-secondary -mt-1">
                Free delivery on orders above ₹999
              </p>
            )}
          </div>

          <div className="flex items-center justify-between py-3 border-t border-border mb-4">
            <span className="text-[15px] font-bold text-text-primary">
              Total
            </span>
            <span className="text-[20px] font-bold text-blue-dark">
              ₹{total.toLocaleString()}
            </span>
          </div>

          <button
            onClick={handleConfirm}
            disabled={sending}
            className={`w-full h-12 rounded-xl font-bold text-[14px] flex items-center justify-center gap-2 bg-blue-dark text-white hover:bg-blue transition-colors duration-200 disabled:opacity-50 cursor-pointer ${sending ? "animate-pulse" : ""}`}
          >
            <WhatsAppIcon size={18} color="#22c55e" />
            Buy Now via WhatsApp
          </button>
          <p className="text-[11px] text-text-secondary text-center mt-2 leading-relaxed">
            By placing an order you agree to our{" "}
            <a
              href="/shipping-policy"
              className="text-blue underline underline-offset-2 hover:text-blue-dark transition-colors"
            >
              Shipping Policy
            </a>
            {" & "}
            <a
              href="/terms-of-use"
              className="text-blue underline underline-offset-2 hover:text-blue-dark transition-colors"
            >
              Terms of Use
            </a>
          </p>

          <div className="flex items-start gap-2 mt-3 px-3 py-2 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0]">
            <span className="text-[#16a34a] text-[12px] shrink-0 mt-0.5">
              ✓
            </span>
            <p className="text-[11px] text-[#15803d] leading-relaxed">
              Opens WhatsApp with your full order pre-filled. Just hit{" "}
              <span className="font-bold">Send</span>!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Main BuyNowButton ─────────────────────────────────────────────────────────
export default function BuyNowButton({
  message = "",
  label = "Buy Now",
  disabled = false,
  fullWidth = true,
  className = "",
  mode = "direct", // "direct" = product page  |  "cart" = cart page
  product = null,
  price = 0,
  mrp = 0,
  // For cart mode — pass item count + total for the confirm dialog
  itemCount = 0,
  total = 0,
}) {
  const [sheetOpen, setSheetOpen] = useState(false);

  // ── LOCK BODY SCROLL WHEN SHEET IS OPEN ─────────────────────────────
  useEffect(() => {
    if (sheetOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [sheetOpen]);

  const handleCartConfirm = () => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
    setSheetOpen(false);
  };

  return (
    <>
      <button
        onClick={() => {
          if (!disabled) setSheetOpen(true);
        }}
        disabled={disabled}
        className={`
          ${fullWidth ? "w-full" : ""}
          h-12 rounded-xl font-bold text-[14px]
          flex items-center justify-center gap-2
          bg-[var(--color-blue-dark)] text-white
          hover:bg-[var(--color-blue)]
          active:scale-[0.97]
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-200 cursor-pointer
          ${className}
        `}
      >
        <WhatsAppIcon size={18} color="#22c55e" />
        {label}
      </button>

      {/* Cart page — simple confirm-only dialog */}
      {mode === "cart" && (
        <ConfirmSheet
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          onConfirm={handleCartConfirm}
          itemCount={itemCount}
          total={total}
        />
      )}

      {/* Product page — full summary + coupon sheet */}
      {mode === "direct" && (
        <ProductOrderSheet
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          product={product}
          price={price}
          mrp={mrp}
        />
      )}
    </>
  );
}
