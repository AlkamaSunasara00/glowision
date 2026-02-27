"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";

export default function AddToCartButton({ onClick, className = "", style = {} }) {
  const [phase, setPhase] = useState("idle"); // "idle" | "loading" | "added"

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (phase !== "idle") return;
    if (onClick) onClick(e);
    setPhase("loading");
    setTimeout(() => setPhase("added"), 1800);
  };

  return (
    <button
      onClick={handleClick}
      className={`atc-btn ${phase === "loading" ? "atc-loading" : ""} ${phase === "added" ? "atc-added" : ""} ${className}`}
      style={style}
    >
      {/* Progress track — fills left to right */}
      <span className="atc-track" />

      {/* Sliding cart icon */}
      <span className="atc-cart-slider">
        <ShoppingCart size={16} />
      </span>

      {/* IDLE text */}
      <span className="atc-idle-content">
        <ShoppingCart size={14} />
        <span>Add to Cart</span>
      </span>

      {/* ADDED content */}
      <span className="atc-added-content">
        <Check size={14} strokeWidth={3} />
        <span>Added!</span>
      </span>
    </button>
  );
}