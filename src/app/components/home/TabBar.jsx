// FILE: src/app/components/BottomTabBar.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import {
  Home, LayoutGrid, FileText, Search, X,
  ShoppingCart, ArrowLeft, TrendingUp, Clock,
  Tag, Package,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { CATEGORIES } from "@/app/data/categoriesData";
import { PRODUCTS }   from "@/app/data/productsData";

// ─────────────────────────────────────────────────────────────────────────────
// TABS
// ─────────────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "home",     label: "Home",     icon: Home,         href: "/" },
  { id: "products", label: "Products", icon: LayoutGrid,   href: "/products" },
  { id: "search",   label: "Search",   icon: Search,       href: null },
  { id: "quote",    label: "Quote",    icon: FileText,      href: "/quote" },
  { id: "cart",     label: "Cart",     icon: ShoppingCart,  href: "/cart-items" },
];

// ─────────────────────────────────────────────────────────────────────────────
// BUILD TYPED SEARCH SUGGESTIONS  (same logic as Navbar)
// ─────────────────────────────────────────────────────────────────────────────
function buildSuggestions() {
  const list = [];

  // Categories
  CATEGORIES.forEach((cat) => {
    const count = PRODUCTS.filter((p) => p.category === cat.slug).length;
    list.push({
      type:     "category",
      label:    cat.name,
      subtitle: `${count} product${count !== 1 ? "s" : ""}`,
      href:     `/${cat.slug}`,
    });
  });

  // Subcategories
  CATEGORIES.forEach((cat) => {
    cat.subcategories.forEach((sub) => {
      const count = PRODUCTS.filter(
        (p) => p.category === cat.slug && p.subcategory === sub.slug
      ).length;
      list.push({
        type:     "subcategory",
        label:    sub.name,
        subtitle: `in ${cat.name} · ${count} item${count !== 1 ? "s" : ""}`,
        href:     `/${cat.slug}/sub/${sub.slug}`,
      });
    });
  });

  // Products
  PRODUCTS.forEach((p) => {
    const mrp   = p.dimensions[0]?.mrp || 0;
    const price = Math.round(mrp * (1 - p.discount / 100));
    list.push({
      type:     "product",
      label:    p.title,
      subtitle: `₹${price.toLocaleString()} · ${p.category.replace(/-/g, " ")}`,
      href:     `/${p.category}/${p.slug}`,
      image:    p.images.flatMap((e) => e.images)[0] || null,
    });
  });

  return list;
}

const ALL_SUGGESTIONS = buildSuggestions();

// Trending chips — top categories + first subcategory of each
const TRENDING_CHIPS = [
  ...CATEGORIES.map((c) => ({ label: c.name, href: `/${c.slug}` })),
  ...CATEGORIES.flatMap((c) =>
    c.subcategories.slice(0, 1).map((s) => ({
      label: s.name,
      href:  `/${c.slug}/sub/${s.slug}`,
    }))
  ),
].slice(0, 6);

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function Highlight({ text, query }) {
  if (!query.trim()) return <>{text}</>;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts   = text.split(new RegExp(`(${escaped})`, "gi"));
  return (
    <>
      {parts.map((p, i) =>
        p.toLowerCase() === query.toLowerCase()
          ? <span key={i} style={{ color: "#F2B461", fontWeight: 700 }}>{p}</span>
          : <span key={i}>{p}</span>
      )}
    </>
  );
}

// Thumbnail/icon per suggestion type
function SuggestionIcon({ item }) {
  if (item.type === "product") {
    return (
      <div style={{
        width: 42, height: 42, borderRadius: 10, overflow: "hidden", flexShrink: 0,
        background: "#f1f5f9", border: "1px solid #e5e7eb",
      }}>
        {item.image
          ? <img src={item.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <Package size={16} style={{ margin: "13px auto 0", color: "#9ca3af", display: "block" }} />
        }
      </div>
    );
  }
  if (item.type === "category") {
    return (
      <div style={{
        width: 42, height: 42, borderRadius: 10, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "#e0e7ff", border: "1px solid #a5b4fc",
      }}>
        <Tag size={15} style={{ color: "#4338ca" }} />
      </div>
    );
  }
  return (
    <div style={{
      width: 42, height: 42, borderRadius: 10, flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "#fef3c7", border: "1px solid #fcd34d",
    }}>
      <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#d97706" }} />
    </div>
  );
}

// Type badge
const TYPE_BADGE = {
  category:    { bg: "#e0e7ff", color: "#3730a3" },
  subcategory: { bg: "#fef3c7", color: "#92400e" },
  product:     { bg: "#f1f5f9", color: "#64748b" },
};
const TYPE_LABEL = { category: "Category", subcategory: "Sub", product: "Product" };

// ─────────────────────────────────────────────────────────────────────────────
// FULL-SCREEN SEARCH (mobile)
// ─────────────────────────────────────────────────────────────────────────────
function FullScreenSearch({ open, onClose }) {
  const router   = useRouter();
  const inputRef = useRef(null);

  const [query,  setQuery]  = useState("");
  const [recent, setRecent] = useState([]);
  const [alive,  setAlive]  = useState(false); // keeps DOM mounted during close animation

  useEffect(() => {
    if (open) {
      setAlive(true);
      setTimeout(() => inputRef.current?.focus(), 180);
      try { setRecent(JSON.parse(localStorage.getItem("glowison_searches") || "[]")); }
      catch { setRecent([]); }
    } else {
      const t = setTimeout(() => { setAlive(false); setQuery(""); }, 350);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!alive) return null;

  // Filter suggestions
  const results = query.trim()
    ? ALL_SUGGESTIONS.filter((s) =>
        s.label.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10)
    : [];

  const cats  = results.filter((r) => r.type === "category");
  const subs  = results.filter((r) => r.type === "subcategory");
  const prods = results.filter((r) => r.type === "product");

  const navigate = (item) => {
    const entry   = { label: item.label, href: item.href, type: item.type };
    const updated = [entry, ...recent.filter((r) => r.href !== item.href)].slice(0, 6);
    setRecent(updated);
    localStorage.setItem("glowison_searches", JSON.stringify(updated));
    router.push(item.href);
    onClose();
  };

  const clearRecent = () => {
    setRecent([]);
    localStorage.removeItem("glowison_searches");
  };

  return (
    <div
      className="md:hidden "
      style={{
        position: "fixed", inset: 0,
        background: "#f8f9fc",
        transform: open ? "translateY(0)" : "translateY(100%)",
        opacity:   open ? 1 : 0,
        transition: "transform 0.35s cubic-bezier(0.34,1.1,0.64,1), opacity 0.25s ease",
        display: "flex", flexDirection: "column",
      }}
    >
      {/* ── Sticky Header ── */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "#f8f9fc",
        padding: "16px 16px 12px",
        borderBottom: "1px solid #e5e7eb",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Back */}
          <button onClick={onClose} style={{
            width: 40, height: 40, borderRadius: "50%",
            background: "white", border: "1px solid #e5e7eb",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}>
            <ArrowLeft size={18} color="#1a2e6e" />
          </button>

          {/* Input */}
          <div style={{
            flex: 1, display: "flex", alignItems: "center", gap: 10,
            background: "white", borderRadius: 14, padding: "12px 16px",
            border: `1.5px solid ${query ? "#475792" : "#e5e7eb"}`,
            boxShadow: query ? "0 0 0 3px rgba(71,87,146,0.08)" : "0 2px 8px rgba(0,0,0,0.06)",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}>
            <Search size={18} color="#9ca3af" style={{ flexShrink: 0 }} />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && results[0]) navigate(results[0]); }}
              placeholder="Search categories, products..."
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
                fontSize: 16, fontWeight: 500, color: "#111827",
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
            {query && (
              <button onClick={() => setQuery("")} style={{
                background: "#f3f4f6", border: "none", borderRadius: "50%",
                width: 22, height: 22, display: "flex", alignItems: "center",
                justifyContent: "center", cursor: "pointer", flexShrink: 0,
              }}>
                <X size={12} color="#6b7280" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Scrollable Body ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 140px", scrollbarWidth: "none" }}>

        {query.trim() ? (
          /* ════ RESULTS ════ */
          results.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: 60 }}>
              <p style={{ fontSize: 40, marginBottom: 10 }}>🔍</p>
              <p style={{ fontSize: 15, color: "#6b7280", fontFamily: "'DM Sans', sans-serif" }}>
                No results for "<strong style={{ color: "#111827" }}>{query}</strong>"
              </p>
              <p style={{ fontSize: 13, color: "#9ca3af", marginTop: 6, fontFamily: "'DM Sans', sans-serif" }}>
                Try a different keyword
              </p>
            </div>
          ) : (
            <div>
              {/* — Categories — */}
              {cats.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 10, fontFamily: "'DM Sans', sans-serif" }}>
                    Categories
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {cats.map((item) => (
                      <button key={item.href} onClick={() => navigate(item)}
                        style={{
                          display: "flex", alignItems: "center", gap: 12,
                          padding: "12px 14px", background: "white", border: "1px solid #e5e7eb",
                          borderRadius: 14, cursor: "pointer", textAlign: "left", width: "100%",
                          boxShadow: "0 1px 6px rgba(0,0,0,0.05)", fontFamily: "'DM Sans', sans-serif",
                          transition: "background 0.15s",
                        }}
                        onTouchStart={(e) => e.currentTarget.style.background = "#eff6ff"}
                        onTouchEnd={(e)   => e.currentTarget.style.background = "white"}
                      >
                        <SuggestionIcon item={item} />
                        <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                          <p style={{ fontSize: 15, fontWeight: 600, color: "#111827", lineHeight: 1.3 }}>
                            <Highlight text={item.label} query={query} />
                          </p>
                          <p style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{item.subtitle}</p>
                        </div>
                        <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999, flexShrink: 0, background: TYPE_BADGE.category.bg, color: TYPE_BADGE.category.color }}>
                          {TYPE_LABEL.category}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* — Subcategories — */}
              {subs.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 10, fontFamily: "'DM Sans', sans-serif" }}>
                    Subcategories
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {subs.map((item) => (
                      <button key={item.href} onClick={() => navigate(item)}
                        style={{
                          display: "flex", alignItems: "center", gap: 12,
                          padding: "12px 14px", background: "white", border: "1px solid #e5e7eb",
                          borderRadius: 14, cursor: "pointer", textAlign: "left", width: "100%",
                          boxShadow: "0 1px 6px rgba(0,0,0,0.05)", fontFamily: "'DM Sans', sans-serif",
                          transition: "background 0.15s",
                        }}
                        onTouchStart={(e) => e.currentTarget.style.background = "#fffbeb"}
                        onTouchEnd={(e)   => e.currentTarget.style.background = "white"}
                      >
                        <SuggestionIcon item={item} />
                        <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                          <p style={{ fontSize: 15, fontWeight: 600, color: "#111827", lineHeight: 1.3 }}>
                            <Highlight text={item.label} query={query} />
                          </p>
                          <p style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{item.subtitle}</p>
                        </div>
                        <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999, flexShrink: 0, background: TYPE_BADGE.subcategory.bg, color: TYPE_BADGE.subcategory.color }}>
                          {TYPE_LABEL.subcategory}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* — Products — */}
              {prods.length > 0 && (
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 10, fontFamily: "'DM Sans', sans-serif" }}>
                    Products
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {prods.map((item) => (
                      <button key={item.href} onClick={() => navigate(item)}
                        style={{
                          display: "flex", alignItems: "center", gap: 12,
                          padding: "12px 14px", background: "white", border: "1px solid #e5e7eb",
                          borderRadius: 14, cursor: "pointer", textAlign: "left", width: "100%",
                          boxShadow: "0 1px 6px rgba(0,0,0,0.05)", fontFamily: "'DM Sans', sans-serif",
                          transition: "background 0.15s",
                        }}
                        onTouchStart={(e) => e.currentTarget.style.background = "#f8fafc"}
                        onTouchEnd={(e)   => e.currentTarget.style.background = "white"}
                      >
                        <SuggestionIcon item={item} />
                        <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                          <p style={{ fontSize: 14, fontWeight: 600, color: "#111827", lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            <Highlight text={item.label} query={query} />
                          </p>
                          <p style={{ fontSize: 12, color: "#6b7280", marginTop: 2, textTransform: "capitalize" }}>{item.subtitle}</p>
                        </div>
                        <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999, flexShrink: 0, background: TYPE_BADGE.product.bg, color: TYPE_BADGE.product.color }}>
                          {TYPE_LABEL.product}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        ) : (
          /* ════ DEFAULT: Recent + Trending ════ */
          <>
            {/* Recent */}
            {recent.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.8px", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>
                    Recent
                  </p>
                  <button onClick={clearRecent} style={{ fontSize: 12, color: "#ef4444", fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                    Clear all
                  </button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {recent.map((item) => (
                    <button key={item.href} onClick={() => { router.push(item.href); onClose(); }}
                      style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: "12px 16px", background: "white", border: "1px solid #e5e7eb",
                        borderRadius: 14, cursor: "pointer", textAlign: "left", width: "100%",
                        fontFamily: "'DM Sans', sans-serif", transition: "background 0.15s",
                      }}
                      onTouchStart={(e) => e.currentTarget.style.background = "#f8fafc"}
                      onTouchEnd={(e)   => e.currentTarget.style.background = "white"}
                    >
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Clock size={14} color="#9ca3af" />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 14, fontWeight: 500, color: "#374151", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {item.label}
                        </p>
                        <p style={{ fontSize: 11, color: "#9ca3af", textTransform: "capitalize", marginTop: 1 }}>
                          {item.type}
                        </p>
                      </div>
                      {/* Remove individual */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const updated = recent.filter((r) => r.href !== item.href);
                          setRecent(updated);
                          localStorage.setItem("glowison_searches", JSON.stringify(updated));
                        }}
                        style={{ width: 24, height: 24, borderRadius: "50%", background: "#f3f4f6", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
                      >
                        <X size={11} color="#9ca3af" />
                      </button>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>
                Trending
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {TRENDING_CHIPS.map((t) => (
                  <button key={t.href}
                    onClick={() => { router.push(t.href); onClose(); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "9px 16px", background: "white",
                      border: "1px solid #e5e7eb", borderRadius: 999,
                      cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13, fontWeight: 600, color: "#374151",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                      transition: "all 0.2s ease",
                    }}
                    onTouchStart={(e) => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.borderColor = "#93c5fd"; }}
                    onTouchEnd={(e)   => { e.currentTarget.style.background = "white";   e.currentTarget.style.borderColor = "#e5e7eb"; }}
                  >
                    <TrendingUp size={13} color="#F2B461" />
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN BOTTOM TAB BAR
// ─────────────────────────────────────────────────────────────────────────────
export default function BottomTabBar() {
  const pathname = usePathname();
  const router   = useRouter();

  const [active,     setActive]     = useState("home");
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount,  setCartCount]  = useState(0);

  // Sync cart badge
  useEffect(() => {
    const read = () => {
      const cart = JSON.parse(localStorage.getItem("glowison_cart") || "[]");
      setCartCount(cart.reduce((s, i) => s + (i.qty || 1), 0));
    };
    read();
    window.addEventListener("storage",    read);
    window.addEventListener("cartUpdate", read);
    return () => {
      window.removeEventListener("storage",    read);
      window.removeEventListener("cartUpdate", read);
    };
  }, []);

  // Sync active tab from pathname
  useEffect(() => {
    if      (pathname === "/")                     setActive("home");
    else if (pathname.startsWith("/products"))     setActive("products");
    else if (pathname.startsWith("/quote"))        setActive("quote");
    else if (pathname.startsWith("/cart"))         setActive("cart");
    // category pages e.g. /islamic-wall-art → highlight products
    else                                           setActive("products");
  }, [pathname]);

  const handleTab = (tab) => {
    if (tab.id === "search") {
      setSearchOpen(true);
    } else {
      setActive(tab.id);
      if (tab.href) router.push(tab.href);
    }
  };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');`}</style>

      <FullScreenSearch open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Tab bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[9990] flex justify-center pb-5 px-4 md:hidden">
        <div style={{
          background: "var(--color-blue-dark, #0f172a)",
          borderRadius: 999,
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: 4,
          width: "100%",
          maxWidth: 560,
          justifyContent: "space-between",
          boxShadow: "0 10px 35px rgba(0,0,0,0.35)",
        }}>
          {TABS.map((tab) => {
            const Icon           = tab.icon;
            const isActive       = active === tab.id && !searchOpen;
            const isSearchActive = tab.id === "search" && searchOpen;
            const expanded       = isActive || isSearchActive;
            const isCart         = tab.id === "cart";

            return (
              <button
                key={tab.id}
                onClick={() => handleTab(tab)}
                style={{
                  display: "flex", alignItems: "center",
                  gap:        expanded ? 8 : 0,
                  background: expanded ? "var(--color-white, #ffffff)" : "transparent",
                  color:      expanded ? "var(--color-blue-dark, #0f172a)" : "rgba(255,255,255,0.55)",
                  borderRadius: 999,
                  padding:    expanded ? "10px 18px" : "10px 14px",
                  border: "none", cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600, fontSize: 13,
                  whiteSpace: "nowrap",
                  transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                  outline: "none",
                  WebkitTapHighlightColor: "transparent",
                  overflow: "hidden",
                  maxWidth: expanded ? 160 : 48,
                  position: "relative",
                }}
              >
                {/* Cart badge */}
                {isCart && cartCount > 0 && (
                  <span style={{
                    position: "absolute",
                    top:   expanded ? 4  : 2,
                    right: expanded ? 12 : 4,
                    minWidth: 17, height: 17,
                    borderRadius: 999,
                    background: "#ef4444", color: "white",
                    fontSize: 10, fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: "0 4px", lineHeight: 1,
                    border: "2px solid",
                    borderColor: expanded ? "white" : "var(--color-blue-dark, #0f172a)",
                    zIndex: 1, transition: "all 0.3s ease",
                  }}>
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}

                <Icon size={20} style={{
                  flexShrink: 0,
                  transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                  transform:  expanded ? "scale(1.15)" : "scale(1)",
                }} />

                <span style={{
                  overflow: "hidden",
                  maxWidth:  expanded ? 90 : 0,
                  opacity:   expanded ? 1  : 0,
                  transition: "max-width 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease",
                  display: "inline-block",
                  whiteSpace: "nowrap",
                  fontSize: 14,
                }}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
