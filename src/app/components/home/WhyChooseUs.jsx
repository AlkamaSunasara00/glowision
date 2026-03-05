// FILE: src/app/components/home/WhyChooseUs.jsx
"use client";

import { useRef, useEffect, useState } from "react";
import { Shield, Package, Award, Zap, Heart, Clock } from "lucide-react";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity:    inView ? 1 : 0,
      transform:  inView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

const USPs = [
  { icon: Shield,  color: "var(--color-blue)", bg: "var(--color-blue-soft)", title: "Quality Guaranteed",   desc: "Every piece hand-inspected before shipping. We accept returns if you're not 100% satisfied."       },
  { icon: Package, color: "#16a34a",            bg: "#f0fdf4",               title: "Safe Packaging",        desc: "Triple-layer foam protection. Under 0.3% breakage rate across 5,000+ orders shipped."              },
  { icon: Award,   color: "#d97706",            bg: "#fef9ed",               title: "Authentic Calligraphy", desc: "Every Arabic verse verified by Islamic scholars. Accuracy in sacred text is non-negotiable."        },
  { icon: Zap,     color: "#7c3aed",            bg: "#faf5ff",               title: "Fast Production",       desc: "Standard orders ready in 3–5 days. Express 48-hour production available on select items."          },
  { icon: Heart,   color: "#ef4444",            bg: "#fef2f2",               title: "Made With Love",        desc: "Family-owned since 2020. Every order is personal to us — we care about what hangs in your home."   },
  { icon: Clock,   color: "#0891b2",            bg: "#ecfeff",               title: "Pan-India Delivery",    desc: "Delivered to all 28 states. Free shipping on orders above ₹999. COD available nationwide."          },
];

export default function WhyChooseUs() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
      <Reveal className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
          style={{ background: "var(--color-gold-soft)", border: "1px solid var(--color-gold)" }}>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-gold)", letterSpacing: "1px", textTransform: "uppercase" }}>
            Why Glowison
          </span>
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 600, color: "var(--color-blue-dark)", lineHeight: 1.15 }}>
          Why Thousands Trust Us
        </h2>
        <p style={{ fontSize: "15px", color: "var(--color-text-secondary)", marginTop: 8, maxWidth: 480, margin: "8px auto 0" }}>
          We don't just make wall art — we craft pieces that mean something.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {USPs.map(({ icon: Icon, color, bg, title, desc }, i) => (
          <Reveal key={i} delay={i * 60}>
            <div className="group rounded-2xl p-6 h-full transition-all duration-200"
              style={{ background: "var(--color-white)", border: "1px solid var(--color-border)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 12px 30px rgba(0,0,0,0.08)`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: bg }}>
                <Icon size={20} style={{ color }} />
              </div>
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-blue-dark)", marginBottom: 8 }}>
                {title}
              </h3>
              <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: 1.75 }}>
                {desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}