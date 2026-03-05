export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { PRODUCTS } from "@/app/data/productsData";
import ProductDetailPage from "@/app/components/products/ProductDetail";

export async function generateMetadata({ params }) {
  const { productSlug } = params;

  const product = PRODUCTS.find((p) => p.slug === productSlug);
  if (!product) return {};

  const firstImg = product.images.flatMap((e) => e.images)[0] || "";
  const price = Math.round(
    (product.dimensions[0]?.mrp || 0) * (1 - product.discount / 100)
  );

  return {
    title: `${product.title} | Glowison`,
    description: product.description?.slice(0, 160),
    openGraph: {
      title: `${product.title} | Glowison`,
      images: firstImg ? [{ url: firstImg }] : [],
    },
  };
}

export default function Page({ params }) {
  const { productSlug } = params;

  const product = PRODUCTS.find((p) => p.slug === productSlug);

  if (!product) return notFound();

  return <ProductDetailPage product={product} />;
}