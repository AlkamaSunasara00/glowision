"use client";
import { useState, useRef, useEffect } from "react";
import { Home, LayoutGrid, FileText, Search, X, ShoppingCart, ArrowLeft, TrendingUp, Clock } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const TABS = [
  { id: "home",     label: "Home",     icon: Home,         href: "/" },
  { id: "products", label: "Products", icon: LayoutGrid,   href: "/products" },
  { id: "search",   label: "Search",   icon: Search,       href: null },
  { id: "quote",    label: "Quote",    icon: FileText,      href: "/quote" },
  { id: "Cart",     label: "Cart",     icon: ShoppingCart,  href: "/cart-items" },
];

const TRENDING = [
  "Islamic Wall Clocks",
  "Ramadan Collection",
  "Eid Special Gift Sets",
  "Islamic Wall Art",
  "Modern Wall Clocks",
];

const ALL_SUGGESTIONS = [
  "Islamic Wall Clocks",
  "Islamic Key Holders",
  "Islamic Wall Art",
  "Islamic Printed Art",
  "Exclusive Combos",
  "Ramadan Collection",
  "Eid Special Gift Sets",
  "Home & Living",
  "Modern Wall Clocks",
  "Bulk Orders",
  "Best Sellers",
  "New Arrivals",
];

// ── Full Screen Search ────────────────────────────────────────────────────────
function FullScreenSearch({ open, onClose }) {
  const [query, setQuery]           = useState("");
  const [results, setResults]       = useState([]);
  const [recent, setRecent]         = useState([]);
  const [visible, setVisible]       = useState(false);
  const inputRef                    = useRef(null);

  // Animate in/out
  useEffect(() => {
    if (open) {
      setVisible(true);
      setTimeout(() => inputRef.current?.focus(), 150);
      // Load recent searches
      const saved = JSON.parse(localStorage.getItem("glowison_recent_searches") || "[]");
      setRecent(saved);
    } else {
      setVisible(false);
      setTimeout(() => setQuery(""), 300);
    }
  }, [open]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Filter results
  useEffect(() => {
    if (query.trim() === "") { setResults([]); return; }
    setResults(ALL_SUGGESTIONS.filter((s) => s.toLowerCase().includes(query.toLowerCase())));
  }, [query]);

  const handleSelect = (term) => {
    // Save to recent
    const updated = [term, ...recent.filter((r) => r !== term)].slice(0, 5);
    setRecent(updated);
    localStorage.setItem("glowison_recent_searches", JSON.stringify(updated));
    setQuery(term);
    // TODO: navigate to search results
  };

  const clearRecent = () => {
    setRecent([]);
    localStorage.removeItem("glowison_recent_searches");
  };

  if (!open && !visible) return null;

  return (
    <div
      className="md:hidden"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#f8f9fc",
        transform: open ? "translateY(0)" : "translateY(100%)",
        opacity: open ? 1 : 0,
        transition: "transform 0.35s cubic-bezier(0.34,1.1,0.64,1), opacity 0.25s ease",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      {/* ── Header ── */}
      <div style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "#f8f9fc",
        padding: "16px 16px 12px",
        borderBottom: "1px solid #e5e7eb",
      }}>
        {/* Back button + input row */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={onClose}
            style={{
              width: "40px", height: "40px", borderRadius: "50%",
              background: "white", border: "1px solid #e5e7eb",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", flexShrink: 0,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <ArrowLeft size={18} color="#1a2e6e" />
          </button>

          {/* Search Input */}
          <div style={{
            flex: 1, display: "flex", alignItems: "center", gap: "10px",
            background: "white", borderRadius: "14px",
            padding: "12px 16px",
            border: "1.5px solid",
            borderColor: query ? "var(--color-blue, #475792)" : "#e5e7eb",
            boxShadow: query ? "0 0 0 3px rgba(71,87,146,0.08)" : "0 2px 8px rgba(0,0,0,0.06)",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}>
            <Search size={18} color="#9ca3af" style={{ flexShrink: 0 }} />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What are you looking for..."
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
                fontSize: "16px", fontWeight: 500, color: "#111827",
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
            {query.length > 0 && (
              <button onClick={() => setQuery("")}
                style={{ background: "#f3f4f6", border: "none", borderRadius: "50%", width: "22px", height: "22px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
              >
                <X size={12} color="#6b7280" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ flex: 1, padding: "20px 16px 120px" }}>

        {/* ── Search Results ── */}
        {query.trim() !== "" && (
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "12px", fontFamily: "'DM Sans', sans-serif" }}>
              Results
            </p>
            {results.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <Search size={36} color="#d1d5db" style={{ margin: "0 auto 12px" }} />
                <p style={{ fontSize: "15px", color: "#6b7280", fontFamily: "'DM Sans', sans-serif" }}>No results for "<strong>{query}</strong>"</p>
                <p style={{ fontSize: "13px", color: "#9ca3af", marginTop: "6px", fontFamily: "'DM Sans', sans-serif" }}>Try a different keyword</p>
              </div>
            ) : (
              <div style={{ background: "white", borderRadius: "16px", overflow: "hidden", border: "1px solid #e5e7eb", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                {results.map((s, i) => (
                  <button key={s} onClick={() => handleSelect(s)}
                    style={{
                      width: "100%", textAlign: "left", padding: "14px 18px",
                      background: "transparent", border: "none",
                      borderBottom: i < results.length - 1 ? "1px solid #f3f4f6" : "none",
                      cursor: "pointer", display: "flex", alignItems: "center", gap: "12px",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    <Search size={15} color="#9ca3af" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: "15px", color: "#111827", fontWeight: 500 }}>
                      {s.split(new RegExp(`(${query})`, "gi")).map((part, idx) =>
                        part.toLowerCase() === query.toLowerCase()
                          ? <span key={idx} style={{ color: "var(--color-gold)", fontWeight: 700 }}>{part}</span>
                          : <span key={idx}>{part}</span>
                      )}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Recent Searches ── */}
        {query.trim() === "" && recent.length > 0 && (
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", letterSpacing: "0.8px", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>
                Recent
              </p>
              <button onClick={clearRecent}
                style={{ fontSize: "12px", color: "#ef4444", fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
              >
                Clear
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {recent.map((term) => (
                <button key={term} onClick={() => handleSelect(term)}
                  style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "12px 16px", background: "white", border: "1px solid #e5e7eb",
                    borderRadius: "12px", cursor: "pointer", textAlign: "left",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  <Clock size={15} color="#9ca3af" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: "15px", color: "#374151", fontWeight: 500, flex: 1 }}>{term}</span>
                  <X size={13} color="#d1d5db"
                    onClick={(e) => {
                      e.stopPropagation();
                      const updated = recent.filter((r) => r !== term);
                      setRecent(updated);
                      localStorage.setItem("glowison_recent_searches", JSON.stringify(updated));
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Trending ── */}
        {query.trim() === "" && (
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "12px", fontFamily: "'DM Sans', sans-serif" }}>
              Trending
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {TRENDING.map((term) => (
                <button key={term} onClick={() => handleSelect(term)}
                  style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    padding: "9px 16px", background: "white",
                    border: "1px solid #e5e7eb", borderRadius: "999px",
                    cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px", fontWeight: 600, color: "#374151",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                    transition: "all 0.2s ease",
                  }}
                >
                  <TrendingUp size={13} color="var(--color-gold, #F2B461)" />
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main TabBar ───────────────────────────────────────────────────────────────
export default function BottomTabBar() {
  const pathname = usePathname();
  const router   = useRouter();
  const [active, setActive]       = useState("home");
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const readCart = () => {
      const cart = JSON.parse(localStorage.getItem("glowison_cart") || "[]");
      setCartCount(cart.reduce((sum, item) => sum + (item.qty || 1), 0));
    };
    readCart();
    window.addEventListener("storage",    readCart);
    window.addEventListener("cartUpdate", readCart);
    return () => {
      window.removeEventListener("storage",    readCart);
      window.removeEventListener("cartUpdate", readCart);
    };
  }, []);

  useEffect(() => {
    if (pathname.startsWith("/products")) setActive("products");
    else if (pathname === "/")            setActive("home");
    else if (pathname.startsWith("/quote")) setActive("quote");
    else if (pathname.startsWith("/contact")) setActive("contact");
    else if (pathname.startsWith("/cart")) setActive("Cart");
  }, [pathname]);

  const handleTabClick = (tab) => {
    if (tab.id === "search") { setSearchOpen(true); }
    else { setActive(tab.id); if (tab.href) router.push(tab.href); }
  };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');`}</style>

      {/* Full Screen Search */}
      <FullScreenSearch open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Bottom Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 px-4 md:hidden">
        <div style={{ background: "var(--color-blue-dark,#0f172a)", borderRadius: "999px", padding: "10px 14px", display: "flex", alignItems: "center", gap: "4px", width: "100%", maxWidth: "560px", justifyContent: "space-between", boxShadow: "0 10px 35px rgba(0,0,0,0.35)" }}>
          {TABS.map((tab) => {
            const Icon     = tab.icon;
            const isActive = active === tab.id && !searchOpen;
            const isSearchActive = tab.id === "search" && searchOpen;
            const expanded = isActive || isSearchActive;
            const isCart   = tab.id === "Cart";

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                style={{ display: "flex", alignItems: "center", gap: expanded ? "8px" : "0px", background: expanded ? "var(--color-white,#ffffff)" : "transparent", color: expanded ? "var(--color-blue-dark,#0f172a)" : "rgba(255,255,255,0.55)", borderRadius: "999px", padding: expanded ? "10px 18px" : "10px 14px", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "13px", whiteSpace: "nowrap", transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)", outline: "none", WebkitTapHighlightColor: "transparent", overflow: "hidden", maxWidth: expanded ? "160px" : "48px", position: "relative" }}
              >
                {/* Cart Badge */}
                {isCart && cartCount > 0 && (
                  <span style={{ position: "absolute", top: expanded ? "4px" : "2px", right: expanded ? "12px" : "4px", minWidth: "17px", height: "17px", borderRadius: "999px", background: "#ef4444", color: "white", fontSize: "10px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px", lineHeight: 1, border: "2px solid", borderColor: expanded ? "white" : "var(--color-blue-dark,#0f172a)", zIndex: 1, transition: "all 0.3s ease" }}>
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
                <Icon size={20} style={{ flexShrink: 0, transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)", transform: expanded ? "scale(1.15)" : "scale(1)" }} />
                <span style={{ overflow: "hidden", maxWidth: expanded ? "90px" : "0px", opacity: expanded ? 1 : 0, transition: "max-width 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease", display: "inline-block", whiteSpace: "nowrap", fontSize: "14px" }}>
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