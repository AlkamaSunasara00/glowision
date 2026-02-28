"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Plus, Check } from "lucide-react";
import "./atcButton.css";

export default function AddToCartButton({ product, onClick, className = "", style = {} }) {
  const [phase, setPhase] = useState("idle");

  useEffect(() => {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem("glowison_cart") || "[]");
    const exists = cart.some((i) => i.id === product.id);
    if (exists) setPhase("added");
  }, [product]);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (phase !== "idle") return;

    if (product) {
      const cart = JSON.parse(localStorage.getItem("glowison_cart") || "[]");
      const exists = cart.some((i) => i.id === product.id);
      if (!exists) {
        const item = {
          id:            product.id,
          name:          product.name,
          category:      product.category,
          price:         product.price,
          originalPrice: product.originalPrice,
          images:        product.images || [],
          badge:         product.badge        || null,
          rating:        product.rating       || null,
          reviews:       product.reviews      || null,
          selectedColor: product.selectedColor || null,
          qty:           product.qty          || 1,
        };
        localStorage.setItem("glowison_cart", JSON.stringify([...cart, item]));
        window.dispatchEvent(new Event("cartUpdate"));
      }
    }

    if (onClick) onClick(e);
    setPhase("loading");
    setTimeout(() => setPhase("added"), 1000); // ⚡ reduced from 1500 → 1000
  };

  return (
    <button
      onClick={handleClick}
      className={`atc-btn ${phase === "loading" ? "atc-loading" : ""} ${phase === "added" ? "atc-added" : ""} ${className}`}
      style={style}
    >
      <span className="atc-track" />

      <span className="atc-cart-slider">
        <ShoppingCart size={18} className="atc-cart-icon" />
        <span className="atc-trace atc-trace-1" />
        <span className="atc-trace atc-trace-2" />
      </span>

      <span className="atc-idle-content">
        <ShoppingCart size={14} />
        <Plus size={11} className="atc-plus" />
        <p className="atc-letters">
          {"Add to cart".split("").map((char, i) => (
            <span key={i} style={{ "--i": i }}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </p>
      </span>

      <span className="atc-added-content">
        <Check size={16} strokeWidth={3} className="atc-check-icon" />
        <p className="atc-letters">
          {"Added!".split("").map((char, i) => (
            <span key={i} style={{ "--i": i + 5 }}>
              {char}
            </span>
          ))}
        </p>
      </span>
    </button>
  );
}