// FILE: src/app/components/home/InstagramGallery.jsx
"use client";

import { Instagram } from "lucide-react";

// Replace with real Instagram image paths when available
const POSTS = [
  { id: 1, src: "/images/instagram/post1.jpg", alt: "Ayatul Kursi frame in home" },
  { id: 2, src: "/images/instagram/post2.jpg", alt: "Wall clock in living room"  },
  { id: 3, src: "/images/instagram/post3.jpg", alt: "Key holder setup"           },
  { id: 4, src: "/images/instagram/post4.jpg", alt: "Kaaba shadow box"           },
  { id: 5, src: "/images/instagram/post5.jpg", alt: "Ramadan decor"              },
  { id: 6, src: "/images/instagram/post6.jpg", alt: "Gift set unboxing"          },
];

const GRADIENTS = [
  "135deg,#1a2e6e,#2d3d7a",
  "135deg,#92400e,#b45309",
  "135deg,#065f46,#047857",
  "135deg,#4c1d95,#6d28d9",
  "135deg,#991b1b,#dc2626",
  "135deg,#0e7490,#0891b2",
];

const EMOJIS = ["🖼️","🕐","🗝️","🌙","✨","🎁"];

export default function InstagramGallery() {
  return (
    <section style={{ background: "var(--color-white)", borderTop: "1px solid var(--color-border)" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
            style={{ background: "#fce7f3", border: "1px solid #f9a8d4" }}>
            <Instagram size={12} style={{ color: "#E1306C" }} />
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#E1306C", letterSpacing: "1px", textTransform: "uppercase" }}>
              Instagram
            </span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 600, color: "var(--color-blue-dark)", lineHeight: 1.15 }}>
            As Seen in Real Homes
          </h2>
          <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginTop: 6 }}>
            Follow us{" "}
            <a href="https://www.instagram.com/glowisongraphics?igsh=MTI1eW13MW9qamxlMg==" target="_blank" rel="noopener noreferrer"
              style={{ color: "#E1306C", fontWeight: 700 }}>
              @glowisongraphics
            </a>
            {" "}for daily inspiration
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {POSTS.map((post, i) => (
            <a key={post.id}
              href="https://www.instagram.com/glowisongraphics?igsh=MTI1eW13MW9qamxlMg=="
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-xl overflow-hidden block"
              style={{ background: `linear-gradient(${GRADIENTS[i]})` }}>

              {/* Image */}
              <img src={post.src} alt={post.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => e.target.style.display = "none"} />

              {/* Fallback emoji */}
              <div className="absolute inset-0 flex items-center justify-center"
                style={{ fontSize: 28, opacity: 0.6 }}>
                {EMOJIS[i]}
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: "rgba(225,48,108,0.6)" }}>
                <Instagram size={22} style={{ color: "white" }} />
              </div>
            </a>
          ))}
        </div>

        {/* Follow CTA */}
        <div className="mt-6 flex justify-center">
          <a href="https://www.instagram.com/glowisongraphics?igsh=MTI1eW13MW9qamxlMg==" target="_blank" rel="noopener noreferrer">
            <button style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 24px", borderRadius: "999px", background: "linear-gradient(135deg,#E1306C,#F77737)", color: "white", fontWeight: 700, fontSize: "13px", cursor: "pointer", border: "none", fontFamily: "'DM Sans',sans-serif", transition: "all 0.2s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(225,48,108,0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <Instagram size={15} /> Follow @glowisongraphics
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}