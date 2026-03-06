// FILE: src/app/components/home/StatsBar.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, Sparkles, Award, MapPin } from "lucide-react";

function useInView(threshold = 0.2) {
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

function Counter({ target, suffix = "", duration = 2200 }) {
  const [count, setCount] = useState(0);
  const [ref, inView]     = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const tick = (ts) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - prog, 3);
      setCount(Math.floor(ease * target));
      if (prog < 1) requestAnimationFrame(tick);
      else setCount(target);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const STATS = [
  {
    icon: Heart,
    value: 5000, suffix: "+",
    label: "Happy Customers",
    sub: "Across India & beyond",
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    ringColor: "ring-red-100",
    delay: "[animation-delay:0ms]",
  },
  {
    icon: Sparkles,
    value: 200, suffix: "+",
    label: "Unique Designs",
    sub: "Handcrafted with care",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    ringColor: "ring-amber-100",
    delay: "[animation-delay:100ms]",
  },
  {
    icon: Award,
    value: 4, suffix: "+",
    label: "Years of Craft",
    sub: "Trusted since 2020",
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    ringColor: "ring-green-100",
    delay: "[animation-delay:200ms]",
  },
  {
    icon: MapPin,
    value: 28, suffix: "",
    label: "States Delivered",
    sub: "Nationwide shipping",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
    ringColor: "ring-violet-100",
    delay: "[animation-delay:300ms]",
  },
];

export default function StatsBar() {
  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .stat-card {
          opacity: 0;
          animation: fadeUp 0.55s ease forwards;
        }
      `}</style>

      <section className="bg-white border-y border-border">

        {/* ── Label row ── */}
        <div className="max-w-6xl mx-auto px-5 md:px-8 pt-10 pb-0 flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="shrink-0 text-[10.5px] font-bold tracking-[2.5px] uppercase text-text-secondary">
            Trusted across India
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* ── 4-col grid ── */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-0 md:divide-x md:divide-border">

            {STATS.map(({ icon: Icon, value, suffix, label, sub, iconBg, iconColor, ringColor, delay }, i) => (
              <div
                key={i}
                className={`stat-card ${delay} group flex flex-col items-center text-center px-6 py-8 rounded-2xl md:rounded-none bg-bg-main md:bg-transparent hover:bg-bg-main transition-all duration-300 cursor-default`}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl ${iconBg} ring-4 ${ringColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={20} className={iconColor} strokeWidth={1.8} />
                </div>

                {/* Number */}
                <p className="text-4xl md:text-[40px] font-bold text-blue-dark leading-none tracking-tight mb-2">
                  <Counter target={value} suffix={suffix} />
                </p>

                {/* Divider dot */}
                <div className="w-1 h-1 rounded-full bg-gold mb-3" />

                {/* Label */}
                <p className="text-[13px] font-semibold text-text-primary leading-tight mb-1">
                  {label}
                </p>

                {/* Sub */}
                <p className="text-[11px] text-text-secondary leading-tight">
                  {sub}
                </p>
              </div>
            ))}

          </div>
        </div>

        {/* ── Bottom accent ── */}
        <div
          className="h-[3px]"
          style={{ background: "linear-gradient(90deg, transparent 0%, var(--color-gold) 35%, var(--color-blue-dark) 65%, transparent 100%)" }}
        />

      </section>
    </>
  );
}