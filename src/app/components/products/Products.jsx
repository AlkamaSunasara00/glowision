"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ChevronDown, Search, X, SlidersHorizontal, ListFilter, SearchAlert } from "lucide-react";
import { CATEGORIES } from "@/app/data/categoriesData";
import { PRODUCTS } from "@/app/data/productsData";
import ProductCard from "@/app/ui/cards/ProductCard";
import TagProductsSection from "./TagProductsSection";
import {
  SORT_OPTIONS,
  filterProducts,
  sortProducts,
  getCategoryBySlug,
  getSubcategoryBySlug,
  humanizeSlug,
  getAllTags,
  normalizeTag,
  getTagLabel,
} from "./catalogUtils";

const PAGE_SIZE = 12;

function normalizeCategory(categorySlug) {
  if (!categorySlug || categorySlug === "all") return "all";
  return getCategoryBySlug(categorySlug) ? categorySlug : "all";
}

function normalizeSubcategory(categorySlug, subcategorySlug) {
  if (!subcategorySlug || subcategorySlug === "all") return "all";
  if (categorySlug === "all") return "all";
  return getSubcategoryBySlug(categorySlug, subcategorySlug) ? subcategorySlug : "all";
}

function normalizeSort(sortBy) {
  return SORT_OPTIONS.some((o) => o.value === sortBy) ? sortBy : "featured";
}

/* ── Scroll lock hook ── */
function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [locked]);
}

/* ── Custom Sort Dropdown ── */
function SortDropdown({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find((o) => o.value === value) || options[0];

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 items-center gap-2 rounded-xl border border-border bg-white px-3.5 text-sm font-medium text-text-primary transition hover:border-blue-dark"
      >
        <SlidersHorizontal size={14} className="text-text-secondary" />
        <span className="hidden sm:inline">{selected.label}</span>
        <ChevronDown size={14} className={`text-text-secondary transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-[80] mt-1.5 w-52 overflow-hidden rounded-xl border border-border bg-white shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => { onChange(option.value); setOpen(false); }}
              className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition hover:bg-bg-main ${
                option.value === value ? "font-semibold text-blue-dark" : "text-text-primary"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${option.value === value ? "bg-blue-dark" : "bg-transparent"}`} />
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Mobile Filter Bottom Sheet ── */
function MobileFilterSheet({
  open, onClose,
  activeCategory, setActiveCategory,
  activeSubcategory, setActiveSubcategory,
  categoryCounts, categories, products,
}) {
  useScrollLock(open);

  const activeCategoryData = activeCategory === "all" ? null : getCategoryBySlug(activeCategory);
  const subcategoryOptions = activeCategoryData?.subcategories || [];

  return (
    <div
      className={`fixed inset-0 z-[80] flex flex-col justify-end md:hidden transition-all duration-300 ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      {/* Sheet panel */}
      <div
        className={`relative rounded-t-2xl bg-white px-4 pb-10 pt-3 shadow-xl transition-transform duration-300 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Drag handle */}
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />

        <div className="mb-4 flex items-center justify-between">
          <p className="font-semibold text-blue-dark">Filter</p>
          <button type="button" onClick={onClose} className="rounded-lg p-1 hover:bg-bg-main transition">
            <X size={17} className="text-text-secondary" />
          </button>
        </div>

        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-secondary">Category</p>
        <div className="mb-5 flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => { setActiveCategory("all"); setActiveSubcategory("all"); onClose(); }}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              activeCategory === "all" ? "bg-blue-dark text-white" : "border border-border bg-bg-main text-text-primary"
            }`}
          >
            All ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => { setActiveCategory(cat.slug); setActiveSubcategory("all"); }}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                activeCategory === cat.slug ? "bg-blue-dark text-white" : "border border-border bg-bg-main text-text-primary"
              }`}
            >
              {cat.name} ({categoryCounts[cat.slug] || 0})
            </button>
          ))}
        </div>

        {subcategoryOptions.length > 0 && (
          <>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-secondary">Subcategory</p>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => { setActiveSubcategory("all"); onClose(); }}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  activeSubcategory === "all" ? "bg-gold-soft text-blue-dark" : "border border-border bg-bg-main text-text-primary"
                }`}
              >
                All
              </button>
              {subcategoryOptions.map((sub) => (
                <button
                  key={sub.slug}
                  type="button"
                  onClick={() => { setActiveSubcategory(sub.slug); onClose(); }}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    activeSubcategory === sub.slug ? "bg-gold-soft text-blue-dark" : "border border-border bg-bg-main text-text-primary"
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Desktop Horizontal Pill Filter Bar ── */
function DesktopFilterBar({
  activeCategory, setActiveCategory,
  activeSubcategory, setActiveSubcategory,
  effectiveSubcategory,
  categoryCounts, categories, products, setVisibleCount,
}) {
  const activeCategoryData = activeCategory === "all" ? null : getCategoryBySlug(activeCategory);
  const subcategoryOptions = activeCategoryData?.subcategories || [];

  return (
    <div className="mb-5 hidden md:block space-y-2">
      {/* Category pills */}
      <div
        className="flex items-center gap-1.5 overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <button
          type="button"
          onClick={() => { setActiveCategory("all"); setActiveSubcategory("all"); setVisibleCount(PAGE_SIZE); }}
          className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
            activeCategory === "all"
              ? "bg-blue-dark text-white"
              : "border border-border bg-white text-text-primary hover:border-blue-dark"
          }`}
        >
          All
          <span className={`ml-1 ${activeCategory === "all" ? "text-white/70" : "text-text-secondary"}`}>
            ({products.length})
          </span>
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            type="button"
            onClick={() => { setActiveCategory(cat.slug); setActiveSubcategory("all"); setVisibleCount(PAGE_SIZE); }}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              activeCategory === cat.slug
                ? "bg-blue-dark text-white"
                : "border border-border bg-white text-text-primary hover:border-blue-dark"
            }`}
          >
            {cat.name}
            <span className={`ml-1 ${activeCategory === cat.slug ? "text-white/70" : "text-text-secondary"}`}>
              ({categoryCounts[cat.slug] || 0})
            </span>
          </button>
        ))}
      </div>

      {/* Subcategory pills — appears below when a category is selected */}
      {subcategoryOptions.length > 0 && (
        <div
          className="flex items-center gap-1.5 overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wide text-text-secondary pr-0.5">
            {activeCategoryData?.name}:
          </span>
          <button
            type="button"
            onClick={() => { setActiveSubcategory("all"); setVisibleCount(PAGE_SIZE); }}
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition ${
              effectiveSubcategory === "all"
                ? "bg-gold-soft text-blue-dark"
                : "border border-border bg-white text-text-primary hover:border-blue-dark"
            }`}
          >
            All
          </button>
          {subcategoryOptions.map((sub) => (
            <button
              key={sub.slug}
              type="button"
              onClick={() => { setActiveSubcategory(sub.slug); setVisibleCount(PAGE_SIZE); }}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition ${
                effectiveSubcategory === sub.slug
                  ? "bg-gold-soft text-blue-dark"
                  : "border border-border bg-white text-text-primary hover:border-blue-dark"
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main Page ── */
export default function AllProductsPage({
  initialCategory = "all",
  initialSubcategory = "all",
  initialSort = "featured",
  initialQuery = "",
  initialTag = "all",
}) {
  const urlParams    = useSearchParams();
  const allTags      = useMemo(() => getAllTags(PRODUCTS), []);

  // Read live URL params — these update whenever a nav link changes the URL
  const urlSort     = normalizeSort(urlParams.get("sort") || initialSort);
  const urlQuery    = urlParams.get("q") || initialQuery;
  const urlTag      = normalizeTag(urlParams.get("tag") || initialTag, allTags);
  const prioritizedTag = urlTag !== "all" ? urlTag : normalizeTag(initialTag, allTags);

  const [search,           setSearch]           = useState(urlQuery);
  const [activeCategory,   setActiveCategory]   = useState(normalizeCategory(initialCategory));
  const [activeSubcategory,setActiveSubcategory] = useState(normalizeSubcategory(initialCategory, initialSubcategory));
  const [sortBy,           setSortBy]           = useState(urlSort);
  const [visibleCount,     setVisibleCount]     = useState(PAGE_SIZE);
  const [filterSheetOpen,  setFilterSheetOpen]  = useState(false);

  // Sync sort + search from URL whenever URL params change (e.g. navbar links)
  useEffect(() => {
    setSortBy(normalizeSort(urlParams.get("sort") || "featured"));
    setVisibleCount(PAGE_SIZE);
  }, [urlParams.get("sort")]);

  useEffect(() => {
    const tag = urlParams.get("tag");
    // tag param from navbar links — don't change category filter, just note it
    setVisibleCount(PAGE_SIZE);
  }, [urlParams.get("tag")]);

  const activeCategoryData = activeCategory === "all" ? null : getCategoryBySlug(activeCategory);
  const subcategoryOptions = activeCategoryData?.subcategories || [];
  const isSubcategoryValid = subcategoryOptions.some((s) => s.slug === activeSubcategory);
  const effectiveSubcategory = activeCategory === "all" || !isSubcategoryValid ? "all" : activeSubcategory;

  const filteredProducts = useMemo(() => {
    const liveTag = normalizeTag(urlParams.get("tag") || "all", allTags);
    const filtered = filterProducts({
      products: PRODUCTS,
      categorySlug: activeCategory,
      subcategorySlug: effectiveSubcategory,
      search,
      tag: liveTag !== "all" ? liveTag : "all",
    });
    return sortProducts(filtered, sortBy);
  }, [activeCategory, effectiveSubcategory, search, sortBy, urlParams.get("tag")]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasFilters = activeCategory !== "all" || effectiveSubcategory !== "all" || search.trim() !== "";

  const categoryCounts = useMemo(() => {
    const counts = {};
    CATEGORIES.forEach((c) => { counts[c.slug] = PRODUCTS.filter((p) => p.category === c.slug).length; });
    return counts;
  }, []);

  const bottomSectionTags = useMemo(() => {
    const ordered = [prioritizedTag, "featured", "eid", "ramadan", "diwali"].filter((t) => t !== "all");
    return Array.from(new Set(ordered)).slice(0, 2);
  }, [prioritizedTag]);

  const activeCategoryLabel = activeCategoryData?.name || (activeCategory === "all" ? "All Products" : humanizeSlug(activeCategory));
  const activeSubcategoryLabel =
    effectiveSubcategory === "all"
      ? ""
      : getSubcategoryBySlug(activeCategory, effectiveSubcategory)?.name || humanizeSlug(effectiveSubcategory);

  return (
    <div className="min-h-screen bg-bg-main">
      <div className="mx-auto max-w-7xl px-4 py-5 md:px-6 md:py-7">

        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-1 text-xs text-text-secondary">
          <Link href="/" className="hover:text-blue-dark transition">Home</Link>
          <ChevronRight size={11} />
          <span className="text-text-primary font-medium">All Products</span>
        </nav>

        {/* Page Header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-dark md:text-3xl">All Products</h1>
            <p className="mt-0.5 text-sm text-text-secondary">
              {filteredProducts.length} results
              {activeCategoryLabel !== "All Products" && (
                <span> in <span className="font-medium text-text-primary">{activeCategoryLabel}</span></span>
              )}
              {activeSubcategoryLabel && (
                <span> · <span className="font-medium text-text-primary">{activeSubcategoryLabel}</span></span>
              )}
            </p>
          </div>
          {hasFilters && (
            <button
              type="button"
              onClick={() => { setSearch(""); setActiveCategory("all"); setActiveSubcategory("all"); setSortBy("featured"); setVisibleCount(PAGE_SIZE); }}
              className="rounded-full border border-border bg-white px-3.5 py-1.5 text-xs font-semibold text-text-secondary transition hover:border-blue-dark hover:text-blue-dark"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Search + Sort + Mobile filter trigger */}
        <div className="mb-4 flex items-center gap-2">
          <label className="flex h-10 flex-1 items-center gap-2.5 rounded-xl border border-border bg-white px-3.5 transition focus-within:border-blue-dark">
            <Search size={15} className="shrink-0 text-text-secondary" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setVisibleCount(PAGE_SIZE); }}
              placeholder="Search products…"
              className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary"
            />
            {search && (
              <button type="button" onClick={() => { setSearch(""); setVisibleCount(PAGE_SIZE); }} className="shrink-0 text-text-secondary hover:text-blue-dark">
                <X size={13} />
              </button>
            )}
          </label>

          <SortDropdown value={sortBy} onChange={(v) => { setSortBy(v); setVisibleCount(PAGE_SIZE); }} options={SORT_OPTIONS} />

          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={() => setFilterSheetOpen(true)}
            className="relative flex h-10 items-center gap-1.5 rounded-xl border border-border bg-white px-3.5 text-sm font-medium text-text-primary transition hover:border-blue-dark md:hidden"
          >
            <ListFilter size={15} className="text-text-secondary" />
            <span className="text-xs">Filter</span>
            {hasFilters && (
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full border-2 border-bg-main bg-blue-dark" />
            )}
          </button>
        </div>

        {/* Desktop horizontal pill filter bar */}
        <DesktopFilterBar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          activeSubcategory={activeSubcategory}
          setActiveSubcategory={setActiveSubcategory}
          effectiveSubcategory={effectiveSubcategory}
          categoryCounts={categoryCounts}
          categories={CATEGORIES}
          products={PRODUCTS}
          setVisibleCount={setVisibleCount}
        />

        {/* Product Grid — full width */}
        {visibleProducts.length === 0 ? (
          <div className="rounded-2xl border border-border bg-white py-20 text-center">
            <p className="font-semibold text-blue-dark">No products found</p>
            <p className="mt-1 text-sm text-text-secondary">Try a different search or clear filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:gap-3 lg:grid-cols-4 xl:grid-cols-5">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {visibleCount < filteredProducts.length && (
          <div className="mt-7 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((c) => c + 8)}
              className="rounded-full border border-blue-dark bg-white px-6 py-2.5 text-sm font-semibold text-blue-dark transition hover:bg-blue-dark hover:text-white"
            >
              Load more
            </button>
          </div>
        )}
      </div>

      {/* Mobile filter bottom sheet */}
      <MobileFilterSheet
        open={filterSheetOpen}
        onClose={() => setFilterSheetOpen(false)}
        activeCategory={activeCategory}
        setActiveCategory={(v) => { setActiveCategory(v); setVisibleCount(PAGE_SIZE); }}
        activeSubcategory={effectiveSubcategory}
        setActiveSubcategory={(v) => { setActiveSubcategory(v); setVisibleCount(PAGE_SIZE); }}
        categoryCounts={categoryCounts}
        categories={CATEGORIES}
        products={PRODUCTS}
      />

      {bottomSectionTags.map((tag) => (
        <TagProductsSection
          key={`products-bottom-${tag}`}
          tag={tag}
          heading={`${getTagLabel(tag)} Picks`}
          subtitle="Curated products from this seasonal collection."
        />
      ))}

      <div className="h-16 md:h-0" />
    </div>
  );
}