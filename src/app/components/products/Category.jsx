// FILE: src/app/components/products/Category.jsx
"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Search,
  X,
  SlidersHorizontal,
  ChevronDown,
  ArrowUpDown,
  LayoutGrid,
  List,
} from "lucide-react";
import { PRODUCTS } from "@/app/data/productsData";
import ProductCard from "@/app/ui/cards/ProductCard";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest First" },
];

// ── Hero ──────────────────────────────────────────────────────────────────────
function CategoryHero({ categoryName, total }) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl mb-7"
      style={{
        background:
          "linear-gradient(135deg, var(--color-blue-dark) 0%, #253573 55%, #1a2e6e 100%)",
        padding: "clamp(28px,5vw,52px)",
        minHeight: "clamp(150px,20vw,210px)",
      }}
    >
      {/* Gold top line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background:
            "linear-gradient(90deg,transparent,var(--color-gold),transparent)",
        }}
      />

      {/* Decorative blobs */}
      <div
        style={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.04)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -30,
          right: 100,
          width: 130,
          height: 130,
          borderRadius: "50%",
          background: "rgba(242,180,97,0.07)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "30%",
          right: "18%",
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "rgba(242,180,97,0.1)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(242,180,97,0.15)",
            border: "1px solid rgba(242,180,97,0.35)",
            borderRadius: "999px",
            padding: "5px 14px",
            marginBottom: 14,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--color-gold)",
            }}
          />
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "var(--color-gold)",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            {total} Products
          </span>
        </div>

        <h1
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "clamp(22px,4vw,38px)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.15,
            marginBottom: 10,
          }}
        >
          {categoryName}
        </h1>
        <p
          style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.6)",
            maxWidth: 440,
            lineHeight: 1.6,
          }}
        >
          Explore our handcrafted {categoryName.toLowerCase()} collection — each
          piece made with precision and care.
        </p>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function CategoryPage({ categorySlug }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [mobileSortOpen, setMobileSortOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [gridCols, setGridCols] = useState(2);

  const sortRef = useRef(null);
  const mobileSortRef = useRef(null);

  useEffect(() => {
    const h = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target))
        setSortOpen(false);
      if (mobileSortRef.current && !mobileSortRef.current.contains(e.target))
        setMobileSortOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // Derive name from products (works even without CATEGORIES import)
  const categoryProducts = PRODUCTS.filter((p) => p.category === categorySlug);
  const categoryName =
    categoryProducts[0]?.category ||
    categorySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const filtered = useMemo(() => {
    let list = [...categoryProducts];
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
  }, [categorySlug, search, sortBy]);

  const visible = filtered.slice(0, visibleCount);
  const hasFilters = search.trim() !== "";
  const activeSortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Playfair+Display:wght@600;700&display=swap');

        .cp-page * { font-family:'DM Sans',sans-serif; box-sizing:border-box; }
        .cp-heading { font-family:'Playfair Display',serif !important; }

        .cp-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width:1280px) { .cp-grid { grid-template-columns:repeat(3,1fr); gap:18px; } }
        @media (max-width:640px)  { .cp-grid { grid-template-columns:repeat(var(--cols,2),1fr); gap:12px; } }

        .cp-card { animation: cp-up 0.3s ease both; }
        @keyframes cp-up { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }

        .cp-noscroll::-webkit-scrollbar { display:none; }
        .cp-noscroll { -ms-overflow-style:none; scrollbar-width:none; }

        .cp-chip { transition:all 0.15s ease; cursor:pointer; -webkit-tap-highlight-color:transparent; }
        .cp-chip:active { transform:scale(0.96); }

        .cp-search:focus-within {
          border-color: var(--color-blue) !important;
          box-shadow: 0 0 0 3px rgba(71,87,146,0.1);
        }

        .cp-drop { animation:cp-dropin 0.15s ease both; }
        @keyframes cp-dropin { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }

        .cp-sort-row { transition: background 0.15s ease; }
        .cp-sort-row:hover { background: var(--color-blue-soft) !important; }

        .cp-sheet-bg {
          position:fixed; inset:0; z-index:55;
          background:rgba(0,0,0,0.45);
          backdrop-filter:blur(2px);
          animation:cp-fadein 0.2s ease both;
        }
        .cp-sheet {
          position:fixed; bottom:0; left:0; right:0; z-index:56;
          background:var(--color-white);
          border-radius:24px 24px 0 0;
          animation:cp-slideup 0.28s cubic-bezier(0.34,1.1,0.64,1) both;
        }
        @keyframes cp-fadein  { from{opacity:0} to{opacity:1} }
        @keyframes cp-slideup { from{transform:translateY(100%)} to{transform:translateY(0)} }
      `}</style>

      <div
        className="cp-page min-h-screen"
        style={{ background: "var(--color-bg-main)" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-5 pb-8 md:pt-8">
          {/* ── Breadcrumb ── */}
          <nav className="flex items-center gap-1.5 text-[13px] mb-6 flex-wrap">
            <Link
              href="/"
              className="transition-colors"
              style={{ color: "var(--color-text-secondary)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-blue)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-text-secondary)")
              }
            >
              Home
            </Link>
            <ChevronRight
              size={12}
              style={{ color: "var(--color-text-secondary)" }}
            />
            <Link
              href="/products"
              className="transition-colors"
              style={{ color: "var(--color-text-secondary)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-blue)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-text-secondary)")
              }
            >
              All Products
            </Link>
            <ChevronRight
              size={12}
              style={{ color: "var(--color-text-secondary)" }}
            />
            <span
              className="font-semibold capitalize"
              style={{ color: "var(--color-text-primary)" }}
            >
              {categoryName}
            </span>
          </nav>

          {/* ── Hero ── */}
          <CategoryHero
            categoryName={categoryName}
            total={categoryProducts.length}
          />

          {/* ── Page title row ── */}
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <h2
                className="cp-heading"
                style={{
                  fontSize: "clamp(20px,3vw,28px)",
                  fontWeight: 700,
                  color: "var(--color-blue-dark)",
                  lineHeight: 1.15,
                }}
              >
                {categoryName}
              </h2>
              <p
                className="text-[13px] mt-1"
                style={{ color: "var(--color-text-secondary)" }}
              >
                <span style={{ color: "var(--color-blue)", fontWeight: 700 }}>
                  {filtered.length}
                </span>{" "}
                item{filtered.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {/* Desktop sort */}
            <div className="hidden md:block relative shrink-0" ref={sortRef}>
              <button
                onClick={() => setSortOpen((o) => !o)}
                className="cp-chip flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold"
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
                  className="cp-drop absolute right-0 top-[calc(100%+8px)] z-50 rounded-2xl overflow-hidden min-w-[200px]"
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
                      className="cp-sort-row w-full flex items-center justify-between px-4 py-3 text-[13px]"
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

          {/* ── Mobile controls ── */}
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
                  sortBy !== "featured" ? "#fff" : "var(--color-text-primary)",
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

          {/* ── Desktop search + filter chips ── */}
          <div className="hidden md:flex items-center gap-3 mb-5">
            <div
              className="cp-search flex items-center gap-2.5 rounded-2xl px-3.5 py-3 transition-all flex-1 max-w-sm"
              style={{
                background: "var(--color-white)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <Search
                size={14}
                style={{ color: "var(--color-text-secondary)", flexShrink: 0 }}
              />
              <input
                type="text"
                placeholder={`Search in ${categoryName}...`}
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
                  className="cp-chip shrink-0"
                >
                  <X
                    size={13}
                    style={{ color: "var(--color-text-secondary)" }}
                  />
                </button>
              )}
            </div>

            {/* Active filter chip */}
            {hasFilters && (
              <div className="flex items-center gap-2">
                <span
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold"
                  style={{
                    background: "var(--color-blue-soft)",
                    color: "var(--color-blue)",
                    border: "1px solid var(--color-blue)",
                  }}
                >
                  "{search}"
                  <button onClick={() => setSearch("")} className="cp-chip">
                    <X size={10} />
                  </button>
                </span>
                <button
                  onClick={() => setSearch("")}
                  className="cp-chip text-[12px] font-semibold"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Clear
                </button>
              </div>
            )}
          </div>

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
                className="cp-heading text-[20px] font-bold mb-2"
                style={{ color: "var(--color-blue-dark)" }}
              >
                No products found
              </h3>
              <p
                className="text-[14px] mb-6 text-center max-w-xs"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Try a different search term.
              </p>
              <button
                onClick={() => setSearch("")}
                className="cp-chip px-7 py-2.5 rounded-full text-white text-[13px] font-bold"
                style={{ background: "var(--color-blue-dark)" }}
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="cp-grid" style={{ "--cols": gridCols }}>
              {visible.map((product, i) => (
                <div
                  key={product.id}
                  className="cp-card"
                  style={{ animationDelay: `${(i % 12) * 0.04}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {/* ── Load More ── */}
          {visibleCount < filtered.length && (
            <div className="flex flex-col items-center gap-3 mt-12 mb-4">
              <div
                className="w-48 h-1.5 rounded-full overflow-hidden"
                style={{ background: "var(--color-border)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(visibleCount / filtered.length) * 100}%`,
                    background: "var(--color-gold)",
                    transition: "width 0.5s ease",
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
                className="cp-chip inline-flex items-center gap-2.5 px-8 py-3 rounded-full text-white font-bold text-[14px]"
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

          {/* TabBar spacer */}
          <div className="h-24 md:h-0" />
        </div>
      </div>

      {/* ── Mobile Sort Sheet ── */}
      {mobileSortOpen && (
        <>
          <div
            className="cp-sheet-bg md:hidden"
            onClick={() => setMobileSortOpen(false)}
          />
          <div className="cp-sheet md:hidden" ref={mobileSortRef}>
            <div className="flex justify-center pt-3 pb-1">
              <div
                className="w-10 h-1 rounded-full"
                style={{ background: "var(--color-border)" }}
              />
            </div>
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              <p
                className="cp-heading text-[17px] font-bold"
                style={{ color: "var(--color-blue-dark)" }}
              >
                Sort By
              </p>
              <button
                onClick={() => setMobileSortOpen(false)}
                className="cp-chip w-8 h-8 flex items-center justify-center rounded-full"
                style={{ background: "var(--color-bg-main)" }}
              >
                <X size={15} style={{ color: "var(--color-text-secondary)" }} />
              </button>
            </div>
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
                    className="cp-chip w-full flex items-center justify-between px-4 py-4 rounded-2xl mb-2 text-[14px] font-semibold"
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
