// FILE LOCATION: src/app/(routes)/[categorySlug]/[productSlug]/page.js

export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { PRODUCTS } from "@/app/data/productsData";
import ProductDetailPage from "@/app/components/products/ProductDetail";

// ── SEO metadata ─────────────────────────────────
export async function generateMetadata({ params }) {
  const { categorySlug, productSlug } = params;

  const product = PRODUCTS.find(
    (p) => p.slug === productSlug && p.category === categorySlug
  );
  if (!product) return {};

  const firstImg = product.images.flatMap((e) => e.images)[0] || "";
  const price = Math.round(
    (product.dimensions[0]?.mrp || 0) * (1 - product.discount / 100)
  );
  const categoryLabel = product.category.replace(/-/g, " ");

  return {
    title: `${product.title} | Glowison`,
    description: product.description?.slice(0, 160),
    keywords: [
      ...(product.keywords || []),
      categoryLabel,
      "Islamic home decor",
      "buy online India",
    ].join(", "),
    openGraph: {
      title: `${product.title} | Glowison`,
      description: product.description?.slice(0, 160),
      images: firstImg ? [{ url: firstImg }] : [],
      type: "website",
    },
    other: {
      "product:price:amount": String(price),
      "product:price:currency": "INR",
    },
  };
}

// ── Page component ─────────────────────────────────
export default function Page({ params }) {
  const { categorySlug, productSlug } = params;

  const product = PRODUCTS.find(
    (p) => p.slug === productSlug && p.category === categorySlug
  );

  if (!product) return notFound();

  return <ProductDetailPage product={product} />;
}