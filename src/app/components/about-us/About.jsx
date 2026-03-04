// FILE: src/app/components/AboutPage.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Award,
  Heart,
  Zap,
  Shield,
  Users,
  Package,
  ArrowRight,
  Star,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Sparkles,
  Clock,
  CheckCircle,
  PenTool,
  Layers,
  TrendingUp,
  Gift,
} from "lucide-react";

// ── Intersection Observer hook ────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// ── Animated counter ──────────────────────────────────────────────────────────
function Counter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.3);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(t);
      } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(t);
  }, [inView, target, duration]);
  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ── Reveal on scroll ──────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Section label pill ────────────────────────────────────────────────────────
function SectionPill({ children, color = "gold" }) {
  const styles = {
    gold: {
      bg: "var(--color-gold-soft)",
      border: "var(--color-gold)",
      text: "var(--color-gold)",
    },
    blue: {
      bg: "var(--color-blue-soft)",
      border: "var(--color-blue)",
      text: "var(--color-blue)",
    },
  };
  const s = styles[color];
  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
      style={{ background: s.bg, border: `1px solid ${s.border}` }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: s.text,
          display: "inline-block",
        }}
      />
      <span
        style={{
          fontSize: "11px",
          fontWeight: 700,
          color: s.text,
          letterSpacing: "1.2px",
          textTransform: "uppercase",
        }}
      >
        {children}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&display=swap');

        .ab-page { font-family: 'DM Sans', sans-serif; }
        .ab-serif { font-family: 'Cormorant Garamond', serif !important; }

        /* Shimmer text */
        .ab-shimmer {
          background: linear-gradient(90deg, var(--color-gold) 0%, #ffe9a0 40%, var(--color-gold) 60%, #c8820a 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: ab-shine 3.5s linear infinite;
        }
        @keyframes ab-shine { from{background-position:0% center} to{background-position:200% center} }

        /* Float */
        .ab-float { animation: ab-floatanim 4s ease-in-out infinite; }
        @keyframes ab-floatanim {
          0%,100% { transform: translateY(0px) rotate(-1deg); }
          50%      { transform: translateY(-10px) rotate(1deg); }
        }

        /* Card lift */
        .ab-card { transition: transform 0.3s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.3s ease; }
        .ab-card:hover { transform: translateY(-5px); box-shadow: 0 18px 48px rgba(26,46,110,0.12); }

        /* Value icon */
        .ab-val:hover .ab-icon-wrap { transform: scale(1.1) rotate(-3deg); }
        .ab-icon-wrap { transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }

        /* Scrollbar hide */
        .ab-noscroll::-webkit-scrollbar { display:none; }
        .ab-noscroll { -ms-overflow-style:none; scrollbar-width:none; }

        /* Diagonal clip */
        .ab-diagonal { clip-path: polygon(0 0, 100% 0, 100% 92%, 0 100%); }

        /* Quote mark */
        .ab-quote-mark {
          font-family: 'Cormorant Garamond', serif;
          font-size: 110px;
          color: var(--color-gold);
          opacity: 0.18;
          position: absolute;
          top: -16px;
          left: -8px;
          line-height: 1;
          pointer-events: none;
          content: '"';
        }

        /* CTA btn */
        .ab-cta {
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .ab-cta::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .ab-cta:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(26,46,110,0.32); }
        .ab-cta:hover::after { opacity: 1; }

        /* Custom section glow card */
        .ab-custom-card {
          background: linear-gradient(135deg, var(--color-blue-dark) 0%, #1e2f5a 100%);
          transition: all 0.3s ease;
        }
        .ab-custom-card:hover { transform: translateY(-4px); box-shadow: 0 24px 60px rgba(26,46,110,0.3); }
      `}</style>

      <div
        className="ab-page min-h-screen"
        style={{ background: "var(--color-bg-main)" }}
      >
        {/* ══════════════════════════════════════════════════
            BREADCRUMB — white, separate from hero
            ══════════════════════════════════════════════════ */}
        <div
          style={{
            background: "var(--color-white)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <div className="max-w-7xl mx-auto px-5 md:px-8 py-4">
            <nav className="flex items-center gap-2 text-[13px]">
              <Link
                href="/"
                className="transition-colors font-medium"
                style={{ color: "var(--color-text-secondary)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-blue)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-text-secondary)")
                }
              >
                Home
              </Link>
              <ChevronRight
                size={13}
                style={{ color: "var(--color-border)" }}
              />
              <span
                style={{ color: "var(--color-text-primary)", fontWeight: 600 }}
              >
                About Us
              </span>
            </nav>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            HERO
            ══════════════════════════════════════════════════ */}
        <section
          className="ab-diagonal relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, var(--color-blue-dark) 0%, #1e2f5a 55%, #0d1a3a 100%)",
            paddingTop: "clamp(64px,10vw,70px)",
            paddingBottom: "clamp(96px,14vw,180px)",
          }}
        >
          {/* Gold top line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background:
                "linear-gradient(90deg,transparent,var(--color-gold),transparent)",
            }}
          />

          {/* Dot grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.04,
              backgroundImage:
                "radial-gradient(circle, var(--color-gold) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              pointerEvents: "none",
            }}
          />

          {/* Orbs */}
          <div
            style={{
              position: "absolute",
              top: "8%",
              right: "6%",
              width: 320,
              height: 320,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(242,180,97,0.1) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "18%",
              left: "4%",
              width: 200,
              height: 200,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(71,87,146,0.25) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
              {/* Left */}
              <div className="flex-1 text-center lg:text-left">
                <SectionPill color="gold">Our Story</SectionPill>

                <h1
                  className="ab-serif"
                  style={{
                    fontSize: "clamp(40px,6vw,76px)",
                    fontWeight: 600,
                    lineHeight: 1.05,
                    color: "#fff",
                    marginBottom: 24,
                  }}
                >
                  Crafting Beauty
                  <br />
                  <span className="ab-shimmer">With Purpose</span>
                </h1>

                <p
                  style={{
                    fontSize: "clamp(15px,1.5vw,17px)",
                    color: "rgba(255,255,255,0.62)",
                    lineHeight: 1.85,
                    maxWidth: 500,
                    marginBottom: 40,
                  }}
                >
                  Glowison was born from a simple belief — that Islamic art
                  deserves to live in every home. We fuse centuries of
                  calligraphic tradition with modern precision manufacturing to
                  create pieces that resonate with both faith and beauty.
                </p>

                <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
                  <Link href="/products">
                    <button
                      className="ab-cta flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-bold text-[14px] cursor-pointer"
                      style={{
                        background: "var(--color-gold)",
                        color: "var(--color-blue-dark)",
                      }}
                    >
                      Shop Collection
                      <ArrowRight size={16} />
                    </button>
                  </Link>
                  <a
                    href="#our-story"
                    className="ab-cta flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[14px] cursor-pointer"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      color: "white",
                    }}
                  >
                    Our Journey
                  </a>
                </div>
              </div>

              {/* Right — stat cards */}
              <div className="flex-shrink-0 w-full lg:w-auto">
                <div className="grid grid-cols-2 gap-3 max-w-[320px] mx-auto">
                  {[
                    {
                      value: 5000,
                      suffix: "+",
                      label: "Happy Customers",
                      icon: Heart,
                      color: "#ef4444",
                      highlight: false,
                    },
                    {
                      value: 200,
                      suffix: "+",
                      label: "Unique Designs",
                      icon: Sparkles,
                      color: "var(--color-blue-dark)",
                      highlight: true,
                    },
                    {
                      value: 4,
                      suffix: "+",
                      label: "Years of Craft",
                      icon: Award,
                      color: "#22c55e",
                      highlight: false,
                    },
                    {
                      value: 28,
                      suffix: "",
                      label: "States Delivered",
                      icon: MapPin,
                      color: "var(--color-blue)",
                      highlight: false,
                    },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="ab-card rounded-2xl p-5 text-center"
                      style={{
                        background: s.highlight
                          ? "var(--color-gold)"
                          : "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <s.icon
                        size={20}
                        style={{
                          color: s.highlight
                            ? "var(--color-blue-dark)"
                            : s.color,
                          margin: "0 auto 10px",
                        }}
                      />
                      <div
                        className="ab-serif"
                        style={{
                          fontSize: "clamp(28px,4vw,38px)",
                          fontWeight: 700,
                          color: s.highlight
                            ? "var(--color-blue-dark)"
                            : "#fff",
                          lineHeight: 1,
                        }}
                      >
                        <Counter target={s.value} suffix={s.suffix} />
                      </div>
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          color: s.highlight
                            ? "rgba(26,46,110,0.7)"
                            : "rgba(255,255,255,0.55)",
                          marginTop: 5,
                          textTransform: "uppercase",
                          letterSpacing: "0.8px",
                        }}
                      >
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            OUR STORY
            ══════════════════════════════════════════════════ */}
        <section
          id="our-story"
          className="max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-32"
        >
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
            {/* Image mosaic */}
            <Reveal className="flex-1 w-full" delay={0}>
              <div className="relative grid grid-cols-2 gap-3 max-w-lg mx-auto lg:max-w-none">
                <div
                  className="col-span-2 rounded-3xl overflow-hidden relative"
                  style={{
                    background:
                      "linear-gradient(135deg,var(--color-blue-dark),#253573)",
                    aspectRatio: "16/9",
                  }}
                >
                  <img
                    src="/images/about/workshop.jpg"
                    alt="Workshop"
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <Layers
                      size={40}
                      style={{ color: "rgba(255,255,255,0.25)" }}
                    />
                    <p className="ab-serif text-white/50 text-[15px]">
                      Our Workshop
                    </p>
                  </div>
                  {/* Floating badge */}
                  <div
                    className="ab-float absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full"
                    style={{
                      background: "var(--color-gold)",
                      boxShadow: "0 8px 24px rgba(242,180,97,0.4)",
                    }}
                  >
                    <Star
                      size={13}
                      style={{ color: "var(--color-blue-dark)" }}
                      fill="currentColor"
                    />
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "var(--color-blue-dark)",
                      }}
                    >
                      Est. 2020 · Surat, India
                    </span>
                  </div>
                </div>

                {[
                  { icon: PenTool, label: "Precision Craft" },
                  { icon: CheckCircle, label: "Quality Finish" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden relative flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg,${i === 0 ? "#1a2e6e,#2d3d7a" : "#92400e,#b45309"})`,
                      aspectRatio: "1/1",
                    }}
                  >
                    <img
                      src={`/images/about/craft-${i + 1}.jpg`}
                      alt={item.label}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                    <div className="relative z-10 flex flex-col items-center gap-2">
                      <item.icon
                        size={28}
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      />
                      <p className="text-white/60 text-[12px] font-semibold">
                        {item.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Story text */}
            <div className="flex-1">
              <Reveal delay={80}>
                <SectionPill color="gold">How We Started</SectionPill>
                <h2
                  className="ab-serif"
                  style={{
                    fontSize: "clamp(30px,4vw,50px)",
                    fontWeight: 600,
                    color: "var(--color-blue-dark)",
                    lineHeight: 1.12,
                    marginBottom: 22,
                  }}
                >
                  Born from a Love
                  <br />
                  <em>of Islamic Heritage</em>
                </h2>
              </Reveal>

              <Reveal delay={140}>
                <p
                  style={{
                    fontSize: "15px",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.88,
                    marginBottom: 18,
                  }}
                >
                  It started in a small workshop in Surat, Gujarat — with a
                  single laser cutter and a deep admiration for the beauty of
                  Arabic calligraphy. Our founder, frustrated by the lack of
                  high-quality, affordable Islamic home decor, decided to build
                  it himself.
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.88,
                    marginBottom: 32,
                  }}
                >
                  What began as a passion project quickly grew into something
                  much larger. Word spread through families, mosques, and
                  communities. Today, Glowison ships to every corner of India,
                  and our pieces hang proudly in thousands of homes.
                </p>
              </Reveal>

              <Reveal delay={200}>
                <div className="flex flex-col sm:flex-row gap-4">
                  {[
                    {
                      icon: Shield,
                      label: "Quality Guaranteed",
                      desc: "Every piece hand-inspected",
                    },
                    {
                      icon: Package,
                      label: "Pan-India Delivery",
                      desc: "Delivered to your door",
                    },
                  ].map(({ icon: Icon, label, desc }, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 flex-1 rounded-2xl p-4"
                      style={{
                        background: "var(--color-white)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "var(--color-blue-soft)" }}
                      >
                        <Icon
                          size={18}
                          style={{ color: "var(--color-blue)" }}
                        />
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "13px",
                            fontWeight: 700,
                            color: "var(--color-blue-dark)",
                            marginBottom: 2,
                          }}
                        >
                          {label}
                        </p>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "var(--color-text-secondary)",
                          }}
                        >
                          {desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            QUOTE BAND
            ══════════════════════════════════════════════════ */}
        <Reveal>
          <section
            className="relative overflow-hidden py-20 md:py-24"
            style={{ background: "var(--color-blue-dark)" }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background:
                  "linear-gradient(90deg,transparent,var(--color-gold),transparent)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 2,
                background:
                  "linear-gradient(90deg,transparent,var(--color-gold),transparent)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.03,
                backgroundImage:
                  "radial-gradient(circle,white 1px,transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
              <div className="relative inline-block">
                <div className="ab-quote-mark absolute select-none">"</div>
                <p
                  className="ab-serif relative z-10"
                  style={{
                    fontSize: "clamp(20px,3.5vw,36px)",
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "#fff",
                    lineHeight: 1.6,
                  }}
                >
                  Every piece we create is a prayer made visible — a bridge
                  between the sacred and the everyday.
                </p>
              </div>
              <div className="flex items-center justify-center gap-3 mt-10">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-[15px]"
                  style={{
                    background: "var(--color-gold)",
                    color: "var(--color-blue-dark)",
                  }}
                >
                  G
                </div>
                <div className="text-left">
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "var(--color-gold)",
                    }}
                  >
                    Founder, Glowison
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    Surat, Gujarat · Est. 2020
                  </p>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ══════════════════════════════════════════════════
            OUR VALUES
            ══════════════════════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <Reveal className="text-center mb-16">
            <SectionPill color="gold">What Drives Us</SectionPill>
            <h2
              className="ab-serif"
              style={{
                fontSize: "clamp(28px,4vw,48px)",
                fontWeight: 600,
                color: "var(--color-blue-dark)",
                lineHeight: 1.12,
              }}
            >
              Values at the Heart
              <br />
              <em>of Everything We Do</em>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Heart,
                color: "#ef4444",
                bg: "#fef2f2",
                title: "Crafted With Love",
                desc: "Every product passes through our quality check by hand. We refuse to ship anything we wouldn't proudly display in our own homes.",
              },
              {
                icon: Zap,
                color: "var(--color-gold)",
                bg: "var(--color-gold-soft)",
                title: "Precision Engineering",
                desc: "Our CNC laser cutters work to 0.1mm accuracy. The calligraphy you receive is exactly as the artist intended — no compromises.",
              },
              {
                icon: Shield,
                color: "var(--color-blue)",
                bg: "var(--color-blue-soft)",
                title: "Authenticity First",
                desc: "Every Quranic verse verified by scholars before leaving our workshop. Accuracy in the sacred is non-negotiable.",
              },
              {
                icon: Users,
                color: "#16a34a",
                bg: "#f0fdf4",
                title: "Community Built",
                desc: "We grew through word of mouth from real families. Their trust is our greatest achievement and daily motivation.",
              },
              {
                icon: Package,
                color: "#7c3aed",
                bg: "#faf5ff",
                title: "Delivered With Care",
                desc: "Triple-layered foam packaging. Every fragile piece wrapped personally. Under 0.3% breakage rate in 4 years of shipping.",
              },
              {
                icon: TrendingUp,
                color: "#92400e",
                bg: "#fef9ed",
                title: "Always Improving",
                desc: "We launched with 12 products. Today 200+. Your feedback shapes every new design, material, and finish we introduce.",
              },
            ].map(({ icon: Icon, color, bg, title, desc }, i) => (
              <Reveal key={i} delay={i * 55}>
                <div
                  className="ab-card ab-val rounded-3xl p-7 h-full"
                  style={{
                    background: "var(--color-white)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <div
                    className="ab-icon-wrap w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: bg }}
                  >
                    <Icon size={22} style={{ color }} />
                  </div>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "var(--color-blue-dark)",
                      marginBottom: 10,
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.78,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            TIMELINE
            ══════════════════════════════════════════════════ */}
        <section
          className="py-24 md:py-32"
          style={{ background: "var(--color-white)" }}
        >
          <div className="max-w-4xl mx-auto px-5 md:px-8">
            <Reveal className="text-center mb-20">
              <SectionPill color="blue">Our Journey</SectionPill>
              <h2
                className="ab-serif"
                style={{
                  fontSize: "clamp(28px,4vw,48px)",
                  fontWeight: 600,
                  color: "var(--color-blue-dark)",
                  lineHeight: 1.12,
                }}
              >
                Four Years of Growth
              </h2>
            </Reveal>

            <div className="relative">
              {/* Spine */}
              <div
                className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px"
                style={{
                  background: "var(--color-border)",
                  transform: "translateX(-50%)",
                }}
              />

              {[
                {
                  year: "2020",
                  title: "The Beginning",
                  desc: "Founded in a small Surat workshop with one laser cutter and a dream to bring premium Islamic art to Indian homes.",
                  side: "left",
                  icon: Sparkles,
                },
                {
                  year: "2021",
                  title: "First 500 Orders",
                  desc: "Word spread fast. We crossed 500 orders, expanded our workspace, and launched 40 new product designs.",
                  side: "right",
                  icon: TrendingUp,
                },
                {
                  year: "2022",
                  title: "Pan-India Shipping",
                  desc: "Partnered with premium couriers to deliver across all 28 states — from Kashmir to Kanyakumari.",
                  side: "left",
                  icon: MapPin,
                },
                {
                  year: "2023",
                  title: "5,000 Happy Homes",
                  desc: "5,000 pieces found their homes. We launched our custom name plate line and received our first bulk orders.",
                  side: "right",
                  icon: Heart,
                },
                {
                  year: "2024",
                  title: "200+ Designs",
                  desc: "Our catalogue grew to 200+ unique pieces. A second CNC laser was added and our first in-house designer joined.",
                  side: "left",
                  icon: Layers,
                },
                {
                  year: "2025",
                  title: "What's Next",
                  desc: "Launching 3D wall art, LED collections, and an expanded gifting vertical. The best chapters are still ahead.",
                  side: "right",
                  icon: Zap,
                },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 70}>
                  <div
                    className={`relative flex items-start gap-6 mb-14 ${item.side === "right" ? "md:flex-row-reverse" : ""}`}
                  >
                    {/* Dot */}
                    <div
                      className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full border-4 z-10"
                      style={{
                        transform: "translateX(-50%)",
                        background: "var(--color-white)",
                        borderColor: "var(--color-blue-dark)",
                        top: 8,
                      }}
                    />

                    <div className="hidden md:block flex-1" />

                    <div
                      className={`flex-1 ml-14 md:ml-0 ${item.side === "right" ? "md:mr-10" : "md:ml-10"}`}
                    >
                      <div
                        className="rounded-2xl p-6"
                        style={{
                          background: "var(--color-bg-main)",
                          border: "1px solid var(--color-border)",
                        }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: "var(--color-blue-soft)" }}
                          >
                            <item.icon
                              size={15}
                              style={{ color: "var(--color-blue)" }}
                            />
                          </div>
                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: 700,
                              color: "var(--color-blue)",
                              background: "var(--color-blue-soft)",
                              padding: "3px 10px",
                              borderRadius: "999px",
                            }}
                          >
                            {item.year}
                          </span>
                        </div>
                        <h3
                          style={{
                            fontSize: "16px",
                            fontWeight: 700,
                            color: "var(--color-blue-dark)",
                            marginBottom: 6,
                          }}
                        >
                          {item.title}
                        </h3>
                        <p
                          style={{
                            fontSize: "13px",
                            color: "var(--color-text-secondary)",
                            lineHeight: 1.75,
                          }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            TEAM
            ══════════════════════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <Reveal className="text-center mb-16">
            <SectionPill color="gold">The People</SectionPill>
            <h2
              className="ab-serif"
              style={{
                fontSize: "clamp(28px,4vw,48px)",
                fontWeight: 600,
                color: "var(--color-blue-dark)",
                lineHeight: 1.12,
              }}
            >
              Small Team,
              <br />
              <em>Big Dreams</em>
            </h2>
            <p
              className="mt-5 max-w-xl mx-auto"
              style={{
                fontSize: "15px",
                color: "var(--color-text-secondary)",
                lineHeight: 1.8,
              }}
            >
              A tight-knit team of designers, craftspeople, and customer service
              heroes. Every single order handled with personal care.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                name: "Founder",
                role: "Design & Vision",
                icon: Sparkles,
                bg: "var(--color-blue-dark)",
                iconColor: "var(--color-gold)",
              },
              {
                name: "Lead Craftsman",
                role: "CNC & Production",
                icon: Layers,
                bg: "#92400e",
                iconColor: "#fde68a",
              },
              {
                name: "Designer",
                role: "Art & Calligraphy",
                icon: PenTool,
                bg: "#16a34a",
                iconColor: "#bbf7d0",
              },
              {
                name: "Customer Care",
                role: "Your Happiness",
                icon: Heart,
                bg: "#7c3aed",
                iconColor: "#e9d5ff",
              },
            ].map(({ name, role, icon: Icon, bg, iconColor }, i) => (
              <Reveal key={i} delay={i * 70}>
                <div
                  className="ab-card rounded-3xl overflow-hidden"
                  style={{ border: "1px solid var(--color-border)" }}
                >
                  <div
                    className="flex items-center justify-center py-12"
                    style={{ background: bg }}
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.12)" }}
                    >
                      <Icon size={30} style={{ color: iconColor }} />
                    </div>
                  </div>
                  <div
                    className="p-4 text-center"
                    style={{ background: "var(--color-white)" }}
                  >
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "var(--color-blue-dark)",
                      }}
                    >
                      {name}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "var(--color-text-secondary)",
                        marginTop: 2,
                      }}
                    >
                      {role}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            TESTIMONIALS
            ══════════════════════════════════════════════════ */}
        <section
          className="py-24 md:py-28"
          style={{ background: "var(--color-blue-dark)" }}
        >
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <Reveal className="text-center mb-16">
              <h2
                className="ab-serif"
                style={{
                  fontSize: "clamp(28px,4vw,48px)",
                  fontWeight: 600,
                  color: "#fff",
                  lineHeight: 1.12,
                }}
              >
                What Our Customers Say
              </h2>
              <div className="flex items-center justify-center gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={17}
                    style={{ color: "var(--color-gold)" }}
                    fill="currentColor"
                  />
                ))}
                <span
                  style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.55)",
                    marginLeft: 8,
                  }}
                >
                  4.9 / 5 from 1,200+ reviews
                </span>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  name: "Ayesha K.",
                  city: "Mumbai",
                  text: "The Ayatul Kursi frame exceeded all expectations. The gold detail is stunning and the packaging was impeccable. Will absolutely order again!",
                },
                {
                  name: "Rashid M.",
                  city: "Hyderabad",
                  text: "Bought the Kaaba 3D shadow box as a wedding gift. The couple was completely overwhelmed. Glowison's quality is unmatched in India.",
                },
                {
                  name: "Fatima Z.",
                  city: "Delhi",
                  text: "The Bismillah key holder is the first thing guests see entering our home. So many compliments! Delivered in just 3 days too.",
                },
              ].map((r, i) => (
                <Reveal key={i} delay={i * 90}>
                  <div
                    className="rounded-3xl p-7 h-full flex flex-col gap-5"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          size={13}
                          style={{ color: "var(--color-gold)" }}
                          fill="currentColor"
                        />
                      ))}
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.78)",
                        lineHeight: 1.78,
                        flex: 1,
                        fontStyle: "italic",
                      }}
                    >
                      "{r.text}"
                    </p>
                    <div
                      className="flex items-center gap-3 pt-4"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-[13px]"
                        style={{
                          background: "var(--color-gold)",
                          color: "var(--color-blue-dark)",
                        }}
                      >
                        {r.name[0]}
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "13px",
                            fontWeight: 700,
                            color: "#fff",
                          }}
                        >
                          {r.name}
                        </p>
                        <p
                          style={{
                            fontSize: "11px",
                            color: "rgba(255,255,255,0.4)",
                          }}
                        >
                          {r.city}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            CUSTOM PRODUCTS — redirects to /quote
            ══════════════════════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <Reveal>
            <div className="ab-custom-card rounded-3xl relative overflow-hidden">
              {/* Gold top bar */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background:
                    "linear-gradient(90deg,transparent,var(--color-gold),transparent)",
                }}
              />

              {/* Dot grid */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0.04,
                  backgroundImage:
                    "radial-gradient(circle,white 1px,transparent 1px)",
                  backgroundSize: "28px 28px",
                  pointerEvents: "none",
                }}
              />

              {/* Orb */}
              <div
                style={{
                  position: "absolute",
                  top: "-20%",
                  right: "-5%",
                  width: 400,
                  height: 400,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle,rgba(242,180,97,0.1) 0%,transparent 65%)",
                  pointerEvents: "none",
                }}
              />

              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-0 p-10 md:p-16">
                {/* Left — text */}
                <div className="flex-1 text-center lg:text-left">
                  <SectionPill color="gold">Made Just For You</SectionPill>

                  <h2
                    className="ab-serif"
                    style={{
                      fontSize: "clamp(30px,4.5vw,54px)",
                      fontWeight: 600,
                      color: "#fff",
                      lineHeight: 1.1,
                      marginBottom: 18,
                    }}
                  >
                    Custom Products
                    <br />
                    <em>Your Vision, Our Craft</em>
                  </h2>

                  <p
                    style={{
                      fontSize: "15px",
                      color: "rgba(255,255,255,0.62)",
                      lineHeight: 1.85,
                      maxWidth: 480,
                      marginBottom: 32,
                    }}
                  >
                    Want something unique? We create fully custom Islamic wall
                    art, personalised name plates, wedding gifts, and corporate
                    pieces — designed exactly to your specifications. Every
                    detail, your way.
                  </p>

                  {/* Feature list */}
                  <div className="flex flex-col sm:flex-row gap-3 mb-10 justify-center lg:justify-start">
                    {[
                      { icon: PenTool, label: "Custom Design" },
                      { icon: Users, label: "Bulk Orders" },
                      { icon: Gift, label: "Gift Wrapping" },
                    ].map(({ icon: Icon, label }, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
                        style={{
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(255,255,255,0.12)",
                        }}
                      >
                        <Icon
                          size={15}
                          style={{ color: "var(--color-gold)" }}
                        />
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "rgba(255,255,255,0.85)",
                          }}
                        >
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link href="/quote">
                    <button
                      className="ab-cta inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-[15px] cursor-pointer"
                      style={{
                        background: "var(--color-gold)",
                        color: "var(--color-blue-dark)",
                      }}
                    >
                      Get a Free Quote
                      <ArrowRight size={17} />
                    </button>
                  </Link>
                </div>

                {/* Right — process steps */}
                {/* <div className="flex-shrink-0 w-full lg:w-80">
                  <div className="rounded-2xl p-6"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-gold)", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 16 }}>
                      How It Works
                    </p>
                    {[
                      { step: "01", title: "Share Your Idea",    desc: "Tell us what you have in mind — design, size, material."          },
                      { step: "02", title: "Get a Quote",        desc: "We'll send a detailed quote within 24 hours."                     },
                      { step: "03", title: "We Craft It",        desc: "Our team brings your design to life with precision."               },
                      { step: "04", title: "Delivered to You",   desc: "Securely packed and shipped anywhere in India."                    },
                    ].map((s, i) => (
                      <div key={i} className={`flex items-start gap-4 py-4 ${i < 3 ? "border-b" : ""}`}
                        style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                        <span className="ab-serif shrink-0"
                          style={{ fontSize: "22px", fontWeight: 700, color: "var(--color-gold)", opacity: 0.5, lineHeight: 1, width: 28 }}>
                          {s.step}
                        </span>
                        <div>
                          <p style={{ fontSize: "13px", fontWeight: 700, color: "#fff", marginBottom: 3 }}>{s.title}</p>
                          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div> */}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ══════════════════════════════════════════════════
            CONTACT + CTA
            ══════════════════════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-5 md:px-8 pb-24 md:pb-32">
          <div className="flex flex-col lg:flex-row gap-5 items-stretch">
            {/* Shop CTA */}
            <Reveal className="flex-1" delay={0}>
              <div
                className="h-full rounded-3xl p-8 md:p-12 flex flex-col justify-between relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg,var(--color-blue-dark) 0%,#253573 100%)",
                  minHeight: 280,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background:
                      "linear-gradient(90deg,transparent,var(--color-gold),transparent)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.03,
                    backgroundImage:
                      "radial-gradient(circle,white 1px,transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />

                <div style={{ position: "relative", zIndex: 1 }}>
                  <SectionPill color="gold">Ready to Shop?</SectionPill>
                  <h3
                    className="ab-serif"
                    style={{
                      fontSize: "clamp(24px,3vw,38px)",
                      fontWeight: 600,
                      color: "#fff",
                      lineHeight: 1.15,
                      marginBottom: 12,
                    }}
                  >
                    Bring Glowison
                    <br />
                    <em>into Your Home</em>
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.58)",
                      lineHeight: 1.75,
                      marginBottom: 28,
                    }}
                  >
                    Browse 200+ handcrafted pieces. Free shipping on orders
                    above ₹999. 7-day easy returns.
                  </p>
                </div>

                <div style={{ position: "relative", zIndex: 1 }}>
                  <Link href="/products">
                    <button
                      className="ab-cta inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-[14px] cursor-pointer"
                      style={{
                        background: "var(--color-gold)",
                        color: "var(--color-blue-dark)",
                      }}
                    >
                      Shop Now
                      <ArrowRight size={16} />
                    </button>
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Contact */}
            <Reveal className="flex-1 flex flex-col gap-4" delay={100}>
              <div
                className="rounded-3xl p-7"
                style={{
                  background: "var(--color-white)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <p
                  className="ab-serif"
                  style={{
                    fontSize: "22px",
                    fontWeight: 600,
                    color: "var(--color-blue-dark)",
                    marginBottom: 18,
                  }}
                >
                  Get in Touch
                </p>
                {[
                  {
                    icon: Phone,
                    label: "Call Us",
                    value: "+91 99787 50622",
                    color: "#16a34a",
                  },
                  {
                    icon: Mail,
                    label: "Email Us",
                    value: "hello@glowison.com",
                    color: "var(--color-blue)",
                  },
                  {
                    icon: MapPin,
                    label: "Visit Us",
                    value: "Surat, Gujarat, India",
                    color: "#dc2626",
                  },
                ].map(({ icon: Icon, label, value, color }, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 py-4"
                    style={{
                      borderBottom:
                        i < 2 ? "1px solid var(--color-border)" : "none",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: color + "14",
                        border: `1px solid ${color}28`,
                      }}
                    >
                      <Icon size={17} style={{ color }} />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "11px",
                          color: "var(--color-text-secondary)",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.8px",
                        }}
                      >
                        {label}
                      </p>
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "var(--color-text-primary)",
                          marginTop: 1,
                        }}
                      >
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="rounded-3xl p-6"
                style={{
                  background: "var(--color-gold-soft)",
                  border: "1px solid var(--color-gold)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={15} style={{ color: "var(--color-gold)" }} />
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "var(--color-blue-dark)",
                      textTransform: "uppercase",
                      letterSpacing: "0.8px",
                    }}
                  >
                    Business Hours
                  </p>
                </div>
                {[
                  { day: "Monday – Saturday", hours: "10:00 AM – 7:00 PM" },
                  { day: "Sunday", hours: "11:00 AM – 4:00 PM" },
                ].map(({ day, hours }, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2.5"
                    style={{
                      borderBottom:
                        i < 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13px",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {day}
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "var(--color-blue-dark)",
                      }}
                    >
                      {hours}
                    </span>
                  </div>
                ))}
              </div>

              {/* ── Map ── */}
              <div
                className="rounded-3xl overflow-hidden relative"
                style={{ border: "1px solid var(--color-border)", height: 220 }}
              >
                {/* Label overlay */}
                <div
                  className="absolute top-3 left-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{
                    background: "var(--color-white)",
                    border: "1px solid var(--color-border)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  <MapPin size={12} style={{ color: "#dc2626" }} />
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "var(--color-blue-dark)",
                    }}
                  >
                    chhapi, Gujarat
                  </span>
                </div>
                <iframe
                  title="Glowison Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d904.7574909148541!2d72.3851449013698!3d24.0232131711105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395cf26aafc0e7c9%3A0x970ebc89fdac2103!2sChhapi%2C%20Gujarat%20385210!5e1!3m2!1sen!2sin!4v1772611274171!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    display: "block",
                    filter: "saturate(0.85) contrast(1.05)",
                  }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
