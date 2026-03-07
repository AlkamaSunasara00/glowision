import { notFound } from "next/navigation";
import { PRODUCTS } from "@/app/data/productsData";
import { CATEGORIES } from "@/app/data/categoriesData";
import CategoryPage from "@/app/components/products/Category";

export async function generateMetadata({ params }) {
  const { categorySlug } = await params;
  const category = CATEGORIES.find((entry) => entry.slug === categorySlug);

  if (!category) return {};

  const total = PRODUCTS.filter((product) => product.category === categorySlug).length;

  return {
    title: `${category.name} | Glowison`,
    description: `Shop ${total} products in ${category.name}.`,
    keywords: `${category.name}, Islamic home decor, buy online India, Glowison`,
  };
}

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({ categorySlug: category.slug }));
}

export default async function Page({ params }) {
  const { categorySlug } = await params;

  const category = CATEGORIES.find((entry) => entry.slug === categorySlug);
  const productsInCategory = PRODUCTS.filter(
    (product) => product.category === categorySlug,
  );

  if (!category && productsInCategory.length === 0) return notFound();

  return <CategoryPage categorySlug={categorySlug} />;
}
