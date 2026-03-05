import { notFound } from "next/navigation";
import { PRODUCTS } from "@/app/data/productsData";
import { CATEGORIES } from "@/app/data/categoriesData";
import CategoryPage from "@/app/components/products/Category";

function getCategoryAndSubcategory(categorySlug, subcategorySlug) {
  const category = CATEGORIES.find((entry) => entry.slug === categorySlug) || null;
  const subcategory =
    category?.subcategories?.find((entry) => entry.slug === subcategorySlug) || null;

  return { category, subcategory };
}

export async function generateMetadata({ params }) {
  const { categorySlug, subcategorySlug } = await params;
  const { category, subcategory } = getCategoryAndSubcategory(
    categorySlug,
    subcategorySlug,
  );

  if (!category || !subcategory) return {};

  const total = PRODUCTS.filter(
    (product) =>
      product.category === categorySlug && product.subcategory === subcategorySlug,
  ).length;

  return {
    title: `${subcategory.name} | ${category.name} | Glowison`,
    description: `Shop ${total} products in ${subcategory.name}.`,
    keywords: `${subcategory.name}, ${category.name}, Islamic home decor, Glowison`,
  };
}

export async function generateStaticParams() {
  return CATEGORIES.flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      categorySlug: category.slug,
      subcategorySlug: subcategory.slug,
    })),
  );
}

export default async function Page({ params }) {
  const { categorySlug, subcategorySlug } = await params;
  const { category, subcategory } = getCategoryAndSubcategory(
    categorySlug,
    subcategorySlug,
  );

  const productsInSubcategory = PRODUCTS.filter(
    (product) =>
      product.category === categorySlug && product.subcategory === subcategorySlug,
  );

  if ((!category || !subcategory) && productsInSubcategory.length === 0) {
    return notFound();
  }

  return (
    <CategoryPage
      categorySlug={categorySlug}
      subcategorySlug={subcategorySlug}
    />
  );
}
