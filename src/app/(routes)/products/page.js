// FILE LOCATION: src/app/(routes)/products/page.jsx

import AllProductsPage from "@/app/components/products/Products";


export const metadata = {
  title:       "All Products | Glowison",
  description: "Browse our complete collection of handcrafted Islamic home decor — wall art, clocks, calligraphy panels and more.",
  keywords:    "Islamic wall art, Islamic home decor, buy online India, Glowison",
};

export default function Page() {
  return <AllProductsPage />;
}