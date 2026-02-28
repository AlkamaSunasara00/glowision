"use client";

import { useState, useEffect } from "react";
import { Trash, ChevronRight, Star, Plus, Minus, Tag, ShoppingCart } from "lucide-react";
import Link from "next/link";
import BuyNowButton from "@/app/ui/buttons/BuyNowButton";

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={11}
          fill={s <= Math.round(rating) ? "#475792" : "transparent"}
          color={s <= Math.round(rating) ? "#475792" : "#D1D5DB"}
        />
      ))}
    </div>
  );
}

const BADGE_STYLES = {
  "Best Seller": { bg: "#1a2e6e", color: "#fff" },
  New:           { bg: "#16a34a", color: "#fff" },
  Sale:          { bg: "#dc2626", color: "#fff" },
  Premium:       { bg: "#92400e", color: "#fff" },
  Limited:       { bg: "#7c3aed", color: "#fff" },
  Popular:       { bg: "#0369a1", color: "#fff" },
};

function CartItem({ item, onRemove, onQtyChange, selected, onSelect }) {
  const [removing, setRemoving] = useState(false);

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onRemove(item.id), 380);
  };

  const discount = item.originalPrice > item.price
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

  const badgeStyle = BADGE_STYLES[item.badge] || { bg: "#475792", color: "#fff" };

  return (
    <div
      className="group bg-white hover:bg-bg-main border border-border rounded-2xl shadow-soft hover:shadow-hover transition-all duration-300 p-4"
      style={{
        opacity: removing ? 0 : 1,
        transform: removing ? "scale(0.96) translateX(-16px)" : "scale(1) translateX(0)",
        transition: removing
          ? "opacity 0.38s ease, transform 0.38s ease"
          : "all 0.3s cubic-bezier(0.34, 1.2, 0.64, 1)",
      }}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button onClick={() => onSelect(item.id)}
          className="w-5 h-5 mt-1 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer"
          style={{ borderColor: selected ? "#475792" : "#E5E7EB", background: selected ? "#475792" : "#fff" }}
        >
          {selected && (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        {/* Image */}
        <Link href={`/products/${item.id}`} className="shrink-0 block">
          <div className="w-[100px] h-[100px] md:w-[110px] md:h-[110px] rounded-xl overflow-hidden bg-bg-main relative shadow-sm">
            <img src={item.images?.[0] || item.image} alt={item.name}
              className="w-full h-full object-cover absolute inset-0 opacity-100 group-hover:opacity-0 scale-100 group-hover:scale-105 transition-all duration-500"
            />
            {item.images?.[1] && (
              <img src={item.images[1]} alt={item.name + " alt"}
                className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-100 transition-all duration-500"
              />
            )}
            {item.badge && (
              <div className="absolute top-1.5 left-1.5 z-10 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full"
                style={{ background: badgeStyle.bg, color: badgeStyle.color }}
              >
                {item.badge}
              </div>
            )}
          </div>
        </Link>

        {/* Info + delete */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-blue uppercase tracking-[0.7px] mb-0.5 leading-tight">{item.category}</p>
              <Link href={`/products/${item.id}`}>
                <h3
                  className="font-semibold text-text-primary group-hover:text-blue leading-snug mb-1.5 transition-colors duration-200 line-clamp-2"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(14px,1.6vw,17px)" }}
                >
                  {item.name}
                </h3>
              </Link>
            </div>
            <button onClick={handleRemove}
              className="w-8 h-8 rounded-full bg-red-50 border border-red-200 flex items-center justify-center cursor-pointer hover:bg-red-500 hover:border-red-500 group/del transition-all duration-200 shrink-0"
            >
              <Trash size={14} className="text-red-400 group-hover/del:text-white transition-colors duration-200" />
            </button>
          </div>

          {item.rating && (
            <div className="flex items-center gap-1.5 mb-1.5">
              <StarRating rating={item.rating} />
              <span className="text-[11px] text-text-secondary">{item.rating} ({item.reviews || 0})</span>
            </div>
          )}
          {item.selectedColor && (
            <p className="text-[11px] text-text-secondary mb-1.5">
              Color: <span className="font-semibold text-text-primary">{item.selectedColor}</span>
            </p>
          )}

          <div className="flex items-center gap-2 flex-wrap mb-0 md:mb-0">
            <span className="text-[17px] font-bold text-blue-dark">₹{item.price.toLocaleString()}</span>
            {item.originalPrice > item.price && (
              <span className="text-[13px] text-text-secondary line-through">₹{item.originalPrice.toLocaleString()}</span>
            )}
          </div>
          {discount > 0 && (
            <span className="inline-block mt-1 text-[11px] font-bold text-red-500 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
              -{discount}%
            </span>
          )}
        </div>
      </div>

      {/* Qty counter */}
      <div className="flex justify-end mt-3">
        <div className="flex items-center border border-border rounded-xl overflow-hidden bg-white">
          <button onClick={() => onQtyChange(item.id, Math.max(1, item.qty - 1))}
            className="w-9 h-9 flex items-center justify-center cursor-pointer text-text-secondary hover:bg-blue-soft hover:text-blue transition-colors"
          >
            <Minus size={13} />
          </button>
          <span className="w-10 text-center font-bold text-[14px] text-text-primary border-x border-border">{item.qty}</span>
          <button onClick={() => onQtyChange(item.id, item.qty + 1)}
            className="w-9 h-9 flex items-center justify-center cursor-pointer text-text-secondary hover:bg-blue-soft hover:text-blue transition-colors"
          >
            <Plus size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function CartPage() {
  const [cart, setCart]                   = useState([]);
  const [selected, setSelected]           = useState([]);
  const [loading, setLoading]             = useState(true);
  const [coupon, setCoupon]               = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError]     = useState("");

  const COUPONS = { SAVE10: 10, GLOWISON20: 20, FIRST15: 15 };

  useEffect(() => {
    const saved   = JSON.parse(localStorage.getItem("glowison_cart") || "[]");
    const withQty = saved.map((i) => ({ ...i, qty: i.qty || 1 }));
    setCart(withQty);
    setSelected(withQty.map((i) => i.id));
    setLoading(false);
  }, []);

  // 🆕 Single saveCart that ALWAYS fires cartUpdate — covers remove, qty, bulk delete
  const saveCart = (updated) => {
    setCart(updated);
    localStorage.setItem("glowison_cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdate")); // 🆕 badge syncs instantly
  };

  const removeItem = (id) => {
    saveCart(cart.filter((i) => i.id !== id));
    setSelected((s) => s.filter((sid) => sid !== id));
  };

  const updateQty = (id, qty) => saveCart(cart.map((i) => (i.id === id ? { ...i, qty } : i)));

  const toggleSelect    = (id) => setSelected((s) => s.includes(id) ? s.filter((sid) => sid !== id) : [...s, id]);
  const toggleSelectAll = ()   => setSelected(selected.length === cart.length ? [] : cart.map((i) => i.id));

  // 🆕 Smooth animated bulk delete
  const deleteSelected = () => {
    if (!selected.length) return;
    if (!confirm(`Remove ${selected.length} item(s) from cart?`)) return;
    const remaining = cart.filter((i) => !selected.includes(i.id));
    saveCart(remaining); // fires cartUpdate automatically
    setSelected([]);
  };

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

  const selectedItems = cart.filter((i) => selected.includes(i.id));
  const subtotal      = selectedItems.reduce((acc, i) => acc + i.price * i.qty, 0);
  const discountAmt   = appliedCoupon ? Math.round(subtotal * appliedCoupon.pct / 100) : 0;
  const delivery      = subtotal > 999 ? 0 : 99;
  const total         = subtotal - discountAmt + delivery;

  const cartMessage = selectedItems.length
    ? [
        `🛒 *Order Inquiry — Glowison*`, ``,
        `*Items:*`,
        ...selectedItems.map((i) => `• ${i.name} (x${i.qty}) — ₹${(i.price * i.qty).toLocaleString()}`),
        ``,
        appliedCoupon ? `*Coupon:* ${appliedCoupon.code} (-${appliedCoupon.pct}%)` : null,
        `*Subtotal:* ₹${subtotal.toLocaleString()}`,
        discountAmt ? `*Discount:* -₹${discountAmt.toLocaleString()}` : null,
        `*Delivery:* ${delivery === 0 ? "Free" : `₹${delivery}`}`,
        `*Total:* ₹${total.toLocaleString()}`, ``,
        `Please confirm availability and share payment details. Thank you! 🙏`,
      ].filter(Boolean).join("\n")
    : "";

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-bg-main">
      <p className="text-blue-dark font-semibold">Loading...</p>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .cart-item-row { animation: cartFadeUp 0.4s ease both; }
        .cart-item-row:nth-child(1) { animation-delay: 0.05s; }
        .cart-item-row:nth-child(2) { animation-delay: 0.10s; }
        .cart-item-row:nth-child(3) { animation-delay: 0.15s; }
        .cart-item-row:nth-child(4) { animation-delay: 0.20s; }
        .cart-item-row:nth-child(5) { animation-delay: 0.25s; }
        @keyframes cartFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section className="bg-bg-main min-h-screen pt-6 pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[16px] mb-3 flex-wrap pb-6 border-b border-border ">
            <Link href="/" className="text-text-secondary hover:text-blue transition-colors">Home</Link>
            <ChevronRight size={12} className="text-text-secondary" />
            <span className="text-text-primary font-medium">Cart</span>
          </nav>

          <h1 className="font-bold text-blue-dark mb-8" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3vw, 36px)" }}>
            Your Shopping <span className="text-gold">Cart</span>
          </h1>

          {cart.length === 0 ? (
            <div className="bg-white rounded-3xl border border-border shadow-soft px-6 py-20 text-center max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-gold-soft flex items-center justify-center mx-auto mb-5">
                <ShoppingCart size={26} className="text-gold" />
              </div>
              <h2 className="text-[22px] font-semibold text-blue-dark mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Your Cart is Empty
              </h2>
              <p className="text-[14px] text-text-secondary max-w-xs mx-auto mb-8 leading-relaxed">
                Looks like you haven't added anything yet. Explore our collection!
              </p>
              <Link href="/products">
                <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-blue-dark text-white font-bold text-[14px] cursor-pointer hover:-translate-y-0.5 hover:shadow-hover transition-all duration-300">
                  Explore Collection <ChevronRight size={16} />
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">

              {/* LEFT */}
              <div className="flex flex-col gap-4">
                {/* Select All / Delete bar */}
                <div className="flex items-center justify-between bg-white border border-border rounded-2xl px-5 py-3 shadow-soft">
                  <button onClick={toggleSelectAll}
                    className="flex items-center gap-3 text-[13px] font-semibold text-text-primary hover:text-blue transition-colors cursor-pointer"
                  >
                    <span className="w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200"
                      style={{ borderColor: selected.length === cart.length ? "#475792" : "#E5E7EB", background: selected.length === cart.length ? "#475792" : "#fff" }}
                    >
                      {selected.length === cart.length && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    Select All
                    {/* 🆕 Show selected count when not all selected */}
                    {selected.length > 0 && selected.length < cart.length && (
                      <span className="text-[11px] font-bold text-white bg-blue px-2 py-0.5 rounded-full">
                        {selected.length}
                      </span>
                    )}
                  </button>

                  <button onClick={deleteSelected} disabled={!selected.length}
                    className="flex items-center gap-1.5 text-[13px] font-semibold px-4 py-1.5 rounded-full transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-red-50 border border-red-200 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 cursor-pointer"
                  >
                    <Trash size={13} />
                    {/* 🆕 Show count on delete button */}
                    Delete{selected.length > 0 ? ` (${selected.length})` : ""}
                  </button>
                </div>

                {/* Items */}
                <div className="flex flex-col gap-3">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item-row">
                      <CartItem item={item} onRemove={removeItem} onQtyChange={updateQty}
                        selected={selected.includes(item.id)} onSelect={toggleSelect}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-2">
                  <Link href="/products">
                    <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-border bg-white text-[13px] font-semibold text-text-secondary hover:text-blue hover:border-blue transition-all duration-200 cursor-pointer">
                      Continue Shopping <ChevronRight size={14} />
                    </button>
                  </Link>
                </div>
              </div>

              {/* RIGHT — Order Summary */}
              <div className="bg-white border border-border rounded-2xl shadow-soft p-5 sticky top-6">
                <h2 className="text-[16px] font-bold text-blue-dark mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Order Summary
                </h2>

                {/* Coupon */}
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex-1 flex items-center gap-2 border border-border rounded-xl px-3 py-2.5 bg-bg-main">
                    <Tag size={14} className="text-text-secondary shrink-0" />
                    <input type="text" placeholder="Coupon Code" value={coupon}
                      onChange={(e) => { setCoupon(e.target.value); setCouponError(""); }}
                      className="flex-1 bg-transparent border-none outline-none text-[13px] text-text-primary placeholder:text-text-secondary"
                    />
                  </div>
                  <button onClick={applyCoupon}
                    className="px-4 py-2.5 rounded-xl bg-blue-dark text-white text-[13px] font-bold hover:bg-blue transition-colors duration-200 shrink-0 cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-[11px] text-red-500 mb-3 px-1">{couponError}</p>}
                {appliedCoupon && (
                  <p className="text-[11px] text-green-600 font-semibold mb-3 px-1">
                    ✓ {appliedCoupon.code} applied — {appliedCoupon.pct}% off!
                  </p>
                )}

                <div className="h-px bg-border my-4" />

                {/* Price rows */}
                <div className="flex flex-col gap-3 mb-4">
                  <div className="flex items-center justify-between text-[14px]">
                    <span className="text-text-secondary">Subtotal ({selectedItems.length} item{selectedItems.length !== 1 ? "s" : ""})</span>
                    <span className="font-semibold text-text-primary">₹{subtotal.toLocaleString()}</span>
                  </div>
                  {discountAmt > 0 && (
                    <div className="flex items-center justify-between text-[14px]">
                      <span className="text-text-secondary">Discount ({appliedCoupon.pct}%)</span>
                      <span className="font-semibold text-red-500">-₹{discountAmt.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-[14px]">
                    <span className="text-text-secondary">Delivery Fee</span>
                    <span className={`font-semibold ${delivery === 0 ? "text-green-600" : "text-text-primary"}`}>
                      {delivery === 0 ? "Free" : `₹${delivery}`}
                    </span>
                  </div>
                  {delivery > 0 && (
                    <p className="text-[11px] text-text-secondary -mt-1">Free delivery on orders above ₹999</p>
                  )}
                </div>

                {/* Total */}
                <div className="flex items-center justify-between py-3 border-t border-border mb-4">
                  <span className="text-[15px] font-bold text-text-primary">Total</span>
                  <span className="text-[20px] font-bold text-blue-dark">₹{total.toLocaleString()}</span>
                </div>

                <BuyNowButton
                  mode="cart"
                  message={cartMessage}
                  label="Buy Now via WhatsApp"
                  disabled={!selectedItems.length}
                  fullWidth
                />

                <div className="flex items-start gap-2 mt-3 px-3 py-2 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0]">
                  <span className="text-[#16a34a] text-[12px] shrink-0 mt-0.5">✓</span>
                  <p className="text-[11px] text-[#15803d] leading-relaxed">
                    Opens WhatsApp with your full order pre-filled. Just hit <span className="font-bold">Send</span>!
                  </p>
                </div>
              </div>

            </div>
          )}
        </div>
      </section>
    </>
  );
}