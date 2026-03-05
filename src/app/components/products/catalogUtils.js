import { CATEGORIES } from "@/app/data/categoriesData";

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest First" },
];

export const TAG_LABELS = {
  ramadan: "Ramadan",
  diwali: "Diwali",
  featured: "Featured",
};

const TAG_PRIORITY = ["eid", "ramadan", "diwali", "featured"];

export function humanizeSlug(slug = "") {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getCategoryBySlug(categorySlug) {
  return CATEGORIES.find((category) => category.slug === categorySlug) || null;
}

export function getSubcategoryBySlug(categorySlug, subcategorySlug) {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return null;

  return (
    category.subcategories.find(
      (subcategory) => subcategory.slug === subcategorySlug,
    ) || null
  );
}

export function getAllTags(products) {
  const tags = new Set();

  products.forEach((product) => {
    Object.keys(product.tags || {}).forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort((a, b) => {
    const aPriority = TAG_PRIORITY.indexOf(a);
    const bPriority = TAG_PRIORITY.indexOf(b);

    if (aPriority === -1 && bPriority === -1) return a.localeCompare(b);
    if (aPriority === -1) return 1;
    if (bPriority === -1) return -1;
    return aPriority - bPriority;
  });
}

export function getTagLabel(tag) {
  return TAG_LABELS[tag] || humanizeSlug(tag);
}

export function normalizeTag(tag, allTags) {
  if (!tag || tag === "all") return "all";
  return allTags.includes(tag) ? tag : "all";
}

export function getBaseMrp(product) {
  return product.dimensions?.[0]?.mrp || 0;
}

export function getSalePrice(product) {
  const mrp = getBaseMrp(product);
  return Math.round(mrp * (1 - (product.discount || 0) / 100));
}

function sortByPriceAsc(a, b) {
  return getSalePrice(a) - getSalePrice(b);
}

function sortByPriceDesc(a, b) {
  return getSalePrice(b) - getSalePrice(a);
}

function sortByFeatured(a, b) {
  const aFeatured = Number(Boolean(a.tags?.featured));
  const bFeatured = Number(Boolean(b.tags?.featured));
  if (aFeatured !== bFeatured) return bFeatured - aFeatured;
  if ((a.rating || 0) !== (b.rating || 0)) return (b.rating || 0) - (a.rating || 0);
  return (b.id || 0) - (a.id || 0);
}

export function sortProducts(products, sortBy) {
  const list = [...products];

  switch (sortBy) {
    case "price-asc":
      return list.sort(sortByPriceAsc);
    case "price-desc":
      return list.sort(sortByPriceDesc);
    case "rating":
      return list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case "newest":
      return list.sort((a, b) => (b.id || 0) - (a.id || 0));
    case "featured":
    default:
      return list.sort(sortByFeatured);
  }
}

function matchesSearch(product, query, categoryName, subcategoryName) {
  if (!query) return true;

  const haystack = [
    product.title,
    product.slug,
    categoryName,
    subcategoryName,
    ...(product.keywords || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

export function filterProducts({
  products,
  categorySlug = "all",
  subcategorySlug = "all",
  tag = "all",
  search = "",
  onlyFeatured = false,
}) {
  const query = search.trim().toLowerCase();

  return products.filter((product) => {
    if (categorySlug !== "all" && product.category !== categorySlug) {
      return false;
    }

    if (subcategorySlug !== "all" && product.subcategory !== subcategorySlug) {
      return false;
    }

    if (tag !== "all" && !product.tags?.[tag]) {
      return false;
    }

    if (onlyFeatured && !product.tags?.featured) {
      return false;
    }

    const categoryName = getCategoryBySlug(product.category)?.name || product.category;
    const subcategoryName =
      getSubcategoryBySlug(product.category, product.subcategory)?.name ||
      product.subcategory;

    return matchesSearch(product, query, categoryName, subcategoryName);
  });
}
