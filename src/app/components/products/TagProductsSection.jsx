"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PRODUCTS } from "@/app/data/productsData";
import { getSalePrice, getTagLabel } from "./catalogUtils";

function SectionCard({ product }) {
  const badgeStyle = {
    "Best Seller": { bg: "#1a2e6e", color: "#fff" },
    New: { bg: "#16a34a", color: "#fff" },
    Sale: { bg: "#dc2626", color: "#fff" },
    Premium: { bg: "#92400e", color: "#fff" },
    Popular: { bg: "#0369a1", color: "#fff" },
  }[product.badge] || { bg: "#475792", color: "#fff" };

  const image = product.images?.flatMap((entry) => entry.images)?.[0] || "";
  const mrp = product.dimensions?.[0]?.mrp || 0;
  const price = getSalePrice(product);

  return (
    <Link
      href={`/${product.category}/${product.slug}`}
      className="group flex flex-col w-[46vw] shrink-0 snap-start grow overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 sm:w-[30vw] md:w-[22vw] lg:w-[17vw]"
    >
      <div className="relative aspect-square  overflow-hidden bg-bg-main">
        <img
          src={image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {product.badge ? (
          <div
            className="absolute left-2 top-2 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase"
            style={{ background: badgeStyle.bg, color: badgeStyle.color }}
          >
            {product.badge}
          </div>
        ) : null}
      </div>
      <div className="flex flex-col grow p-3">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-blue capitalize">
          {product.category.replace(/-/g, " ")}
        </p>
        <h3 className="mb-2 line-clamp-2 text-[13px] font-semibold leading-snug text-text-primary">
          {product.title}
        </h3>
        <div className="mt-auto flex items-center gap-2">
          <span className="text-[15px] font-bold text-blue-dark">
            ₹{price.toLocaleString()}
          </span>
          <span className="text-[11px] text-text-secondary line-through">
            ₹{mrp.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function TagProductsSection({
  tag,
  heading,
  subtitle = "",
  limit = 10,
}) {
  const sliderRef = useRef(null);
  const [activeBtn, setActiveBtn] = useState(null);

  const products = PRODUCTS.filter((product) => product.tags?.[tag]).slice(
    0,
    limit,
  );
  if (products.length === 0) return null;

  const label = getTagLabel(tag);

  const move = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    setActiveBtn(direction > 0 ? "right" : "left");
    window.setTimeout(() => setActiveBtn(null), 260);

    const firstCard = slider.querySelector("[data-tag-card='true']");
    const step = firstCard
      ? firstCard.clientWidth + 12
      : slider.clientWidth * 0.85;

    slider.scrollBy({
      left: direction * step * 2,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-8 md:py-10">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-[11px] font-bold uppercase tracking-[1px] text-blue">
              {label} Collection
            </p>
            <h2 className="text-2xl font-bold text-blue-dark md:text-3xl">
              {heading}
            </h2>
            {subtitle ? (
              <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>
            ) : null}
          </div>
        </div>

        <div className="group relative">
          <button
            type="button"
            onClick={() => move(-1)}
            className={`absolute left-0 top-1/2 z-10 flex h-16 w-9 -translate-y-1/2 items-center justify-center rounded-r-2xl shadow-md transition-all duration-300 md:h-20 md:w-10 ${
              activeBtn === "left"
                ? "bg-gold text-white"
                : "bg-white text-blue-dark hover:bg-gold hover:text-white"
            }`}
          >
            <ChevronLeft size={18} />
          </button>

          <div
            ref={sliderRef}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {products.map((product) => (
              <div
                key={`${tag}-${product.id}`}
                data-tag-card="true"
                className="flex"
              >
                <SectionCard product={product} />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => move(1)}
            className={`absolute right-0 top-1/2 z-10 flex h-16 w-9 -translate-y-1/2 items-center justify-center rounded-l-2xl  transition-all duration-300 md:h-20 md:w-10 ${
              activeBtn === "right"
                ? "bg-gold text-white"
                : "bg-white text-blue-dark hover:bg-gold hover:text-white"
            }`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
