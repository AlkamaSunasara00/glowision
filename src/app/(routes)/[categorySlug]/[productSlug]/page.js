import { notFound } from "next/navigation";
import { PRODUCTS } from "@/app/data/productsData";
import ProductDetailPage from "@/app/components/products/ProductDetail";

// ── SEO ─────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { categorySlug, productSlug } = await params;

  const product = PRODUCTS.find(
    (p) =>
      p.slug === productSlug &&
      p.categorySlug === categorySlug
  );

  if (!product) return {};

  return {
    title: `${product.name} | Glowison`,
    description: product.description?.slice(0, 160),
  };
}

// ── Static Params ───────────────────────────────
export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    categorySlug: p.categorySlug,
    productSlug: p.slug,
  }));
}

// ── Page ────────────────────────────────────────
export default async function Page({ params }) {
  const { categorySlug, productSlug } = await params;

  const product = PRODUCTS.find(
    (p) =>
      p.slug === productSlug &&
      p.categorySlug === categorySlug
  );

  if (!product) {
    return notFound();
  }

  return <ProductDetailPage product={product} />;
}
