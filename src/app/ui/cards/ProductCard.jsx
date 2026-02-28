"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductCardUI from "./ProductCardUI";

export default function ProductCard({ product }) {
  const router = useRouter();
  const [hovered,    setHovered]    = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [particles,  setParticles]  = useState(false);

  // ── Sync wishlist state on mount ──
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("glowison_wishlist") || "[]");
    setWishlisted(saved.some((i) => i.id === product.id));
  }, [product.id]);

  // ── Slug-based routing ──
  const handleCardClick = () => {
    router.push(`/${product.categorySlug}/${product.slug}`);
  };

  // ── Wishlist toggle ──
  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const saved = JSON.parse(localStorage.getItem("glowison_wishlist") || "[]");
    if (!wishlisted) {
      setParticles(true);
      setTimeout(() => setParticles(false), 700);
      localStorage.setItem("glowison_wishlist", JSON.stringify([...saved, {
        id:           product.id,
        name:         product.name,
        price:        product.price,
        originalPrice: product.originalPrice,
        image:        product.images[0],
        category:     product.category,
        slug:         product.slug,
        categorySlug: product.categorySlug,
      }]));
      setWishlisted(true);
    } else {
      localStorage.setItem("glowison_wishlist", JSON.stringify(saved.filter((i) => i.id !== product.id)));
      setWishlisted(false);
    }
    window.dispatchEvent(new Event("wishlistUpdate"));
  };

  return (
    <ProductCardUI
      product={product}
      hovered={hovered}
      wishlisted={wishlisted}
      particles={particles}
      onCardClick={handleCardClick}
      onWishlist={handleWishlist}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    />
  );
}