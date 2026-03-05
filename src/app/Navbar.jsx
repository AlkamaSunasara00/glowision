// FILE: src/app/components/Navbar.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search, Heart, ShoppingCart, Menu, X,
  ChevronDown, TrendingUp, Clock, ArrowRight,
  Instagram, Facebook, Twitter, Phone, Mail, MapPin,
  Tag, Package, Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/app/data/categoriesData";
import { PRODUCTS }   from "@/app/data/productsData";

// ─────────────────────────────────────────────────────────────────────────────
// STATIC NAV LINKS
// ─────────────────────────────────────────────────────────────────────────────
const STATIC_NAV = [
  { label: "Best Sellers", href: "/products?sort=rating" },
  { label: "New Arrivals", href: "/products?sort=newest" },
  { label: "Custom Quote", href: "/quote"                },
  { label: "About Us",     href: "/about-us"             },
];

const FESTIVAL_TABS = [
  { label: "Eid Collection",    href: "/products?tag=eid"      },
  { label: "Ramadan Collection",href: "/products?tag=ramadan"  },
  { label: "Diwali Collection", href: "/products?tag=diwali"   },
  { label: "Featured Picks",    href: "/products?tag=featured" },
];

const FESTIVAL_NAV_ITEM = {
  label: "Festival Store",
  href: "/products?tag=eid",
  children: FESTIVAL_TABS,
};

const PRIMARY_NAV_LINKS = [STATIC_NAV[0], STATIC_NAV[1]];
const BOTTOM_NAV_LINKS  = [STATIC_NAV[2], STATIC_NAV[3]];

function buildNavItems() {
  return [
    ...PRIMARY_NAV_LINKS,
    FESTIVAL_NAV_ITEM,
    ...CATEGORIES.map((cat) => ({
      label:    cat.name,
      href:     `/${cat.slug}`,
      children: cat.subcategories.map((sub) => ({
        label: sub.name,
        href:  `/${cat.slug}/sub/${sub.slug}`,
      })),
    })),
    ...BOTTOM_NAV_LINKS,
  ];
}
const NAV_ITEMS = buildNavItems();

// ─────────────────────────────────────────────────────────────────────────────
// SEARCH DATA
// ─────────────────────────────────────────────────────────────────────────────
function buildAllSuggestions() {
  const list = [];
  CATEGORIES.forEach((cat) => {
    const count = PRODUCTS.filter((p) => p.category === cat.slug).length;
    list.push({ type: "category", label: cat.name, subtitle: `${count} product${count !== 1 ? "s" : ""}`, href: `/${cat.slug}`, image: null });
  });
  CATEGORIES.forEach((cat) => {
    cat.subcategories.forEach((sub) => {
      const count = PRODUCTS.filter((p) => p.category === cat.slug && p.subcategory === sub.slug).length;
      list.push({ type: "subcategory", label: sub.name, subtitle: `in ${cat.name} · ${count} item${count !== 1 ? "s" : ""}`, href: `/${cat.slug}/sub/${sub.slug}`, image: null });
    });
  });
  PRODUCTS.forEach((p) => {
    const mrp   = p.dimensions[0]?.mrp || 0;
    const price = Math.round(mrp * (1 - p.discount / 100));
    list.push({ type: "product", label: p.title, subtitle: `₹${price.toLocaleString()} · ${p.category.replace(/-/g, " ")}`, href: `/${p.category}/${p.slug}`, image: p.images.flatMap((e) => e.images)[0] || null });
  });
  return list;
}

const ALL_SUGGESTIONS = buildAllSuggestions();

const TRENDING_CHIPS = [
  ...CATEGORIES.map((c) => ({ label: c.name, href: `/${c.slug}` })),
  ...CATEGORIES.flatMap((c) => c.subcategories.slice(0, 1).map((s) => ({ label: s.name, href: `/${c.slug}/sub/${s.slug}` }))),
].slice(0, 6);

function isHrefActive(href, pathname, searchParams) {
  const [basePathRaw, query] = href.split("?");
  const basePath    = basePathRaw && basePathRaw.length > 1 && basePathRaw.endsWith("/") ? basePathRaw.slice(0, -1) : basePathRaw;
  const currentPath = pathname && pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const pathMatches = basePath === "/" ? currentPath === "/" : currentPath === basePath || currentPath.startsWith(`${basePath}/`);
  if (!pathMatches) return false;
  if (!query) return true;
  const expected = new URLSearchParams(query);
  for (const [key, value] of expected.entries()) {
    if ((searchParams?.get(key) || "") !== value) return false;
  }
  return true;
}

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
          ? <span key={i} style={{ color: "var(--color-gold)", fontWeight: 700 }}>{p}</span>
          : <span key={i}>{p}</span>
      )}
    </>
  );
}

function SuggestionIcon({ item }) {
  if (item.type === "product") {
    return (
      <div style={{ width: 38, height: 38, borderRadius: 8, overflow: "hidden", flexShrink: 0, background: "var(--color-bg-main)", border: "1px solid var(--color-border)" }}>
        {item.image
          ? <img src={item.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <Package size={16} style={{ margin: "11px auto 0", color: "var(--color-text-secondary)", display: "block" }} />
        }
      </div>
    );
  }
  if (item.type === "category") {
    return (
      <div style={{ width: 38, height: 38, borderRadius: 8, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-blue-soft)", border: "1px solid var(--color-blue)" }}>
        <Tag size={14} style={{ color: "var(--color-blue)" }} />
      </div>
    );
  }
  return (
    <div style={{ width: 38, height: 38, borderRadius: 8, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-gold-soft)", border: "1px solid var(--color-gold)" }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-gold)" }} />
    </div>
  );
}

const TYPE_BADGE = {
  category:    { bg: "#e0e7ff", color: "#3730a3", label: "Category"    },
  subcategory: { bg: "#fef3c7", color: "#92400e", label: "Subcategory" },
  product:     { bg: "#f1f5f9", color: "#64748b", label: "Product"     },
};

// ─────────────────────────────────────────────────────────────────────────────
// ICON WITH BADGE
// ─────────────────────────────────────────────────────────────────────────────
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
      {label && (
        <span className="text-[10px] font-semibold text-text-secondary group-hover:text-blue transition-colors duration-200 tracking-wide">
          {label}
        </span>
      )}
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DROPDOWN SUBCATEGORY ROW ICON — no more AI blue dot
// Each subcategory gets a clean 2-letter monogram chip
// ─────────────────────────────────────────────────────────────────────────────
function SubcategoryChip({ label }) {
  // Pick the initials from the label, max 2 chars
  const initials = label
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 9,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--color-bg-main)",
        border: "1.5px solid var(--color-border)",
        fontSize: 10,
        fontWeight: 700,
        color: "var(--color-blue-dark)",
        letterSpacing: "0.04em",
        userSelect: "none",
      }}
    >
      {initials}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DROPDOWN (desktop nav)
// ─────────────────────────────────────────────────────────────────────────────
function Dropdown({ item, pathname, searchParams }) {
  const headerActive = isHrefActive(item.href, pathname, searchParams);
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50 min-w-[260px]">
      <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-border rotate-45 z-10" />
      <div className="bg-white border border-border rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden">
        {/* Header */}
        <Link
          href={item.href}
          className={`flex items-center justify-between px-4 py-3 border-b border-border group/hdr transition-all ${
            headerActive ? "bg-blue-soft" : "bg-gradient-to-r from-blue-soft to-white hover:from-blue-soft hover:to-blue-soft"
          }`}
        >
          <p className="text-[10px] font-bold text-blue uppercase tracking-[1px]">Browse {item.label}</p>
          <ArrowRight size={11} className="text-blue opacity-0 group-hover/hdr:opacity-100 transition-opacity" />
        </Link>

        {/* Subcategory rows */}
        {item.children.map((child, i) => {
          const childActive = isHrefActive(child.href, pathname, searchParams);
          return (
            <Link
              key={child.label}
              href={child.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 transition-all duration-150 group/item ${
                childActive ? "bg-blue-soft" : "hover:bg-blue-soft"
              }`}
              style={{ borderBottom: i < item.children.length - 1 ? "1px solid #f1f5f9" : "none" }}
            >
              <SubcategoryChip label={child.label} />
              <p className="flex-1 text-[13px] font-semibold text-text-primary group-hover/item:text-blue transition-colors">
                {child.label}
              </p>
              <ArrowRight
                size={13}
                className="text-text-secondary opacity-0 group-hover/item:opacity-100 -translate-x-1 group-hover/item:translate-x-0 transition-all duration-200"
              />
            </Link>
          );
        })}

        {/* View all footer */}
        <Link
          href={item.href}
          className={`flex items-center justify-center gap-1.5 px-4 py-2.5 transition-all duration-200 group/all ${
            headerActive ? "bg-blue text-white" : "bg-blue-soft hover:bg-blue"
          }`}
        >
          <span className="text-[12px] font-bold group-hover/all:text-white transition-colors">
            View all {item.label}
          </span>
          <ArrowRight size={11} className="text-blue group-hover/all:text-white transition-colors" />
        </Link>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NAV ITEM
// ─────────────────────────────────────────────────────────────────────────────
function NavItem({ item, pathname, searchParams }) {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const enter = () => { clearTimeout(timer.current); setOpen(true); };
  const leave = () => { timer.current = setTimeout(() => setOpen(false), 120); };
  const active =
    isHrefActive(item.href, pathname, searchParams) ||
    (item.children || []).some((child) => isHrefActive(child.href, pathname, searchParams));

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className={`relative text-[13px] font-medium transition-colors duration-200 py-1 group ${
          active ? "text-blue" : "text-text-secondary hover:text-blue"
        }`}
      >
        {item.label}
        <span className={`absolute -bottom-1 left-0 h-[2px] bg-gold transition-all duration-300 rounded-full ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
      </Link>
    );
  }
  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button className={`flex items-center gap-1 text-[13px] font-medium transition-colors duration-200 py-1 cursor-pointer ${active ? "text-blue" : "text-text-secondary hover:text-blue"}`}>
        {item.label}
        <ChevronDown size={13} className={`transition-transform duration-300 ${(open || active) ? "rotate-180 text-blue" : ""}`} />
      </button>
      {open && <Dropdown item={item} pathname={pathname} searchParams={searchParams} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP SEARCH — dropdown anchored to search bar, same width, blurred backdrop
// ─────────────────────────────────────────────────────────────────────────────
function DesktopSearch({ open, onClose, triggerRef }) {
  const router   = useRouter();
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const [query,  setQuery]  = useState("");
  const [recent, setRecent] = useState([]);
  const [pos,    setPos]    = useState({ left: 0, top: 0, width: 0 });

  // Position dropdown under the trigger
  useEffect(() => {
    if (open && triggerRef?.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPos({ left: rect.left, top: rect.bottom + 8, width: rect.width });
      setTimeout(() => inputRef.current?.focus(), 60);
      try { setRecent(JSON.parse(localStorage.getItem("glowison_searches") || "[]")); }
      catch { setRecent([]); }
    } else {
      setTimeout(() => setQuery(""), 200);
    }
  }, [open, triggerRef]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handler(e) {
      if (
        panelRef.current && !panelRef.current.contains(e.target) &&
        triggerRef?.current && !triggerRef.current.contains(e.target)
      ) onClose();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose, triggerRef]);

  const results = query.trim()
    ? ALL_SUGGESTIONS.filter((s) => s.label.toLowerCase().includes(query.toLowerCase())).slice(0, 9)
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

  if (!open) return null;

  return (
    <>
      <style>{`
        @keyframes srDropDown { from { transform:translateY(-6px); opacity:0 } to { transform:translateY(0); opacity:1 } }
        .sr-row { display:flex; align-items:center; gap:12px; padding:9px 12px; border-radius:12px; cursor:pointer; transition:background 0.15s; }
        .sr-row:hover { background: var(--color-blue-soft); }
        .sr-label { font-size:10px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:var(--color-text-secondary); padding:10px 12px 4px; }
      `}</style>

      {/* Blurred backdrop — doesn't cover the search bar area */}
      <div
        className="fixed inset-0 z-[79]"
        style={{ backdropFilter: "blur(4px)", background: "rgba(0,0,0,0.18)" }}
        onClick={onClose}
      />

      {/* Dropdown panel — positioned under trigger */}
      <div
        ref={panelRef}
        style={{
          position: "fixed",
          left: pos.left,
          top: pos.top,
          width: pos.width,
          zIndex: 80,
          background: "#fff",
          border: "1px solid var(--color-border)",
          borderRadius: 18,
          boxShadow: "0 12px 48px rgba(0,0,0,0.16)",
          animation: "srDropDown 0.2s ease forwards",
          overflow: "hidden",
        }}
      >
        {/* Inline search input inside dropdown */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 16px",
            borderBottom: "1px solid var(--color-border)",
            background: "var(--color-bg-main)",
          }}
        >
          <Search size={16} style={{ color: "var(--color-text-secondary)", flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && results[0]) navigate(results[0]);
              if (e.key === "Escape") onClose();
            }}
            placeholder="Search categories, products..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: 14,
              color: "var(--color-text-primary)",
              fontFamily: "inherit",
            }}
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              style={{ width: 22, height: 22, borderRadius: "50%", background: "#e5e7eb", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
            >
              <X size={11} />
            </button>
          ) : (
            <span style={{ fontSize: 11, color: "var(--color-text-secondary)", border: "1px solid var(--color-border)", borderRadius: 5, padding: "2px 6px", fontFamily: "monospace", flexShrink: 0 }}>
              esc
            </span>
          )}
        </div>

        {/* Results */}
        <div style={{ maxHeight: "60vh", overflowY: "auto", padding: "6px 8px 10px", scrollbarWidth: "none" }}>
          {query.trim() ? (
            results.length === 0 ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <p style={{ fontSize: 30, marginBottom: 8 }}>🔍</p>
                <p style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
                  No results for "<strong style={{ color: "var(--color-text-primary)" }}>{query}</strong>"
                </p>
                <Link href="/products" onClick={onClose}
                  style={{ display: "inline-block", marginTop: 10, fontSize: 12, fontWeight: 700, color: "var(--color-blue)" }}>
                  Browse all products →
                </Link>
              </div>
            ) : (
              <>
                {cats.length > 0 && (
                  <>
                    <p className="sr-label">Categories</p>
                    {cats.map((item) => (
                      <div key={item.href} className="sr-row" onClick={() => navigate(item)}>
                        <SuggestionIcon item={item} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)", lineHeight: 1.3 }}>
                            <Highlight text={item.label} query={query} />
                          </p>
                          <p style={{ fontSize: 11, color: "var(--color-text-secondary)", marginTop: 2 }}>{item.subtitle}</p>
                        </div>
                        <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999, flexShrink: 0, background: TYPE_BADGE.category.bg, color: TYPE_BADGE.category.color }}>
                          Category
                        </span>
                        <ArrowRight size={13} style={{ color: "var(--color-text-secondary)", flexShrink: 0 }} />
                      </div>
                    ))}
                  </>
                )}
                {subs.length > 0 && (
                  <>
                    <p className="sr-label">Subcategories</p>
                    {subs.map((item) => (
                      <div key={item.href} className="sr-row" onClick={() => navigate(item)}>
                        <SuggestionIcon item={item} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)", lineHeight: 1.3 }}>
                            <Highlight text={item.label} query={query} />
                          </p>
                          <p style={{ fontSize: 11, color: "var(--color-text-secondary)", marginTop: 2 }}>{item.subtitle}</p>
                        </div>
                        <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999, flexShrink: 0, background: TYPE_BADGE.subcategory.bg, color: TYPE_BADGE.subcategory.color }}>
                          Subcategory
                        </span>
                        <ArrowRight size={13} style={{ color: "var(--color-text-secondary)", flexShrink: 0 }} />
                      </div>
                    ))}
                  </>
                )}
                {prods.length > 0 && (
                  <>
                    <p className="sr-label">Products</p>
                    {prods.map((item) => (
                      <div key={item.href} className="sr-row" onClick={() => navigate(item)}>
                        <SuggestionIcon item={item} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)", lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            <Highlight text={item.label} query={query} />
                          </p>
                          <p style={{ fontSize: 11, color: "var(--color-text-secondary)", marginTop: 2, textTransform: "capitalize" }}>{item.subtitle}</p>
                        </div>
                        <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999, flexShrink: 0, background: TYPE_BADGE.product.bg, color: TYPE_BADGE.product.color }}>
                          Product
                        </span>
                        <ArrowRight size={13} style={{ color: "var(--color-text-secondary)", flexShrink: 0 }} />
                      </div>
                    ))}
                  </>
                )}
              </>
            )
          ) : (
            /* Default: Recent + Trending */
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, paddingTop: 4 }}>
              {/* Recent */}
              <div>
                {recent.length > 0 ? (
                  <>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 4px 6px" }}>
                      <p className="sr-label" style={{ padding: 0 }}>Recent</p>
                      <button
                        onClick={() => { setRecent([]); localStorage.removeItem("glowison_searches"); }}
                        style={{ fontSize: 11, fontWeight: 600, color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}
                      >
                        Clear
                      </button>
                    </div>
                    {recent.map((item) => (
                      <div key={item.href} className="sr-row" onClick={() => { router.push(item.href); onClose(); }}>
                        <Clock size={13} style={{ color: "var(--color-text-secondary)", flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {item.label}
                          </p>
                          <p style={{ fontSize: 10, color: "var(--color-text-secondary)", textTransform: "capitalize", marginTop: 1 }}>
                            {item.type}
                          </p>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div style={{ padding: "20px 12px", textAlign: "center" }}>
                    <Clock size={20} style={{ color: "var(--color-border)", margin: "0 auto 6px", display: "block" }} />
                    <p style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>No recent searches</p>
                  </div>
                )}
              </div>

              {/* Trending */}
              <div>
                <p className="sr-label" style={{ paddingLeft: 4, paddingBottom: 8 }}>Trending</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, paddingLeft: 4 }}>
                  {TRENDING_CHIPS.map((t) => (
                    <button
                      key={t.href}
                      onClick={() => { router.push(t.href); onClose(); }}
                      style={{
                        display: "flex", alignItems: "center", gap: 5,
                        padding: "5px 11px", borderRadius: 999, cursor: "pointer",
                        background: "var(--color-bg-main)", border: "1px solid var(--color-border)",
                        fontSize: 12, fontWeight: 600, color: "var(--color-text-secondary)",
                        transition: "all 0.15s", fontFamily: "inherit",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-blue)"; e.currentTarget.style.color = "var(--color-blue)"; e.currentTarget.style.background = "var(--color-blue-soft)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.color = "var(--color-text-secondary)"; e.currentTarget.style.background = "var(--color-bg-main)"; }}
                    >
                      <TrendingUp size={10} style={{ color: "var(--color-gold)" }} />
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SIDEBAR (mobile) — unchanged
// ─────────────────────────────────────────────────────────────────────────────
function Sidebar({ open, onClose, pathname, searchParams }) {
  const [expanded, setExpanded] = useState(null);

  useEffect(() => { if (!open) setExpanded(null); }, [open]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {open && <div className="fixed inset-0 z-[70] bg-black/45 backdrop-blur-sm" onClick={onClose} />}
      <div className={`fixed left-0 top-0 h-full w-full bg-white z-[71] flex flex-col transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <Link href="/" onClick={onClose}>
            <img src="/logos/logo1.png" alt="Glowison" className="h-10" />
          </Link>
          <button onClick={onClose} className="w-9 h-9 rounded-[10px] bg-blue-dark flex items-center justify-center cursor-pointer border-none">
            <X size={18} color="white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-bg-main [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {PRIMARY_NAV_LINKS.map((item) => {
            const active = isHrefActive(item.href, pathname, searchParams);
            return (
              <Link key={item.label} href={item.href} onClick={onClose}
                className={`flex items-center justify-between px-4 py-3.5 mb-2.5 rounded-[14px] font-semibold text-[14px] no-underline transition-colors ${active ? "bg-blue-dark text-white" : "bg-white text-blue-dark hover:bg-blue-soft"}`}
                style={{ border: "1.5px solid var(--color-border)" }}>
                {item.label}
                <ArrowRight size={14} className={active ? "text-white" : "text-text-secondary"} />
              </Link>
            );
          })}

          <div className="mb-2.5 rounded-[14px] border border-border bg-white p-3">
            <div className="mb-2 flex items-center gap-2 px-1">
              <Sparkles size={13} className="text-gold" />
              <p className="text-[11px] font-bold uppercase tracking-[1px] text-text-secondary">Festival Store</p>
            </div>
            <div className="space-y-1.5">
              {FESTIVAL_TABS.map((item) => {
                const active = isHrefActive(item.href, pathname, searchParams);
                return (
                  <Link key={item.href} href={item.href} onClick={onClose}
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-[13px] font-semibold no-underline transition-colors ${active ? "bg-blue-dark text-white" : "bg-bg-main text-blue-dark hover:bg-blue-soft"}`}>
                    {item.label}
                    <ArrowRight size={13} className={active ? "text-white" : "text-text-secondary"} />
                  </Link>
                );
              })}
            </div>
          </div>

          {CATEGORIES.map((cat) => {
            const categoryActive =
              isHrefActive(`/${cat.slug}`, pathname, searchParams) ||
              cat.subcategories.some((sub) => isHrefActive(`/${cat.slug}/sub/${sub.slug}`, pathname, searchParams));
            return (
              <div key={cat.slug} className="mb-2.5">
                <button
                  onClick={() => setExpanded(expanded === cat.slug ? null : cat.slug)}
                  className="w-full px-4 py-3.5 rounded-[14px] font-semibold text-[14px] flex items-center justify-between cursor-pointer transition-all duration-200"
                  style={{
                    border:     expanded === cat.slug || categoryActive ? "1.5px solid var(--color-blue-dark)" : "1.5px solid var(--color-border)",
                    background: expanded === cat.slug || categoryActive ? "var(--color-blue-dark)" : "var(--color-white)",
                    color:      expanded === cat.slug || categoryActive ? "#fff" : "var(--color-blue-dark)",
                  }}>
                  {cat.name}
                  <ChevronDown size={16} style={{ color: expanded === cat.slug || categoryActive ? "#fff" : "var(--color-blue)", transform: expanded === cat.slug ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }} />
                </button>
                <div className="overflow-hidden transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{ maxHeight: expanded === cat.slug ? cat.subcategories.length * 60 + 60 : 0 }}>
                  <div className="mt-2 rounded-xl border border-border bg-white overflow-hidden">
                    <Link href={`/${cat.slug}`} onClick={onClose}
                      className={`flex items-center gap-3 px-3.5 py-3 border-b border-border transition-colors no-underline ${isHrefActive(`/${cat.slug}`, pathname, searchParams) ? "bg-blue-soft" : "hover:bg-blue-soft"}`}>
                      <div className="w-[26px] h-[26px] rounded-lg bg-blue flex items-center justify-center shrink-0">
                        <ArrowRight size={12} color="white" />
                      </div>
                      <span className="text-[13px] font-bold text-blue">View all {cat.name}</span>
                    </Link>
                    {cat.subcategories.map((sub) => (
                      <Link key={sub.slug} href={`/${cat.slug}/sub/${sub.slug}`} onClick={onClose}
                        className={`flex items-center gap-3 px-3.5 py-3 border-b border-border last:border-b-0 transition-colors no-underline ${isHrefActive(`/${cat.slug}/sub/${sub.slug}`, pathname, searchParams) ? "bg-blue-soft" : "hover:bg-blue-soft"}`}>
                        <div className="w-[26px] h-[26px] rounded-lg bg-gold-soft border border-gold flex items-center justify-center shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                        </div>
                        <span className="text-[13px] font-semibold text-blue-dark">{sub.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {BOTTOM_NAV_LINKS.map((item) => {
            const active = isHrefActive(item.href, pathname, searchParams);
            return (
              <Link key={item.label} href={item.href} onClick={onClose}
                className={`flex items-center justify-between px-4 py-3.5 mb-2.5 rounded-[14px] font-semibold text-[14px] no-underline transition-colors ${active ? "bg-blue-dark text-white" : "bg-white text-blue-dark hover:bg-blue-soft"}`}
                style={{ border: "1.5px solid var(--color-border)" }}>
                {item.label}
                <ArrowRight size={14} className={active ? "text-white" : "text-text-secondary"} />
              </Link>
            );
          })}
        </div>

        <div className="px-4 py-4 border-t border-border bg-white">
          <p className="text-[10px] font-bold text-text-secondary uppercase tracking-[1px] mb-3">Contact Us</p>
          {[
            { icon: Phone,  text: "+91 99787 50622",       color: "#16a34a"                },
            { icon: Mail,   text: "hello@glowison.com",    color: "var(--color-blue-dark)" },
            { icon: MapPin, text: "Surat, Gujarat, India", color: "#dc2626"                },
          ].map(({ icon: Icon, text, color }) => (
            <div key={text} className="flex items-center gap-2.5 mb-2.5 last:mb-0">
              <div className="w-[30px] h-[30px] rounded-lg flex items-center justify-center shrink-0" style={{ background: color + "18", border: `1px solid ${color}35` }}>
                <Icon size={14} style={{ color }} />
              </div>
              <span className="text-[12px] text-text-secondary font-medium">{text}</span>
            </div>
          ))}
        </div>

        <div className="px-4 pt-4 pb-6 border-t border-border bg-white">
          <p className="text-[10px] font-bold text-text-secondary uppercase tracking-[1px] mb-2.5">Follow Us</p>
          <div className="flex gap-2.5">
            {[
              { icon: Instagram, color: "#E1306C" },
              { icon: Facebook,  color: "#1877F2" },
              { icon: Twitter,   color: "#1DA1F2" },
            ].map(({ icon: Icon, color }, i) => (
              <button key={i} className="flex-1 py-2.5 rounded-[14px] bg-blue-soft border border-border flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200">
                <Icon size={18} style={{ color }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN NAVBAR
// ─────────────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const pathname     = usePathname();
  const searchParams = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [cartCount,   setCartCount]   = useState(0);
  const [wishCount,   setWishCount]   = useState(0);
  const [scrolled,    setScrolled]    = useState(false);

  // Ref for the search trigger button — passed to DesktopSearch for positioning
  const searchTriggerRef = useRef(null);

  useEffect(() => {
    const read = () => {
      const cart = JSON.parse(localStorage.getItem("glowison_cart")     || "[]");
      const wish = JSON.parse(localStorage.getItem("glowison_wishlist") || "[]");
      setCartCount(cart.reduce((s, i) => s + (i.qty || 1), 0));
      setWishCount(wish.length);
    };
    read();
    window.addEventListener("cartUpdate",     read);
    window.addEventListener("wishlistUpdate", read);
    window.addEventListener("storage",        read);
    return () => {
      window.removeEventListener("cartUpdate",     read);
      window.removeEventListener("wishlistUpdate", read);
      window.removeEventListener("storage",        read);
    };
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
      if (e.key === "Escape") setSearchOpen(false);
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');`}</style>

      <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-[0_2px_20px_rgba(0,0,0,0.09)]" : "border-b border-border"}`}>

        {/* Top Row */}
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="shrink-0">
            <img src="/logos/logo1.png" alt="Glowison" className="h-11 w-auto object-contain" />
          </Link>

          {/* Search trigger — desktop */}
          <button
            ref={searchTriggerRef}
            onClick={() => setSearchOpen(true)}
            className="hidden md:flex items-center gap-3 flex-1 max-w-[50%] px-4 py-2.5 rounded-xl border border-border bg-bg-main hover:border-blue hover:shadow-[0_0_0_3px_rgba(71,87,146,0.08)] transition-all duration-200 cursor-text group"
          >
            <Search size={16} className="text-text-secondary group-hover:text-blue transition-colors shrink-0" />
            <span className="text-[13px] text-text-secondary font-medium flex-1 text-left">
              Search categories, products...
            </span>
            <span className="text-[11px] text-text-secondary border border-border rounded-md px-1.5 py-0.5 font-mono hidden lg:block">⌘K</span>
          </button>

          {/* Desktop icons */}
          <div className="hidden md:flex items-center gap-4">
            <IconWithBadge href="/wishlist-items" icon={Heart}        count={wishCount} label="Wishlist" />
            <IconWithBadge href="/cart-items"     icon={ShoppingCart} count={cartCount} label="Cart"     />
          </div>

          {/* Mobile right */}
          <div className="md:hidden flex items-center gap-2.5">
            <IconWithBadge href="/wishlist-items" icon={Heart} count={wishCount} label="" />
            <button onClick={() => setSidebarOpen(true)}
              className="w-9 h-9 rounded-xl bg-blue-dark flex items-center justify-center cursor-pointer">
              <Menu size={18} className="text-white" />
            </button>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:block border-t border-border/60">
          <nav className="max-w-7xl mx-auto px-8 py-3 flex items-center justify-center gap-7 flex-wrap">
            {NAV_ITEMS.map((item) => (
              <NavItem key={item.label} item={item} pathname={pathname} searchParams={searchParams} />
            ))}
          </nav>
        </div>
      </header>

      <DesktopSearch
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        triggerRef={searchTriggerRef}
      />
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        pathname={pathname}
        searchParams={searchParams}
      />
    </>
  );
}