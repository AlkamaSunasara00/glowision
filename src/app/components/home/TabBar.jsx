"use client";
import { useState, useRef, useEffect } from "react";
import { Home, LayoutGrid, FileText, Phone, Search, X } from "lucide-react";
import { useRouter,usePathname } from "next/navigation";


const TABS = [
  { id: "home",     label: "Home",     icon: Home,       href: "/" },
  { id: "products", label: "Products", icon: LayoutGrid, href: "/products" },
  { id: "search",   label: "Search",   icon: Search,     href: null },
  { id: "quote",    label: "Quote",    icon: FileText,   href: "/quote" },
  { id: "contact",  label: "Contact",  icon: Phone,      href: "/contact" },
];

const DEFAULT_SUGGESTIONS = [
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

export default function BottomTabBar() {
const pathname = usePathname();
const router = useRouter();
const [active, setActive] = useState("home");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState(DEFAULT_SUGGESTIONS);
  const inputRef = useRef(null);

  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions(DEFAULT_SUGGESTIONS);
    } else {
      const filtered = ALL_SUGGESTIONS.filter((s) =>
        s.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    }
  }, [query]);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [searchOpen]);
  
  useEffect(() => {
  if (pathname.startsWith("/products")) {
    setActive("products");
  } else if (pathname === "/") {
    setActive("home");
  } else if (pathname.startsWith("/quote")) {
    setActive("quote");
  } else if (pathname.startsWith("/contact")) {
    setActive("contact");
  }
}, [pathname]);


  const handleTabClick = (tab) => {
  if (tab.id === "search") {
    setSearchOpen(true);
  } else {
    setActive(tab.id);
    setSearchOpen(false);
    if (tab.href) router.push(tab.href);  // ← redirect
  }
};

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
    setSuggestions(DEFAULT_SUGGESTIONS);
  };

  useEffect(() => {
  if (searchOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
  return () => {
    document.body.style.overflow = "";
  };
}, [searchOpen]);

  

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');`}</style>

      {/* Glass Search Overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[60] md:hidden flex flex-col items-center pt-20 px-4"
          style={{
            background: "rgba(10, 14, 40, 0.55)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) closeSearch(); }}
        >
          {/* Close Button */}
          <button
            onClick={closeSearch}
            style={{
              position: "absolute",
              top: "18px",
              right: "20px",
              background: "white",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "50%",
              width: "38px",
              height: "38px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "black",
              backdropFilter: "blur(8px)",
            }}
          >
            <X size={18} />
          </button>

          {/* Search Input */}
          <div
            style={{
              width: "100%",
              maxWidth: "520px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "white",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: "16px",
              padding: "14px 18px",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            }}
          >
            <Search size={19} style={{ color: "black", flexShrink: 0 }} />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What are you looking for..."
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "black",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "17px",
                fontWeight: 500,
                width: "100%",
              }}
            />
            {query.length > 0 && (
              <button onClick={() => setQuery("")} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)", padding: 0, display: "flex" }}>
                <X size={16} />
              </button>
            )}
          </div>

          {/* Suggestions Box */}
          <div
            style={{
              width: "100%",
              maxWidth: "520px",
              marginTop: "5px",
              background: "white",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "16px",
              overflow: "hidden",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            }}
          >
            {suggestions.length === 0 ? (
              <div style={{ padding: "16px 20px", color: "black", fontFamily: "'DM Sans', sans-serif", fontSize: "16px" }}>
                No results found
              </div>
            ) : (
              suggestions.map((s, i) => (
                <button
                  key={s}
                  onClick={() => { setQuery(s); }}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "13px 20px",
                    background: "transparent",
                    border: "none",
                    borderBottom: i < suggestions.length - 1 ? "0.7px solid var(--color-text-secondary)" : "none",
                   color: "black",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "16px",
                    fontWeight: 500,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  <Search size={16} style={{color: "black", flexShrink: 0 }} />
                  {query.trim() !== "" ? (
                    <span>
                      {s.split(new RegExp(`(${query})`, "gi")).map((part, idx) =>
                        part.toLowerCase() === query.toLowerCase() ? (
                          <span key={idx} style={{ color: "var(--color-gold)", fontWeight: 700 }}>{part}</span>
                        ) : (
                          <span key={idx}>{part}</span>
                        )
                      )}
                    </span>
                  ) : (
                    <span>{s}</span>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Bottom Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 px-4 md:hidden">
        <div
          style={{
            background: "var(--color-blue-dark, #0f172a)",
            borderRadius: "999px",
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            width: "100%",
            maxWidth: "560px",
            justifyContent: "space-between",
            boxShadow: "0 10px 35px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.id && !searchOpen;
            const isSearch = tab.id === "search";
            const isSearchActive = isSearch && searchOpen;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: (isActive || isSearchActive) ? "8px" : "0px",
                  background: (isActive || isSearchActive) ? "var(--color-white, #ffffff)" : "transparent",
                  color: (isActive || isSearchActive) ? "var(--color-blue-dark, #0f172a)" : "rgba(255,255,255,0.55)",
                  borderRadius: "999px",
                  padding: (isActive || isSearchActive) ? "10px 18px" : "10px 14px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: "13px",
                  whiteSpace: "nowrap",
                  transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  outline: "none",
                  WebkitTapHighlightColor: "transparent",
                  overflow: "hidden",
                  maxWidth: (isActive || isSearchActive) ? "160px" : "48px",
                }}
              >
                <Icon
                  size={20}
                  style={{
                    flexShrink: 0,
                    transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    transform: (isActive || isSearchActive) ? "scale(1.15)" : "scale(1)",
                  }}
                />
                <span
                  style={{
                    overflow: "hidden",
                    maxWidth: (isActive || isSearchActive) ? "90px" : "0px",
                    opacity: (isActive || isSearchActive) ? 1 : 0,
                    transition: "max-width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease",
                    display: "inline-block",
                    whiteSpace: "nowrap",
                    fontSize: "14px",
                  }}
                >
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