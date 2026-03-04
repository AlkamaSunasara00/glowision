// FILE: src/app/components/AllProductsPage.jsx
"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Search,
  X,
  ChevronDown,
  SlidersHorizontal,
  LayoutGrid,
  List,
  ArrowUpDown,
} from "lucide-react";
import { PRODUCTS } from "@/app/data/productsData";
import ProductCard from "@/app/ui/cards/ProductCard";

// ── Derive categories directly from PRODUCTS data ─────────────────────────────
function getCategories() {
  const seen = new Map();
  PRODUCTS.forEach((p) => {
    if (!seen.has(p.categorySlug)) {
      seen.set(p.categorySlug, { slug: p.categorySlug, name: p.category });
    }
  });
  return Array.from(seen.values());
}

const CATEGORIES = getCategories();

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest First" },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function AllProductsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [gridCols, setGridCols] = useState(2);
  const [mobileSortOpen, setMobileSortOpen] = useState(false);

  const sortRef = useRef(null);
  const mobileSortRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target))
        setSortOpen(false);
      if (mobileSortRef.current && !mobileSortRef.current.contains(e.target))
        setMobileSortOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleCategoryChange = (slug) => {
    setActiveCategory(slug);
    setVisibleCount(12);
  };

  // ── Filter + sort ──────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = [...PRODUCTS];

    if (activeCategory !== "all")
      list = list.filter((p) => p.categorySlug === activeCategory);

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }

    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }
    return list;
  }, [activeCategory, search, sortBy]);

  const visible = filtered.slice(0, visibleCount);
  const hasFilters = activeCategory !== "all" || search.trim() !== "";
  const currentCatName = CATEGORIES.find(
    (c) => c.slug === activeCategory,
  )?.name;
  const activeSortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Playfair+Display:wght@600;700&display=swap');

        .ap-page * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        .ap-heading { font-family: 'Playfair Display', serif !important; }

        /* ── Grid ── */
        .ap-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 1280px) { .ap-grid { grid-template-columns: repeat(3, 1fr); gap: 18px; } }
        @media (max-width: 640px)  { .ap-grid { grid-template-columns: repeat(var(--cols, 2), 1fr); gap: 12px; } }

        /* ── Card animation ── */
        .ap-card { animation: ap-up 0.32s ease both; }
        @keyframes ap-up { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }

        /* ── Scrollbar hide ── */
        .ap-noscroll::-webkit-scrollbar { display: none; }
        .ap-noscroll { -ms-overflow-style: none; scrollbar-width: none; }

        /* ── Category chip ── */
        .ap-chip { transition: all 0.15s ease; cursor: pointer; -webkit-tap-highlight-color: transparent; }
        .ap-chip:active { transform: scale(0.96); }

        /* ── Sort dropdown ── */
        .ap-drop { animation: ap-dropin 0.15s ease both; }
        @keyframes ap-dropin { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }

        /* ── Search focus ── */
        .ap-search:focus-within {
          border-color: var(--color-blue) !important;
          box-shadow: 0 0 0 3px rgba(71,87,146,0.1);
        }

        /* ── Sidebar category active indicator ── */
        .ap-cat-item { transition: all 0.15s ease; cursor: pointer; }
        .ap-cat-item:hover { background: var(--color-blue-soft) !important; }

        /* ── Progress bar ── */
        .ap-progress { transition: width 0.5s ease; }

        /* ── Mobile sort sheet ── */
        .ap-sheet-bg {
          position: fixed; inset: 0; z-index: 55;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(2px);
          animation: ap-fadein 0.2s ease both;
        }
        .ap-sheet {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 56;
          background: var(--color-white);
          border-radius: 24px 24px 0 0;
          padding: 0 0 env(safe-area-inset-bottom, 16px);
          animation: ap-slideup 0.28s cubic-bezier(0.34,1.1,0.64,1) both;
        }
        @keyframes ap-fadein  { from{opacity:0}             to{opacity:1}             }
        @keyframesefs-slideup { from{transform:translateY(100%)} to{transform:translateY(0)} }
        @keyframes ap-slideup { from{transform:translateY(100%)} to{transform:translateY(0)} }
      `}</style>

      <div
        className="ap-page min-h-screen"
        style={{ background: "var(--color-bg-main)" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 md:py-8">
          {/* ── Breadcrumb ── */}
          <nav className="flex items-center gap-1.5 text-[13px] mb-5 flex-wrap">
            <Link
              href="/"
              className="transition-colors"
              style={{ color: "var(--color-text-secondary)" }}
              onMouseEnter={(e) => (e.target.style.color = "var(--color-blue)")}
              onMouseLeave={(e) =>
                (e.target.style.color = "var(--color-text-secondary)")
              }
            >
              Home
            </Link>
            <ChevronRight
              size={12}
              style={{ color: "var(--color-text-secondary)" }}
            />
            <span
              className="font-semibold"
              style={{ color: "var(--color-text-primary)" }}
            >
              All Products
            </span>
          </nav>

          {/* ── Page Title Row ── */}
          <div className="flex items-end justify-between gap-4 mb-7">
            <div>
              <h1
                className="ap-heading"
                style={{
                  fontSize: "clamp(22px,4vw,36px)",
                  fontWeight: 700,
                  color: "var(--color-blue-dark)",
                  lineHeight: 1.15,
                }}
              >
                {activeCategory === "all" ? (
                  <>
                    All{" "}
                    <span style={{ color: "var(--color-gold)" }}>Products</span>
                  </>
                ) : (
                  <>{currentCatName}</>
                )}
              </h1>
              <p
                className="text-[13px] mt-1"
                style={{ color: "var(--color-text-secondary)" }}
              >
                <span style={{ color: "var(--color-blue)", fontWeight: 700 }}>
                  {filtered.length}
                </span>{" "}
                item{filtered.length !== 1 ? "s" : ""} found
                {activeCategory !== "all"
                  ? ` in ${currentCatName}`
                  : " across all categories"}
              </p>
            </div>

            {/* Desktop sort */}
            <div className="hidden md:block relative shrink-0" ref={sortRef}>
              <button
                onClick={() => setSortOpen((o) => !o)}
                className="ap-chip flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold"
                style={{
                  background: "var(--color-white)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-primary)",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                <SlidersHorizontal
                  size={14}
                  style={{ color: "var(--color-text-secondary)" }}
                />
                {activeSortLabel}
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`}
                  style={{ color: "var(--color-text-secondary)" }}
                />
              </button>

              {sortOpen && (
                <div
                  className="ap-drop absolute right-0 top-[calc(100%+8px)] z-50 rounded-2xl overflow-hidden min-w-[200px]"
                  style={{
                    background: "var(--color-white)",
                    border: "1px solid var(--color-border)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.14)",
                  }}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setSortBy(opt.value);
                        setSortOpen(false);
                      }}
                      className="ap-cat-item w-full flex items-center justify-between px-4 py-3 text-[13px]"
                      style={{
                        background:
                          sortBy === opt.value
                            ? "var(--color-blue-soft)"
                            : "transparent",
                        color:
                          sortBy === opt.value
                            ? "var(--color-blue)"
                            : "var(--color-text-primary)",
                        fontWeight: sortBy === opt.value ? 700 : 400,
                        borderBottom: "1px solid var(--color-border)",
                      }}
                    >
                      {opt.label}
                      {sortBy === opt.value && (
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "var(--color-blue)",
                            display: "inline-block",
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Layout: Sidebar + Grid ── */}
          <div className="flex gap-6">
            {/* ════════════════════════════════════════
                DESKTOP SIDEBAR
                ════════════════════════════════════════ */}
            <aside className="hidden md:flex flex-col gap-4 w-56 shrink-0 self-start sticky top-24">
              {/* Search */}
              <div
                className="ap-search flex items-center gap-2.5 rounded-2xl px-3.5 py-3 transition-all"
                style={{
                  background: "var(--color-white)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                <Search
                  size={14}
                  style={{
                    color: "var(--color-text-secondary)",
                    flexShrink: 0,
                  }}
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setVisibleCount(12);
                  }}
                  className="flex-1 bg-transparent border-none outline-none text-[13px]"
                  style={{ color: "var(--color-text-primary)" }}
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="ap-chip shrink-0"
                  >
                    <X
                      size={13}
                      style={{ color: "var(--color-text-secondary)" }}
                    />
                  </button>
                )}
              </div>

              {/* Category list */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "var(--color-white)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between px-4 py-3"
                  style={{
                    borderBottom: "1px solid var(--color-border)",
                    background: "var(--color-bg-main)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "var(--color-text-secondary)",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Categories
                  </p>
                  <span
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      background: "var(--color-blue-soft)",
                      color: "var(--color-blue)",
                    }}
                  >
                    {CATEGORIES.length}
                  </span>
                </div>

                {/* All */}
                {[
                  { slug: "all", name: "All Products", count: PRODUCTS.length },
                  ...CATEGORIES.map((c) => ({
                    ...c,
                    count: PRODUCTS.filter((p) => p.categorySlug === c.slug)
                      .length,
                  })),
                ].map((cat) => {
                  const active = activeCategory === cat.slug;
                  return (
                    <button
                      key={cat.slug}
                      onClick={() => handleCategoryChange(cat.slug)}
                      className="ap-cat-item w-full flex items-center justify-between px-4 py-2.5 text-[13px] text-left"
                      style={{
                        background: active
                          ? "var(--color-blue-soft)"
                          : "transparent",
                        color: active
                          ? "var(--color-blue)"
                          : "var(--color-text-primary)",
                        fontWeight: active ? 700 : 400,
                        borderLeft: active
                          ? "3px solid var(--color-blue)"
                          : "3px solid transparent",
                        borderBottom: "1px solid var(--color-border)",
                      }}
                    >
                      <span className="truncate pr-2">{cat.name}</span>
                      <span
                        className="shrink-0 text-[11px] px-1.5 py-0.5 rounded-full font-semibold"
                        style={{
                          background: active
                            ? "var(--color-blue)"
                            : "var(--color-bg-main)",
                          color: active
                            ? "#fff"
                            : "var(--color-text-secondary)",
                        }}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Clear filters */}
              {hasFilters && (
                <button
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("all");
                    setVisibleCount(12);
                  }}
                  className="ap-chip w-full py-2.5 rounded-xl text-[13px] font-semibold transition-all"
                  style={{
                    background: "var(--color-gold-soft)",
                    color: "var(--color-blue-dark)",
                    border: "1px solid var(--color-gold)",
                  }}
                >
                  ✕ Clear Filters
                </button>
              )}
            </aside>

            {/* ════════════════════════════════════════
                RIGHT COLUMN
                ════════════════════════════════════════ */}
            <div className="flex-1 min-w-0">
              {/* ── Mobile top controls ── */}
              <div className="flex md:hidden items-center justify-between mb-3">
                {/* Sort button — LEFT */}
                <button
                  onClick={() => setMobileSortOpen(true)}
                  className="ap-chip flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[13px] font-semibold"
                  style={{
                    background:
                      sortBy !== "featured"
                        ? "var(--color-blue-dark)"
                        : "var(--color-white)",
                    color:
                      sortBy !== "featured"
                        ? "#fff"
                        : "var(--color-text-primary)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <ArrowUpDown size={14} />
                  Sort
                </button>

                {/* Grid toggle — RIGHT */}
                <button
                  onClick={() => setGridCols((c) => (c === 2 ? 1 : 2))}
                  className="ap-chip w-10 h-10 flex items-center justify-center rounded-xl"
                  style={{
                    background: "var(--color-white)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  {gridCols === 2 ? (
                    <List
                      size={16}
                      style={{ color: "var(--color-text-secondary)" }}
                    />
                  ) : (
                    <LayoutGrid
                      size={16}
                      style={{ color: "var(--color-text-secondary)" }}
                    />
                  )}
                </button>
              </div>

              {/* ── Mobile category pills ── */}
              <div className="flex md:hidden ap-noscroll gap-2 overflow-x-auto pb-3 mb-2">
                {[{ slug: "all", name: "All" }, ...CATEGORIES].map((cat) => {
                  const active = activeCategory === cat.slug;
                  return (
                    <button
                      key={cat.slug}
                      onClick={() => handleCategoryChange(cat.slug)}
                      className="ap-chip shrink-0 px-4 py-1.5 rounded-full text-[12px] font-semibold border"
                      style={{
                        background: active
                          ? "var(--color-blue-dark)"
                          : "var(--color-white)",
                        color: active ? "#fff" : "var(--color-text-primary)",
                        borderColor: active
                          ? "var(--color-blue-dark)"
                          : "var(--color-border)",
                        boxShadow: active
                          ? "0 3px 10px rgba(26,46,110,0.25)"
                          : "none",
                      }}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>

              {/* ── Active filter chips (desktop) ── */}
              {hasFilters && (
                <div className="hidden md:flex items-center gap-2 flex-wrap mb-4">
                  <span
                    className="text-[12px]"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Filters:
                  </span>
                  {activeCategory !== "all" && (
                    <span
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold"
                      style={{
                        background: "var(--color-blue-soft)",
                        color: "var(--color-blue)",
                        border: "1px solid var(--color-blue)",
                      }}
                    >
                      {currentCatName}
                      <button
                        onClick={() => handleCategoryChange("all")}
                        className="ap-chip"
                      >
                        <X size={10} />
                      </button>
                    </span>
                  )}
                  {search.trim() && (
                    <span
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold"
                      style={{
                        background: "var(--color-bg-main)",
                        color: "var(--color-text-primary)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      "{search}"
                      <button onClick={() => setSearch("")} className="ap-chip">
                        <X size={10} />
                      </button>
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setSearch("");
                      setActiveCategory("all");
                    }}
                    className="ap-chip text-[12px] font-semibold"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Clear all
                  </button>
                </div>
              )}

              {/* ── Product Grid ── */}
              {visible.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center py-24 rounded-3xl"
                  style={{
                    background: "var(--color-white)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                  <h3
                    className="ap-heading text-[22px] font-bold mb-2"
                    style={{ color: "var(--color-blue-dark)" }}
                  >
                    Nothing found
                  </h3>
                  <p
                    className="text-[14px] mb-6 text-center max-w-xs"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Try a different search term or browse a different category.
                  </p>
                  <button
                    onClick={() => {
                      setSearch("");
                      setActiveCategory("all");
                    }}
                    className="ap-chip px-7 py-2.5 rounded-full text-white text-[13px] font-bold"
                    style={{ background: "var(--color-blue-dark)" }}
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="ap-grid" style={{ "--cols": gridCols }}>
                  {visible.map((product, i) => (
                    <div
                      key={product.id}
                      className="ap-card"
                      style={{ animationDelay: `${(i % 12) * 0.04}s` }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              )}

              {/* ── Load More ── */}
              {visibleCount < filtered.length && (
                <div className="flex flex-col items-center gap-3 mt-12 mb-6">
                  {/* Progress bar */}
                  <div
                    className="w-52 h-1.5 rounded-full overflow-hidden"
                    style={{ background: "var(--color-border)" }}
                  >
                    <div
                      className="ap-progress h-full rounded-full"
                      style={{
                        width: `${(visibleCount / filtered.length) * 100}%`,
                        background: "var(--color-gold)",
                      }}
                    />
                  </div>
                  <p
                    className="text-[12px]"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Showing {Math.min(visibleCount, filtered.length)} of{" "}
                    {filtered.length}
                  </p>
                  <button
                    onClick={() => setVisibleCount((p) => p + 8)}
                    className="ap-chip inline-flex items-center gap-2.5 px-8 py-3 rounded-full text-white font-bold text-[14px]"
                    style={{
                      background: "var(--color-blue-dark)",
                      boxShadow: "0 8px 24px rgba(26,46,110,0.28)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "translateY(-2px)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "translateY(0)")
                    }
                  >
                    Load More
                    <span
                      className="text-[12px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(255,255,255,0.2)" }}
                    >
                      {filtered.length - visibleCount} left
                    </span>
                  </button>
                </div>
              )}

              {/* ── bottom padding so last card clears the TabBar on mobile ── */}
              <div className="h-24 md:h-0" />
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          MOBILE SORT BOTTOM SHEET
          — sits above TabBar (z-55/56), NOT a sticky bar
          ════════════════════════════════════════════════════ */}
      {mobileSortOpen && (
        <>
          {/* Backdrop */}
          <div
            className="ap-sheet-bg md:hidden"
            onClick={() => setMobileSortOpen(false)}
          />

          {/* Sheet */}
          <div className="ap-sheet md:hidden" ref={mobileSortRef}>
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div
                className="w-10 h-1 rounded-full"
                style={{ background: "var(--color-border)" }}
              />
            </div>

            {/* Title */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              <p
                className="ap-heading text-[17px] font-bold"
                style={{ color: "var(--color-blue-dark)" }}
              >
                Sort By
              </p>
              <button
                onClick={() => setMobileSortOpen(false)}
                className="ap-chip w-8 h-8 flex items-center justify-center rounded-full"
                style={{ background: "var(--color-bg-main)" }}
              >
                <X size={15} style={{ color: "var(--color-text-secondary)" }} />
              </button>
            </div>

            {/* Options */}
            <div className="px-4 py-3 pb-6">
              {SORT_OPTIONS.map((opt) => {
                const active = sortBy === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSortBy(opt.value);
                      setMobileSortOpen(false);
                    }}
                    className="ap-chip w-full flex items-center justify-between px-4 py-4 rounded-2xl mb-2 text-[14px] font-semibold"
                    style={{
                      background: active
                        ? "var(--color-blue-dark)"
                        : "var(--color-bg-main)",
                      color: active ? "#fff" : "var(--color-text-primary)",
                      border: active ? "none" : "1px solid var(--color-border)",
                    }}
                  >
                    {opt.label}
                    {active && (
                      <span
                        className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(255,255,255,0.2)" }}
                      >
                        Active
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
