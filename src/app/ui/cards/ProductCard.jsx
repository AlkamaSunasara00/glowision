// FILE: src/app/ui/cards/ProductCard.jsx
// Handles: routing, wishlist state, hover state
// Passes raw product (new data shape) directly to ProductCardUI

"use client";

import { useEffect, useState } from "react";
import { useRouter }           from "next/navigation";
import ProductCardUI           from "./ProductCardUI";

export default function ProductCard({ product }) {
  const router = useRouter();
  const [hovered,    setHovered]    = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [particles,  setParticles]  = useState(false);

  // ── Sync wishlist on mount ────────────────────────────────────────────────
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("glowison_wishlist") || "[]");
    setWishlisted(saved.some((i) => i.id === product.id));
  }, [product.id]);

  // ── Navigate to /{category}/{slug} ────────────────────────────────────────
  const handleCardClick = () => {
    router.push(`/${product.category}/${product.slug}`);
  };

  // ── Wishlist toggle ───────────────────────────────────────────────────────
  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const saved    = JSON.parse(localStorage.getItem("glowison_wishlist") || "[]");
    const allImages = product.images.flatMap((e) => e.images);
    const mrp       = product.dimensions[0]?.mrp || 0;
    const price     = Math.round(mrp * (1 - product.discount / 100));

    if (!wishlisted) {
      setParticles(true);
      setTimeout(() => setParticles(false), 700);
      localStorage.setItem("glowison_wishlist", JSON.stringify([...saved, {
        id:            product.id,
        name:          product.title,
        price,
        originalPrice: mrp,
        images:        allImages,
        category:      product.category,
        slug:          product.slug,
        rating:        product.rating,
        reviews:       product.reviews,
        badge:         product.badge || null,
      }]));
      setWishlisted(true);
    } else {
      localStorage.setItem("glowison_wishlist",
        JSON.stringify(saved.filter((i) => i.id !== product.id))
      );
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