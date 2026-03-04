// FILE LOCATION: src/app/(routes)/[categorySlug]/[productSlug]/page.js
//
// URLs handled:
//   /islamic-wall-art/ayatul-kursi-premium-frame
//   /islamic-wall-clocks/some-clock-slug

import { notFound }      from "next/navigation";
import { PRODUCTS }      from "@/app/data/productsData";     // ← critical import
import ProductDetailPage from "@/app/components/products/ProductDetail";

// ── SEO metadata ──────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { categorySlug, productSlug } = await params;

  const product = PRODUCTS.find(
    (p) => p.slug === productSlug && p.category === categorySlug
  );
  if (!product) return {};

  const firstImg      = product.images.flatMap((e) => e.images)[0] || "";
  const price         = Math.round((product.dimensions[0]?.mrp || 0) * (1 - product.discount / 100));
  const categoryLabel = product.category.replace(/-/g, " ");

  return {
    title:       `${product.title} | Glowison`,
    description: product.description?.slice(0, 160),
    keywords:    [...(product.keywords || []), categoryLabel, "Islamic home decor", "buy online India"].join(", "),
    openGraph: {
      title:       `${product.title} | Glowison`,
      description: product.description?.slice(0, 160),
      images:      firstImg ? [{ url: firstImg }] : [],
      type:        "website",
    },
    other: {
      "product:price:amount":   String(price),
      "product:price:currency": "INR",
    },
  };
}

// ── Pre-generate all routes at build time ─────────────────────────────────────
export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    categorySlug: p.category,   // e.g. "islamic-wall-art"
    productSlug:  p.slug,       // e.g. "ayatul-kursi-premium-frame"
  }));
}

// ── Page component ────────────────────────────────────────────────────────────
export default async function Page({ params }) {
  const { categorySlug, productSlug } = await params;

  const product = PRODUCTS.find(
    (p) => p.slug === productSlug && p.category === categorySlug
  );

  if (!product) return notFound();

  return <ProductDetailPage product={product} />;
}