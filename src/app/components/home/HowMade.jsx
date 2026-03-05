// FILE: src/app/components/home/HowItsMade.jsx
"use client";

import { useRef, useEffect, useState } from "react";
import { PenTool, Cpu, Sparkles, Package } from "lucide-react";

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

const STEPS = [
  {
    icon: PenTool,
    step: "01",
    title: "Design",
    desc: "Our in-house designers sketch the calligraphy and layout. Arabic text verified by Islamic scholars before production begins.",
    color: "var(--color-blue)",
    bg:    "var(--color-blue-soft)",
  },
  {
    icon: Cpu,
    step: "02",
    title: "Laser Cut",
    desc: "CNC laser cutters work to 0.1mm precision on acrylic, MDF, or metal. Every edge is clean and perfectly calibrated.",
    color: "#d97706",
    bg:    "#fef9ed",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Finish & Plate",
    desc: "Gold plating, matte painting, or UV coating applied by hand. Each piece polished until it meets our quality standard.",
    color: "#16a34a",
    bg:    "#f0fdf4",
  },
  {
    icon: Package,
    step: "04",
    title: "Pack & Deliver",
    desc: "Triple-layer foam packaging, bubble wrap sealed, and shipped to your door anywhere in India within 5–7 business days.",
    color: "#7c3aed",
    bg:    "#faf5ff",
  },
];

export default function HowItsMade() {
  const [ref, inView] = (() => {
    const r = useRef(null);
    const [v, setV] = useState(false);
    useEffect(() => {
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
      if (r.current) obs.observe(r.current);
      return () => obs.disconnect();
    }, []);
    return [r, v];
  })();

  return (
    <section style={{ background: "var(--color-blue-dark)", position: "relative", overflow: "hidden" }}>
      {/* Gold top line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,transparent,var(--color-gold),transparent)" }} />
      {/* Dot grid */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "radial-gradient(circle,white 1px,transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20" style={{ position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
            style={{ background: "rgba(242,180,97,0.12)", border: "1px solid rgba(242,180,97,0.3)" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-gold)", letterSpacing: "1px", textTransform: "uppercase" }}>
              Our Process
            </span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 600, color: "#fff", lineHeight: 1.15 }}>
            From Idea to Your Wall
          </h2>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", marginTop: 8, maxWidth: 420, margin: "8px auto 0" }}>
            Every piece goes through a meticulous 4-step process before it reaches you.
          </p>
        </div>

        {/* Steps */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {/* Connector line — desktop only */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px"
            style={{ background: "rgba(255,255,255,0.1)", zIndex: 0 }} />

          {STEPS.map(({ icon: Icon, step, title, desc, color, bg }, i) => (
            <div key={i}
              style={{
                opacity:    inView ? 1 : 0,
                transform:  inView ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.6s ease ${i * 100}ms, transform 0.6s ease ${i * 100}ms`,
                background: "rgba(255,255,255,0.06)",
                border:     "1px solid rgba(255,255,255,0.1)",
                borderRadius: 20,
                padding:    24,
                position:   "relative",
                zIndex:     1,
              }}>
              {/* Step number */}
              <div className="absolute top-4 right-4"
                style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 700, color: "rgba(255,255,255,0.08)", lineHeight: 1 }}>
                {step}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: bg }}>
                <Icon size={22} style={{ color }} />
              </div>

              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: 8 }}>{title}</h3>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.75 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}