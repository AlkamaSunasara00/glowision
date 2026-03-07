"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, Gift, Home, Moon, Cake, Gem,
  LayoutGrid, ChevronRight, Wand2,
} from "lucide-react";
import { PRODUCTS }   from "@/app/data/productsData";
import { CATEGORIES } from "@/app/data/categoriesData";
import ProductCard     from "@/app/ui/cards/ProductCard";

const SUB_META = {
  "wedding-gifts":      { Icon: Gem,  accent: "#be123c", soft: "#fff1f2" },
  "birthday-gifts":     { Icon: Cake, accent: "#b45309", soft: "#fffbeb" },
  "housewarming-gifts": { Icon: Home, accent: "#0369a1", soft: "#eff6ff" },
  "eid-gifts":          { Icon: Moon, accent: "#6d28d9", soft: "#f5f3ff" },
};
const FALLBACK_META = { Icon: Gift, accent: "#1a2e6e", soft: "#eff6ff" };
const ALL_TAB = "__all__";

export default function GiftingSection() {
  const giftsCategory = CATEGORIES.find((c) => c.slug === "gifts");
  const subcategories = giftsCategory?.subcategories ?? [];

  const [activeTab, setActiveTab] = useState(ALL_TAB);
  const [animKey,   setAnimKey]   = useState(0);

  const activeProducts = (() => {
    if (activeTab === ALL_TAB)
      return PRODUCTS.filter((p) => p.category === "gifts").slice(0, 4);
    return PRODUCTS
      .filter((p) => p.category === "gifts" && p.subcategory === activeTab)
      .slice(0, 4);
  })();

  const activeSub  = subcategories.find((s) => s.slug === activeTab) ?? null;
  const activeMeta = activeSub ? (SUB_META[activeSub.slug] ?? FALLBACK_META) : null;
  const accent     = activeSub?.accentColor ?? activeMeta?.accent ?? "#1a2e6e";
  const bgImage    = activeSub?.bgImage     ?? null;
  const bgColor    = activeSub?.bgColor     ?? "#fdf8f3";

  const handleTabChange = (slug) => {
    if (slug === activeTab) return;
    setActiveTab(slug);
    setAnimKey((k) => k + 1);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');

        .gs2-section {
          position: relative;
          background: #fdf8f3;
          border-top: 1px solid #ede8e0;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        /* ─────────────────────────────────────────
           BG PANEL: centered, full-section coverage,
           fades to transparent at all 4 edges so
           opacity is perceptually uniform in the
           middle and never harsh at the borders.
        ───────────────────────────────────────── */
        .gs2-bg-panel {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          transition: opacity 0.55s ease;
        }
        /*
          The ::after pseudo creates the 4-edge vignette.
          It blends out the image toward all edges,
          leaving the CENTER fully visible at the set opacity.
        */
        .gs2-bg-panel::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 80% 75% at 50% 50%,
            transparent 20%,
            #fdf8f3 85%
          );
        }

        .gs2-accent-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          z-index: 2;
          transition: background 0.5s ease;
        }

        .gs2-tabs {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .gs2-tab {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 16px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          border: 1.5px solid #e5e7eb;
          transition: all 0.25s cubic-bezier(0.34,1.2,0.64,1);
          white-space: nowrap;
          background: #fff;
          color: #374151;
        }
        .gs2-tab:hover {
          border-color: #d1d5db;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.07);
        }
        .gs2-tab.active {
          color: #fff;
          border-color: transparent;
          box-shadow: 0 4px 18px rgba(0,0,0,0.18);
          transform: translateY(-1px);
        }
        .gs2-tab-icon {
          width: 22px; height: 22px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.2);
          flex-shrink: 0;
        }
        .gs2-tab:not(.active) .gs2-tab-icon { background: rgba(0,0,0,0.06); }

        @keyframes gs2CardIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .gs2-card-wrap { opacity: 0; animation: gs2CardIn 0.4s ease forwards; }
        .gs2-card-wrap:nth-child(1) { animation-delay: 0.04s; }
        .gs2-card-wrap:nth-child(2) { animation-delay: 0.10s; }
        .gs2-card-wrap:nth-child(3) { animation-delay: 0.16s; }
        .gs2-card-wrap:nth-child(4) { animation-delay: 0.22s; }

        .gs2-empty {
          grid-column: 1 / -1;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 48px 24px; text-align: center; gap: 10px;
          background: #fff; border-radius: 20px;
          border: 1.5px dashed #e5e7eb;
        }

        .gs2-banner {
          position: relative; border-radius: 20px; overflow: hidden;
          padding: 24px 28px; display: flex; flex-direction: column;
          gap: 16px; align-items: flex-start;
          background: #fff; border: 1.5px solid #e5e7eb;
          transition: border-color 0.4s ease;
        }
        @media (min-width: 640px) {
          .gs2-banner { flex-direction: row; align-items: center; justify-content: space-between; }
        }
        .gs2-banner-decor {
          position: absolute; top: -20px; right: -20px;
          width: 120px; height: 120px; border-radius: 50%;
          opacity: 0.06; transition: background 0.4s ease;
        }
        .gs2-banner-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 24px; border-radius: 999px;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 700;
          border: none; cursor: pointer; white-space: nowrap;
          color: #fff; transition: all 0.25s ease; text-decoration: none; flex-shrink: 0;
        }
        .gs2-banner-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }

        @keyframes gs2FadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .gs2-header { animation: gs2FadeUp 0.55s ease forwards; }
      `}</style>

      <section className="gs2-section">

        {/* Accent bar */}
        <div
          className="gs2-accent-bar"
          style={{
            background: activeMeta
              ? `linear-gradient(90deg, ${accent}, ${accent}88)`
              : "linear-gradient(90deg, #F2B461, #1a2e6e)",
          }}
        />

        {/* ── Centered background — uniform opacity, fades at all edges ── */}
        <div
          className="gs2-bg-panel"
          style={
            bgImage
              ? {
                  backgroundImage:    `url(${bgImage})`,
                  backgroundSize:     "cover",
                  backgroundPosition: "center center",
                  // opacity: 0.1,        /* same across entire image — vignette handled by ::after */
                }
              : {
                  background: bgColor,
                  opacity: 0.6,         /* same soft wash everywhere */
                }
          }
        />

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20 relative z-10">

          {/* Header */}
          <div className="gs2-header flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
                style={{ background: accent + "14", border: `1px solid ${accent}30` }}
              >
                <Gift size={11} style={{ color: accent }} />
                <span style={{ fontSize: "10.5px", fontWeight: 700, color: accent, letterSpacing: "1.5px", textTransform: "uppercase" }}>
                  Gift Studio
                </span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,4.5vw,46px)", fontWeight: 600, color: "#0d1b3e", lineHeight: 1.1, marginBottom: 8 }}>
                Perfect for{" "}
                <em style={{ color: accent, fontStyle: "italic", transition: "color 0.4s ease" }}>
                  {activeSub ? activeSub.name : "Every Occasion"}
                </em>
              </h2>
              <p style={{ fontSize: "14px", color: "#6b7280", maxWidth: 400, lineHeight: 1.65 }}>
                {activeSub
                  ? `Explore our handpicked ${activeSub.name} collection — thoughtfully crafted to make moments memorable.`
                  : "From Eid mornings to wedding gifts — handcrafted pieces that make every moment unforgettable."}
              </p>
            </div>
            <Link
              href="/gifts"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold shrink-0 transition-all duration-200"
              style={{ background: "#fff", border: "1.5px solid #e5e7eb", color: "#374151" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#374151"; }}
            >
              View All Gifts <ArrowRight size={14} />
            </Link>
          </div>

          {/* Tabs */}
          <div className="gs2-tabs mb-8">
            <button
              className={`gs2-tab${activeTab === ALL_TAB ? " active" : ""}`}
              style={activeTab === ALL_TAB ? { background: "#1a2e6e" } : {}}
              onClick={() => handleTabChange(ALL_TAB)}
            >
              <span className="gs2-tab-icon"><LayoutGrid size={12} /></span>
              All Gifts
            </button>
            {subcategories.map((sub) => {
              const meta  = SUB_META[sub.slug] ?? FALLBACK_META;
              const Icon  = meta.Icon;
              const isAct = activeTab === sub.slug;
              return (
                <button
                  key={sub.slug}
                  className={`gs2-tab${isAct ? " active" : ""}`}
                  style={isAct ? { background: sub.accentColor ?? meta.accent } : {}}
                  onClick={() => handleTabChange(sub.slug)}
                >
                  <span className="gs2-tab-icon"><Icon size={12} /></span>
                  {sub.name}
                </button>
              );
            })}
          </div>

          {/* Sub info strip */}
          {activeSub && activeMeta && (
            <div
              className="flex items-center justify-between px-5 py-3 rounded-2xl mb-6"
              style={{ background: activeMeta.soft, border: `1px solid ${accent}25` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: accent + "18" }}>
                  <activeMeta.Icon size={16} style={{ color: accent }} />
                </div>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#0d1b3e" }}>{activeSub.name}</p>
                  <p style={{ fontSize: "11px", color: "#6b7280" }}>{activeProducts.length} products shown</p>
                </div>
              </div>
              <Link
                href={`/gifts/sub/${activeSub.slug}`}
                className="inline-flex items-center gap-1.5 text-[12px] font-semibold"
                style={{ color: accent }}
              >
                See all <ChevronRight size={13} />
              </Link>
            </div>
          )}

          {/* Product Grid */}
          <div key={animKey} className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
            {activeProducts.length > 0 ? (
              activeProducts.map((product) => (
                <div key={product.id} className="gs2-card-wrap">
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className="gs2-empty">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-1" style={{ background: accent + "14" }}>
                  <Gift size={24} style={{ color: accent }} />
                </div>
                <p style={{ fontWeight: 700, fontSize: "15px", color: "#0d1b3e" }}>Coming Soon</p>
                <p style={{ fontSize: "13px", color: "#9ca3af" }}>No products yet in this category.</p>
                <Link href="/gifts" className="inline-flex items-center gap-1.5 mt-2 text-[13px] font-semibold" style={{ color: accent }}>
                  Browse all gifts <ArrowRight size={13} />
                </Link>
              </div>
            )}
          </div>

          {/* Banner */}
          <div className="gs2-banner" style={{ borderColor: accent + "30" }}>
            <div className="gs2-banner-decor" style={{ background: accent }} />
            <div className="flex items-center gap-4 relative z-10">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: accent + "12", border: `1px solid ${accent}25` }}
              >
                <Wand2 size={22} style={{ color: accent }} />
              </div>
              <div>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "19px", fontWeight: 700, color: "#0d1b3e", marginBottom: 3 }}>
                  Need a custom gift?
                </p>
                <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.55 }}>
                  Personalised name, message, or design — we'll make it truly special.
                </p>
              </div>
            </div>
            <Link href="/quote" className="gs2-banner-btn relative z-10" style={{ background: accent }}>
              Customise a Gift <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}