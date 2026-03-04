// FILE LOCATION: src/app/(routes)/[categorySlug]/page.jsx
//
// NOTE: This file sits ALONGSIDE the [productSlug] subfolder.
// Next.js handles both correctly:
//   /islamic-wall-art              → this file (CategoryPage)
//   /islamic-wall-art/some-slug    → [productSlug]/page.js (ProductDetailPage)

import { PRODUCTS }   from "@/app/data/productsData";
import { CATEGORIES } from "@/app/data/categoriesData";
// import CategoryPage   from "@/app/components/CategoryPage";
import { notFound }   from "next/navigation";
import CategoryPage from "@/app/components/products/Category";

// ── SEO metadata ──────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { categorySlug } = await params;
  const category         = CATEGORIES.find((c) => c.slug === categorySlug);
  const count            = PRODUCTS.filter((p) => p.category === categorySlug).length;

  if (!category) return {};

  return {
    title:       `${category.name} | Glowison`,
    description: `Shop ${count} handcrafted ${category.name.toLowerCase()} pieces. Premium Islamic home decor delivered across India.`,
    keywords:    `${category.name}, Islamic home decor, buy online India, Glowison`,
    openGraph: {
      title:       `${category.name} | Glowison`,
      description: `Shop ${count} handcrafted ${category.name.toLowerCase()} pieces.`,
      type:        "website",
    },
  };
}

// ── Pre-generate all category routes at build time ────────────────────────────
export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({
    categorySlug: c.slug,
  }));
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function Page({ params }) {
  const { categorySlug } = await params;

  const category         = CATEGORIES.find((c) => c.slug === categorySlug);
  const categoryProducts = PRODUCTS.filter((p) => p.category === categorySlug);

  // 404 only if the slug doesn't match any category AND has no products
  if (!category && categoryProducts.length === 0) return notFound();

  return <CategoryPage categorySlug={categorySlug} />;
}