import AllProductsPage from "@/app/components/products/Products";

export const metadata = {
  title: "All Products | Glowison",
  description:
    "Browse our complete collection of handcrafted Islamic home decor, with category and subcategory discovery.",
  keywords: "Islamic wall art, Islamic home decor, buy online India, Glowison",
};

export default async function Page({ searchParams }) {
  const params = (await searchParams) || {};

  const initialCategory =
    typeof params.category === "string" ? params.category : "all";
  const initialSubcategory = typeof params.sub === "string" ? params.sub : "all";
  const initialSort = typeof params.sort === "string" ? params.sort : "featured";
  const initialQuery = typeof params.q === "string" ? params.q : "";
  const initialTag = typeof params.tag === "string" ? params.tag : "all";

  return (
    <AllProductsPage
      initialCategory={initialCategory}
      initialSubcategory={initialSubcategory}
      initialSort={initialSort}
      initialQuery={initialQuery}
      initialTag={initialTag}
    />
  );
}
