"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search, Heart, ShoppingCart, Menu, X, ChevronDown,
  TrendingUp, Clock, ArrowRight, Instagram, Facebook,
  Twitter, Phone, Mail, MapPin,
} from "lucide-react";
import { Poppins, Inter } from "next/font/google";
import Link from "next/link";

const heading = Poppins({ subsets: ["latin"], weight: ["600", "700"] });
const body    = Inter({ subsets: ["latin"], weight: ["400", "500"] });

const NAV_ITEMS = [
  { label: "Best Sellers",  href: "#" },
  { label: "New Arrivals",  href: "#" },
  {
    label: "Islamic Wall Decor",
    children: [
      { label: "Islamic Wall Clocks", href: "#", desc: "Elegant timepieces" },
      { label: "Islamic Key Holders", href: "#", desc: "Functional art"     },
      { label: "Islamic Wall Art",    href: "#", desc: "Timeless decor"     },
      { label: "Islamic Printed Art", href: "#", desc: "Premium prints"     },
      { label: "Exclusive Combos",    href: "#", desc: "Best value sets"    },
    ],
  },
  {
    label: "Shop by Themes",
    children: [
      { label: "Ramadan Collection", href: "#", desc: "Sacred season picks" },
      { label: "Eid Special",        href: "#", desc: "Celebrate in style"  },
      { label: "Home & Living",      href: "#", desc: "Everyday elegance"   },
      { label: "Gift Sets",          href: "#", desc: "Perfect presents"    },
    ],
  },
  { label: "Modern Wall Clocks", href: "#" },
  { label: "Bulk Orders",        href: "#" },
  { label: "Contact Us",         href: "#" },
  { label: "Blog",               href: "#" },
];

const TRENDING     = ["Islamic Wall Clocks", "Ramadan Collection", "Eid Special Gift Sets", "Islamic Wall Art", "Modern Wall Clocks"];
const ALL_SUGGESTIONS = ["Islamic Wall Clocks","Islamic Key Holders","Islamic Wall Art","Islamic Printed Art","Exclusive Combos","Ramadan Collection","Eid Special Gift Sets","Home & Living","Modern Wall Clocks","Bulk Orders","Best Sellers","New Arrivals"];

// ── Badge Icon ────────────────────────────────────────────────────────────────
function IconWithBadge({ href, icon: Icon, count, label }) {
  return (
    <Link href={href} className="flex flex-col items-center gap-0.5 group">
      <div className="relative">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-bg-main group-hover:bg-blue-soft transition-all duration-200">
          <Icon size={18} className="text-text-secondary group-hover:text-blue transition-colors duration-200" />
        </div>
        {count > 0 && (
          <span className="absolute -top-1.5 -right-1.5 min-w-[17px] h-[17px] rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center px-1 border-2 border-white leading-none">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </div>
      <span className="text-[10px] font-semibold text-text-secondary group-hover:text-blue transition-colors duration-200 tracking-wide">
        {label}
      </span>
    </Link>
  );
}

// ── Dropdown ──────────────────────────────────────────────────────────────────
function Dropdown({ items }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50 min-w-[260px]">
      {/* Arrow */}
      <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-border rotate-45 z-10" />
      <div className="bg-white border border-border rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden">
        {/* Header strip */}
        <div className="px-4 py-3 bg-gradient-to-r from-blue-soft to-white border-b border-border">
          <p className="text-[10px] font-bold text-blue uppercase tracking-[1px]">Browse Category</p>
        </div>
        {items.map((item, i) => (
          <a key={item.label} href={item.href}
            className="flex items-center gap-3 px-4 py-3 hover:bg-blue-soft transition-all duration-150 group/item"
            style={{ borderBottom: i < items.length - 1 ? "1px solid #f1f5f9" : "none" }}
          >
            <div className="w-8 h-8 rounded-lg bg-bg-main group-hover/item:bg-white flex items-center justify-center shrink-0 transition-colors">
              <div className="w-2 h-2 rounded-full bg-blue opacity-60" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-text-primary group-hover/item:text-blue transition-colors leading-tight">
                {item.label}
              </p>
              {item.desc && (
                <p className="text-[11px] text-text-secondary mt-0.5 leading-tight">{item.desc}</p>
              )}
            </div>
            <ArrowRight size={13} className="text-text-secondary opacity-0 group-hover/item:opacity-100 -translate-x-1 group-hover/item:translate-x-0 transition-all duration-200" />
          </a>
        ))}
      </div>
    </div>
  );
}

// ── Nav Item ──────────────────────────────────────────────────────────────────
function NavItem({ item }) {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const enter = () => { clearTimeout(timer.current); setOpen(true); };
  const leave = () => { timer.current = setTimeout(() => setOpen(false), 100); };

  if (!item.children) {
    return (
      <a href={item.href}
        className="relative text-[13px] font-medium text-text-secondary hover:text-blue transition-colors duration-200 py-1 group"
      >
        {item.label}
        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gold group-hover:w-full transition-all duration-300 rounded-full" />
      </a>
    );
  }

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button className="flex items-center gap-1 text-[13px] font-medium text-text-secondary hover:text-blue transition-colors duration-200 py-1">
        {item.label}
        <ChevronDown size={13} className={`transition-transform duration-300 ${open ? "rotate-180 text-blue" : ""}`} />
      </button>
      {open && <Dropdown items={item.children} />}
    </div>
  );
}

// ── Desktop Search Overlay ────────────────────────────────────────────────────
function DesktopSearch({ open, onClose }) {
  const [query, setQuery]     = useState("");
  const [results, setResults] = useState([]);
  const [recent, setRecent]   = useState([]);
  const inputRef              = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setRecent(JSON.parse(localStorage.getItem("glowison_recent_searches") || "[]"));
    } else {
      setTimeout(() => setQuery(""), 200);
    }
  }, [open]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    setResults(ALL_SUGGESTIONS.filter((s) => s.toLowerCase().includes(query.toLowerCase())));
  }, [query]);

  const handleSelect = (term) => {
    const updated = [term, ...recent.filter((r) => r !== term)].slice(0, 5);
    setRecent(updated);
    localStorage.setItem("glowison_recent_searches", JSON.stringify(updated));
    setQuery(term);
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-[80] bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed top-0 left-0 right-0 z-[81] bg-white shadow-2xl border-b border-border"
        style={{ animation: "searchSlideDown 0.25s ease forwards" }}
      >
        <style>{`@keyframes searchSlideDown { from{transform:translateY(-100%);opacity:0} to{transform:translateY(0);opacity:1} }`}</style>

        <div className="max-w-3xl mx-auto px-6 py-5">
          {/* Input */}
          <div className="flex items-center gap-3 bg-bg-main border border-border rounded-2xl px-5 py-3.5 focus-within:border-blue focus-within:shadow-[0_0_0_3px_rgba(71,87,146,0.1)] transition-all">
            <Search size={20} className="text-text-secondary shrink-0" />
            <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Islamic Wall Clocks, Gift Sets..."
              className="flex-1 bg-transparent border-none outline-none text-[15px] text-text-primary placeholder:text-text-secondary font-medium"
            />
            {query && (
              <button onClick={() => setQuery("")} className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors">
                <X size={12} />
              </button>
            )}
            <button onClick={onClose} className="text-[13px] font-semibold text-text-secondary hover:text-blue cursor-pointer transition-colors ml-2">
              Cancel
            </button>
          </div>

          {/* Results or defaults */}
          <div className="mt-4 pb-2">
            {query.trim() ? (
              <div>
                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-[1px] mb-3">
                  {results.length} result{results.length !== 1 ? "s" : ""}
                </p>
                {results.length === 0 ? (
                  <p className="text-[14px] text-text-secondary py-4 text-center">No results for "<strong>{query}</strong>"</p>
                ) : (
                  <div className="flex flex-col gap-1">
                    {results.map((s) => (
                      <button key={s} onClick={() => handleSelect(s)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-soft transition-colors text-left cursor-pointer group/r"
                      >
                        <Search size={14} className="text-text-secondary shrink-0" />
                        <span className="text-[14px] font-medium text-text-primary group-hover/r:text-blue transition-colors">
                          {s.split(new RegExp(`(${query})`, "gi")).map((p, i) =>
                            p.toLowerCase() === query.toLowerCase()
                              ? <span key={i} className="text-gold font-bold">{p}</span>
                              : <span key={i}>{p}</span>
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-6">
                {/* Recent */}
                {recent.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] font-bold text-text-secondary uppercase tracking-[1px]">Recent</p>
                      <button onClick={() => { setRecent([]); localStorage.removeItem("glowison_recent_searches"); }}
                        className="text-[11px] text-red-500 font-semibold cursor-pointer hover:text-red-600"
                      >Clear</button>
                    </div>
                    {recent.map((t) => (
                      <button key={t} onClick={() => handleSelect(t)}
                        className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl hover:bg-bg-main transition-colors cursor-pointer"
                      >
                        <Clock size={13} className="text-text-secondary shrink-0" />
                        <span className="text-[13px] font-medium text-text-primary">{t}</span>
                      </button>
                    ))}
                  </div>
                )}
                {/* Trending */}
                <div>
                  <p className="text-[10px] font-bold text-text-secondary uppercase tracking-[1px] mb-2">Trending</p>
                  <div className="flex flex-wrap gap-2">
                    {TRENDING.map((t) => (
                      <button key={t} onClick={() => handleSelect(t)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-bg-main border border-border rounded-full text-[12px] font-semibold text-text-secondary hover:border-blue hover:text-blue hover:bg-blue-soft transition-all cursor-pointer"
                      >
                        <TrendingUp size={11} className="text-gold" />
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({ open, onClose }) {
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    if (!open) setExpanded(null);
  }, [open]);

  // ✅ STOP BACKGROUND SCROLL
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[70] bg-black/45 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed left-0 top-0 h-full w-full bg-white z-[71] flex flex-col transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
          <img src="/logos/logo1.png" alt="Glowison" className="h-10" />
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-[10px] bg-[var(--color-blue-dark)] flex items-center justify-center cursor-pointer border-none"
          >
            <X size={18} color="white" />
          </button>
        </div>

        {/* Nav Section */}
        <div className="flex-1 overflow-y-auto p-4 bg-[var(--color-bg-main)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="mb-2.5">
              {item.children ? (
                <>
                  <button
                    onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                    className="w-full px-4 py-3.5 rounded-[14px] font-semibold text-[14px] flex items-center justify-between cursor-pointer transition-all duration-200"
                    style={{
                      border: expanded === item.label
                        ? "1.5px solid var(--color-blue-dark)"
                        : "1.5px solid var(--color-border)",
                      background: expanded === item.label
                        ? "var(--color-blue-dark)"
                        : "var(--color-white)",
                      color: expanded === item.label
                        ? "var(--color-white)"
                        : "var(--color-blue-dark)",
                    }}
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      style={{ color: expanded === item.label ? "var(--color-white)" : "var(--color-blue)", transform: expanded === item.label ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}
                    />
                  </button>

                  {/* Children */}
                  <div
                    className="overflow-hidden transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{ maxHeight: expanded === item.label ? item.children.length * 65 : 0 }}
                  >
                    <div className="mt-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-white)] overflow-hidden">
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          onClick={onClose}
                          className="flex items-center gap-3 px-3.5 py-3 text-[13px] font-semibold text-[var(--color-blue-dark)] no-underline border-b border-[var(--color-border)] last:border-b-0 hover:bg-[var(--color-blue-soft)] transition-colors"
                        >
                          <div className="w-[26px] h-[26px] rounded-lg bg-[var(--color-gold-soft)] border border-[var(--color-gold)] flex items-center justify-center shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                          </div>
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <a
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between px-4 py-3.5 rounded-[14px] bg-[var(--color-white)] font-semibold text-[14px] text-[var(--color-blue-dark)] no-underline hover:bg-[var(--color-blue-soft)] hover:text-[var(--color-blue)] transition-colors"
                  style={{ border: "1.5px solid var(--color-border)" }}
                >
                  {item.label}
                  <ArrowRight size={14} className="text-[var(--color-text-secondary)]" />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="px-4 py-4 border-t border-[var(--color-border)] bg-[var(--color-white)]">
          <p className="text-[10px] font-bold text-[var(--color-text-secondary)] uppercase tracking-[1px] mb-3">
            Contact Us
          </p>
          {[
            { icon: Phone,  text: "+91 99787 50622",       color: "#16a34a" },
            { icon: Mail,   text: "hello@glowison.com",    color: "var(--color-blue-dark)" },
            { icon: MapPin, text: "Surat, Gujarat, India", color: "#dc2626" },
          ].map(({ icon: Icon, text, color }) => (
            <div key={text} className="flex items-center gap-2.5 mb-2.5 last:mb-0">
              <div
                className="w-[30px] h-[30px] rounded-lg flex items-center justify-center shrink-0"
                style={{ background: color + "18", border: `1px solid ${color}35` }}
              >
                <Icon size={14} style={{ color }} />
              </div>
              <span className="text-[12px] text-[var(--color-text-secondary)] font-medium">{text}</span>
            </div>
          ))}
        </div>

        {/* Social */}
        <div className="px-4 pt-4 pb-6 border-t border-[var(--color-border)] bg-[var(--color-white)]">
          <p className="text-[10px] font-bold text-[var(--color-text-secondary)] uppercase tracking-[1px] mb-2.5">
            Follow Us
          </p>
          <div className="flex gap-2.5">
            {[
              { icon: Instagram, color: "#E1306C" },
              { icon: Facebook,  color: "#1877F2" },
              { icon: Twitter,   color: "#1DA1F2" },
            ].map(({ icon: Icon, color }, i) => (
              <button
                key={i}
                className="flex-1 py-2.5 rounded-[14px] bg-[var(--color-blue-soft)] border border-[var(--color-border)] flex items-center justify-center cursor-pointer hover:scale-105 hover:bg-[var(--color-bg-main)] transition-all duration-200"
              >
                <Icon size={18} style={{ color }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ── Main Navbar ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const [sidebarOpen, setSidebarOpen]   = useState(false);
  const [searchOpen, setSearchOpen]     = useState(false);
  const [cartCount, setCartCount]       = useState(0);
  const [wishCount, setWishCount]       = useState(0);
  const [scrolled, setScrolled]         = useState(false);

  useEffect(() => {
    const readCounts = () => {
      const cart = JSON.parse(localStorage.getItem("glowison_cart")     || "[]");
      const wish = JSON.parse(localStorage.getItem("glowison_wishlist") || "[]");
      setCartCount(cart.reduce((s, i) => s + (i.qty || 1), 0));
      setWishCount(wish.length);
    };
    readCounts();
    window.addEventListener("cartUpdate",     readCounts);
    window.addEventListener("wishlistUpdate", readCounts);
    window.addEventListener("storage",        readCounts);
    return () => {
      window.removeEventListener("cartUpdate",     readCounts);
      window.removeEventListener("wishlistUpdate", readCounts);
      window.removeEventListener("storage",        readCounts);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        .scrollbar-hide::-webkit-scrollbar{display:none}
        .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
      `}</style>

      <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-[0_2px_20px_rgba(0,0,0,0.09)]" : "shadow-none border-b border-border"}`}>

        {/* ── Top Row ── */}
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-3 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href={"/"}>
          <div className="shrink-0">
            <img src="/logos/logo1.png" alt="Glowison" className="h-11 w-auto object-contain" />
          </div>
          </Link>

          {/* Desktop Search Bar */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden md:flex items-center gap-3 flex-1 max-w-md px-4 py-2.5 rounded-xl border border-border bg-bg-main hover:border-blue hover:shadow-[0_0_0_3px_rgba(71,87,146,0.08)] transition-all duration-200 cursor-text group"
          >
            <Search size={16} className="text-text-secondary group-hover:text-blue transition-colors shrink-0" />
            <span className="text-[13px] text-text-secondary font-medium flex-1 text-left">
              What are you looking for...
            </span>
            <span className="text-[11px] text-text-secondary border border-border rounded-md px-1.5 py-0.5 font-mono hidden lg:block">
              ⌘K
            </span>
          </button>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-4">
            <IconWithBadge href="/wishlist-items" icon={Heart}        count={wishCount} label="Wishlist" />
            <IconWithBadge href="/cart-items"     icon={ShoppingCart} count={cartCount} label="Cart"     />
          </div>

          {/* Mobile Right */}
          <div className="md:hidden flex items-center gap-3">
            <IconWithBadge href="/wishlist-items" icon={Heart} count={wishCount} label="" />
            <button onClick={() => setSidebarOpen(true)}
              className="w-9 h-9 rounded-xl bg-blue-dark flex items-center justify-center cursor-pointer"
            >
              <Menu size={18} className="text-white" />
            </button>
          </div>
        </div>

        {/* ── Desktop Nav ── */}
        <div className="hidden md:block border-t border-border/60">
          <nav className="max-w-7xl mx-auto px-8 py-3 flex items-center justify-center gap-7 flex-wrap">
            {NAV_ITEMS.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
          </nav>
        </div>
      </header>

      {/* Desktop Search Overlay */}
      <DesktopSearch open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}