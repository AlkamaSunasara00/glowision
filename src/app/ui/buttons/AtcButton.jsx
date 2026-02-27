"use client";

import { useState } from "react";
import { ShoppingCart, Plus, Check } from "lucide-react";
import "./atcButton.css";

export default function AddToCartButton({ onClick, className = "", style = {} }) {
  const [phase, setPhase] = useState("idle"); // "idle" | "loading" | "added"

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (phase !== "idle") return;
    if (onClick) onClick(e);
    setPhase("loading");
    setTimeout(() => setPhase("added"), 1500);
  };

  return (
    <button
      onClick={handleClick}
      className={`atc-btn ${phase === "loading" ? "atc-loading" : ""} ${phase === "added" ? "atc-added" : ""} ${className}`}
      style={style}
    >
      {/* Progress track */}
      <span className="atc-track" />

      {/* Sliding cart */}
      <span className="atc-cart-slider">
        <ShoppingCart size={18} className="atc-cart-icon" />
        <span className="atc-trace atc-trace-1" />
        <span className="atc-trace atc-trace-2" />
      </span>

      {/* IDLE */}
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

      {/* ADDED */}
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