// FILE: src/app/components/home/StatsBar.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, Sparkles, Award, MapPin } from "lucide-react";

function useInView(threshold = 0.3) {
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

function Counter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, inView]     = useInView();
  useEffect(() => {
    if (!inView) return;
    let val = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      val += step;
      if (val >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(val));
    }, 16);
    return () => clearInterval(t);
  }, [inView, target, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const STATS = [
  { icon: Heart,    color: "#ef4444", bg: "#fef2f2", value: 5000, suffix: "+", label: "Happy Customers"  },
  { icon: Sparkles, color: "#d97706", bg: "#fef9ed", value: 200,  suffix: "+", label: "Unique Designs"   },
  { icon: Award,    color: "#16a34a", bg: "#f0fdf4", value: 4,    suffix: "+",  label: "Years of Craft"   },
  { icon: MapPin,   color: "#7c3aed", bg: "#faf5ff", value: 28,   suffix: "",   label: "States Delivered" },
];

export default function StatsBar() {
  return (
    <section style={{ background: "var(--color-white)", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {STATS.map(({ icon: Icon, color, bg, value, suffix, label }, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-4 rounded-2xl"
              style={{ background: bg }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <Icon size={18} style={{ color }} />
              </div>
              <div className="text-center sm:text-left">
                <p style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 800, color: "var(--color-blue-dark)", lineHeight: 1, fontFamily: "'Cormorant Garamond',serif" }}>
                  <Counter target={value} suffix={suffix} />
                </p>
                <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", fontWeight: 600, marginTop: 3 }}>
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}