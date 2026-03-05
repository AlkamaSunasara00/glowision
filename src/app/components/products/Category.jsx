"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown, Search, X, SlidersHorizontal } from "lucide-react";
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
} from "./catalogUtils";

const PAGE_SIZE = 12;

function normalizeSort(sortBy) {
  return SORT_OPTIONS.some((option) => option.value === sortBy) ? sortBy : "featured";
}

function SortDropdown({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find((o) => o.value === value) || options[0];

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 items-center gap-2 rounded-xl border border-border bg-white px-3.5 text-sm font-medium text-text-primary transition hover:border-blue-dark"
      >
        <SlidersHorizontal size={14} className="text-text-secondary" />
        <span>{selected.label}</span>
        <ChevronDown
          size={14}
          className={`text-text-secondary transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1.5 w-48 overflow-hidden rounded-xl border border-border bg-white shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition hover:bg-bg-main ${
                option.value === value
                  ? "font-semibold text-blue-dark"
                  : "text-text-primary"
              }`}
            >
              {option.value === value && (
                <span className="h-1.5 w-1.5 rounded-full bg-blue-dark" />
              )}
              <span className={option.value === value ? "" : "ml-3.5"}>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CategoryPage({ categorySlug, subcategorySlug = null }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(normalizeSort("featured"));
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const category = getCategoryBySlug(categorySlug);
  const activeSubcategory = subcategorySlug || "all";
  const subcategory = getSubcategoryBySlug(categorySlug, activeSubcategory);
  const categoryName = category?.name || humanizeSlug(categorySlug);
  const subcategoryName =
    activeSubcategory === "all"
      ? ""
      : subcategory?.name || humanizeSlug(activeSubcategory);

  const filteredProducts = useMemo(() => {
    const filtered = filterProducts({
      products: PRODUCTS,
      categorySlug,
      subcategorySlug: activeSubcategory,
      search,
    });
    return sortProducts(filtered, sortBy);
  }, [categorySlug, activeSubcategory, search, sortBy]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-bg-main">
      <div className="mx-auto max-w-7xl px-4 py-5 md:px-6 md:py-7">

        {/* Breadcrumb */}
        <nav className="mb-4 flex flex-wrap items-center gap-1 text-xs text-text-secondary">
          <Link href="/" className="hover:text-blue-dark transition">Home</Link>
          <ChevronRight size={11} />
          <Link href="/products" className="hover:text-blue-dark transition">Products</Link>
          <ChevronRight size={11} />
          <span className="text-text-primary font-medium">{categoryName}</span>
          {subcategoryName && (
            <>
              <ChevronRight size={11} />
              <span className="text-text-primary font-medium">{subcategoryName}</span>
            </>
          )}
        </nav>

        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-dark md:text-3xl">
              {subcategoryName ? `${categoryName} · ${subcategoryName}` : categoryName}
            </h1>
            <p className="mt-0.5 text-sm text-text-secondary">
              {filteredProducts.length} products
            </p>
          </div>
        </div>

        {/* Subcategory Pills */}
        {(category?.subcategories?.length || 0) > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            <Link
              href={`/${categorySlug}`}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                activeSubcategory === "all"
                  ? "bg-blue-dark text-white"
                  : "bg-white border border-border text-text-primary hover:border-blue-dark"
              }`}
            >
              All
            </Link>
            {category.subcategories.map((entry) => (
              <Link
                key={entry.slug}
                href={`/${categorySlug}/sub/${entry.slug}`}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  activeSubcategory === entry.slug
                    ? "bg-blue-dark text-white"
                    : "bg-white border border-border text-text-primary hover:border-blue-dark"
                }`}
              >
                {entry.name}
              </Link>
            ))}
          </div>
        )}

        {/* Search + Sort Bar */}
        <div className="mb-5 flex items-center gap-2">
          <label className="flex h-10 flex-1 items-center gap-2.5 rounded-xl border border-border bg-white px-3.5 transition focus-within:border-blue-dark">
            <Search size={15} className="shrink-0 text-text-secondary" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setVisibleCount(PAGE_SIZE); }}
              placeholder={`Search in ${categoryName}…`}
              className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary"
            />
            {search && (
              <button
                type="button"
                onClick={() => { setSearch(""); setVisibleCount(PAGE_SIZE); }}
                className="shrink-0 text-text-secondary hover:text-blue-dark transition"
              >
                <X size={13} />
              </button>
            )}
          </label>

          <SortDropdown
            value={sortBy}
            onChange={(v) => { setSortBy(v); setVisibleCount(PAGE_SIZE); }}
            options={SORT_OPTIONS}
          />
        </div>

        {/* Grid */}
        {visibleProducts.length === 0 ? (
          <div className="rounded-2xl border border-border bg-white py-20 text-center">
            <p className="font-semibold text-blue-dark">No products found</p>
            <p className="mt-1 text-sm text-text-secondary">Try a different keyword.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:gap-3 xl:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Load More */}
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

      <TagProductsSection
        tag="eid"
        heading="Eid Celebration Picks"
        subtitle="Top festive recommendations for gifting and decor."
        viewMoreLabel="View Eid"
        viewMoreHref="/products?tag=eid"
      />

      <div className="h-16 md:h-0" />
    </div>
  );
}