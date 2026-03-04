// FILE: src/app/components/QuotePage.jsx
"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  ChevronRight, Upload, X, CheckCircle, ArrowRight,
  Ruler, Layers, Tag, MessageSquare, User, Phone,
  Mail, Sparkles, Clock, Shield, Zap, ImagePlus,
  ChevronDown, FileText,
} from "lucide-react";

// ── Field wrapper ─────────────────────────────────────────────────────────────
function Field({ label, required, children, hint }) {
  return (
    <div className="flex flex-col gap-2">
      <label style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-blue-dark)", letterSpacing: "0.3px" }}>
        {label}
        {required && <span style={{ color: "#ef4444", marginLeft: 3 }}>*</span>}
      </label>
      {children}
      {hint && <p style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginTop: 1 }}>{hint}</p>}
    </div>
  );
}

// ── Styled input ──────────────────────────────────────────────────────────────
function Input({ type = "text", placeholder, value, onChange, ...rest }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...rest}
      style={{
        width: "100%",
        padding: "11px 14px",
        borderRadius: "12px",
        border: `1.5px solid ${focused ? "var(--color-blue)" : "var(--color-border)"}`,
        background: focused ? "var(--color-white)" : "var(--color-bg-main)",
        fontSize: "14px",
        color: "var(--color-text-primary)",
        outline: "none",
        boxShadow: focused ? "0 0 0 3px rgba(71,87,146,0.1)" : "none",
        transition: "all 0.2s ease",
        fontFamily: "'DM Sans', sans-serif",
      }}
    />
  );
}

// ── Styled textarea ───────────────────────────────────────────────────────────
function Textarea({ placeholder, value, onChange, rows = 4 }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: "100%",
        padding: "11px 14px",
        borderRadius: "12px",
        border: `1.5px solid ${focused ? "var(--color-blue)" : "var(--color-border)"}`,
        background: focused ? "var(--color-white)" : "var(--color-bg-main)",
        fontSize: "14px",
        color: "var(--color-text-primary)",
        outline: "none",
        resize: "vertical",
        boxShadow: focused ? "0 0 0 3px rgba(71,87,146,0.1)" : "none",
        transition: "all 0.2s ease",
        fontFamily: "'DM Sans', sans-serif",
        lineHeight: 1.7,
      }}
    />
  );
}

// ── Chip selector ─────────────────────────────────────────────────────────────
function ChipGroup({ options, value, onChange, multi = false }) {
  const toggle = (v) => {
    if (multi) {
      onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
    } else {
      onChange(v === value ? "" : v);
    }
  };
  const isActive = (v) => (multi ? value.includes(v) : value === v);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map(({ value: v, label, icon: Icon }) => {
        const active = isActive(v);
        return (
          <button
            key={v}
            type="button"
            onClick={() => toggle(v)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              borderRadius: "10px",
              border: `1.5px solid ${active ? "var(--color-blue)" : "var(--color-border)"}`,
              background: active ? "var(--color-blue-soft)" : "var(--color-white)",
              color: active ? "var(--color-blue)" : "var(--color-text-secondary)",
              fontSize: "13px",
              fontWeight: active ? 700 : 500,
              cursor: "pointer",
              transition: "all 0.15s ease",
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: active ? "0 0 0 2px rgba(71,87,146,0.12)" : "none",
            }}
          >
            {Icon && <Icon size={13} />}
            {label}
            {active && <CheckCircle size={12} style={{ marginLeft: 2 }} />}
          </button>
        );
      })}
    </div>
  );
}

// ── Select ────────────────────────────────────────────────────────────────────
function Select({ options, value, onChange, placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          padding: "11px 36px 11px 14px",
          borderRadius: "12px",
          border: `1.5px solid ${focused ? "var(--color-blue)" : "var(--color-border)"}`,
          background: focused ? "var(--color-white)" : "var(--color-bg-main)",
          fontSize: "14px",
          color: value ? "var(--color-text-primary)" : "var(--color-text-secondary)",
          outline: "none",
          appearance: "none",
          boxShadow: focused ? "0 0 0 3px rgba(71,87,146,0.1)" : "none",
          transition: "all 0.2s ease",
          fontFamily: "'DM Sans', sans-serif",
          cursor: "pointer",
        }}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <ChevronDown size={15} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--color-text-secondary)", pointerEvents: "none" }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { value: "wall-clock",    label: "Wall Clock",     icon: Clock    },
  { value: "wall-art",      label: "Wall Art",       icon: Layers   },
  { value: "name-plate",    label: "Name Plate",     icon: Tag      },
  { value: "key-holder",    label: "Key Holder",     icon: Sparkles },
  { value: "gift-set",      label: "Gift Set",       icon: Zap      },
  { value: "led-signage",   label: "LED Signage",    icon: Zap      },
  { value: "shadow-box",    label: "Shadow Box",     icon: Layers   },
  { value: "combo",         label: "Combo Set",      icon: Tag      },
];

const MATERIALS = [
  { value: "acrylic",       label: "Acrylic"         },
  { value: "mdf",           label: "MDF Wood"        },
  { value: "metal",         label: "Metal"           },
  { value: "wood",          label: "Sheesham Wood"   },
  { value: "acrylic-led",   label: "Acrylic + LED"   },
  { value: "foam-board",    label: "Foam Board"      },
];

const FINISHES = [
  { value: "gold",          label: "Gold Finish"     },
  { value: "silver",        label: "Silver Finish"   },
  { value: "matte-black",   label: "Matte Black"     },
  { value: "natural-wood",  label: "Natural Wood"    },
  { value: "white",         label: "White"           },
  { value: "custom-color",  label: "Custom Colour"   },
];

const QUANTITIES = [
  { value: "1",    label: "1 piece"    },
  { value: "2-5",  label: "2–5 pieces" },
  { value: "6-10", label: "6–10 pieces"},
  { value: "11-25",label: "11–25 (Bulk)"},
  { value: "25+",  label: "25+ (Wholesale)"},
];

const STEPS = [
  { icon: MessageSquare, title: "Share Your Vision",  desc: "Fill out the form with your design idea, size, and material preferences."    },
  { icon: Clock,         title: "Quote in 24 Hours",  desc: "Our team reviews your request and sends a detailed quote the same day."       },
  { icon: CheckCircle,   title: "Approve & Pay",      desc: "Review the quote, approve the design mockup, and make a simple payment."      },
  { icon: Zap,           title: "We Craft & Deliver", desc: "Your custom piece is handcrafted and shipped to your door in 7–10 days."      },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function QuotePage() {
  const fileRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [dragOver,  setDragOver]  = useState(false);

  const [form, setForm] = useState({
    name:        "",
    phone:       "",
    email:       "",
    category:    [],
    material:    [],
    finish:      [],
    quantity:    "",
    widthCm:     "",
    heightCm:    "",
    unit:        "cm",
    description: "",
    image:       null,
    imagePreview:null,
  });

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => set("imagePreview", e.target.result);
    reader.readAsDataURL(file);
    set("image", file);
  };

  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  const categoryLabels = form.category
    .map((c) => CATEGORIES.find((x) => x.value === c)?.label)
    .join(", ");

  const materialLabels = form.material
    .map((m) => MATERIALS.find((x) => x.value === m)?.label)
    .join(", ");

  const finishLabels = form.finish
    .map((f) => FINISHES.find((x) => x.value === f)?.label)
    .join(", ");

  const quantityLabel =
    QUANTITIES.find((q) => q.value === form.quantity)?.label || "";

  const size =
    form.widthCm && form.heightCm
      ? `${form.widthCm} × ${form.heightCm} ${form.unit}`
      : "Not specified";

  const message = [
    `✨ *GLOWISON CUSTOM QUOTE REQUEST*`,
    ``,
    `👤 *Customer Details*`,
    `Name : ${form.name}`,
    `Phone : ${form.phone}`,
    form.email ? `Email : ${form.email}` : null,
    ``,
    `🛍 *Product Details*`,
    categoryLabels ? `Category : ${categoryLabels}` : null,
    materialLabels ? `Material : ${materialLabels}` : null,
    finishLabels ? `Finish : ${finishLabels}` : null,
    quantityLabel ? `Quantity : ${quantityLabel}` : null,
    ``,
    `📏 *Size*`,
    `Dimensions : ${size}`,
    ``,
    `📝 *Design Description*`,
    form.description || "No description provided",
    ``,
    form.image
      ? `📷 Reference image uploaded (customer will send image in chat)`
      : null,
  ]
    .filter(Boolean)
    .join("\n");

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
};

  // ── Success screen ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,600;1,500&display=swap');
          .qp * { font-family:'DM Sans',sans-serif; }
          .qp-serif { font-family:'Cormorant Garamond',serif !important; }
          @keyframes qp-pop { from{opacity:0;transform:scale(0.8)} to{opacity:1;transform:scale(1)} }
          @keyframes qp-up  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        `}</style>
        <div className="qp min-h-screen flex items-center justify-center px-5 py-20"
          style={{ background: "var(--color-bg-main)" }}>
          <div className="text-center max-w-md">
            <div style={{ animation: "qp-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) both" }}>
              <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8"
                style={{ background: "linear-gradient(135deg,var(--color-blue-dark),#253573)", boxShadow: "0 16px 48px rgba(26,46,110,0.3)" }}>
                <CheckCircle size={44} style={{ color: "var(--color-gold)" }} />
              </div>
            </div>
            <div style={{ animation: "qp-up 0.6s ease 0.2s both" }}>
              <h2 className="qp-serif" style={{ fontSize: "clamp(30px,5vw,46px)", fontWeight: 600, color: "var(--color-blue-dark)", marginBottom: 14 }}>
                Quote Submitted!
              </h2>
              <p style={{ fontSize: "15px", color: "var(--color-text-secondary)", lineHeight: 1.8, marginBottom: 32 }}>
                Thank you, <strong style={{ color: "var(--color-blue-dark)" }}>{form.name || "there"}</strong>! We've received your custom product request. Our team will review it and send you a detailed quote within <strong style={{ color: "var(--color-blue)" }}>24 hours</strong> on your WhatsApp or email.
              </p>
              <div className="rounded-2xl p-5 mb-8 text-left"
                style={{ background: "var(--color-white)", border: "1px solid var(--color-border)" }}>
                {[
                  { label: "Name",    value: form.name           },
                  { label: "Phone",   value: form.phone          },
                  { label: "Email",   value: form.email          },
                  { label: "Size",    value: form.widthCm && form.heightCm ? `${form.widthCm} × ${form.heightCm} ${form.unit}` : "—" },
                ].map(({ label, value }) => value ? (
                  <div key={label} className="flex justify-between py-2.5"
                    style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <span style={{ fontSize: "13px", color: "var(--color-text-secondary)", fontWeight: 600 }}>{label}</span>
                    <span style={{ fontSize: "13px", color: "var(--color-text-primary)", fontWeight: 600 }}>{value}</span>
                  </div>
                ) : null)}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/">
                  <button style={{ padding: "12px 28px", borderRadius: "999px", background: "var(--color-blue-dark)", color: "#fff", fontWeight: 700, fontSize: "14px", cursor: "pointer", border: "none", fontFamily: "'DM Sans',sans-serif" }}>
                    Back to Home
                  </button>
                </Link>
                <Link href="/products">
                  <button style={{ padding: "12px 28px", borderRadius: "999px", background: "var(--color-white)", color: "var(--color-blue-dark)", fontWeight: 700, fontSize: "14px", cursor: "pointer", border: "1.5px solid var(--color-border)", fontFamily: "'DM Sans',sans-serif" }}>
                    Browse Products
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Main page ───────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&display=swap');
        .qp * { font-family:'DM Sans',sans-serif; box-sizing:border-box; }
        .qp-serif { font-family:'Cormorant Garamond',serif !important; }

        /* Shimmer */
        .qp-shimmer {
          background: linear-gradient(90deg, var(--color-gold) 0%, #ffe9a0 45%, var(--color-gold) 55%, #c8820a 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: qp-shine 3.5s linear infinite;
        }
        @keyframes qp-shine { from{background-position:0% center} to{background-position:200% center} }

        /* Step card hover */
        .qp-step { transition: all 0.25s ease; }
        .qp-step:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(26,46,110,0.1); }

        /* Drop zone */
        .qp-drop { transition: all 0.2s ease; }
        .qp-drop.over { border-color: var(--color-blue) !important; background: var(--color-blue-soft) !important; }

        /* Submit btn */
        .qp-submit {
          background: linear-gradient(135deg, var(--color-blue-dark) 0%, #253573 100%);
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .qp-submit::after {
          content:'';
          position:absolute;
          inset:0;
          background: linear-gradient(135deg,rgba(255,255,255,0.1) 0%,transparent 60%);
          opacity:0;
          transition: opacity 0.25s ease;
        }
        .qp-submit:hover { transform:translateY(-2px); box-shadow:0 12px 36px rgba(26,46,110,0.38); }
        .qp-submit:hover::after { opacity:1; }

        /* Form section card */
        .qp-section {
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: 24px;
          padding: 28px;
        }

        /* Diagonal hero */
        .qp-hero { clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%); }

        /* Stagger in */
        .qp-in { animation: qp-up 0.5s ease both; }
        @keyframes qp-up { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }

        /* Number badge */
        .qp-num {
          width:28px; height:28px; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          font-size:12px; font-weight:800;
          background:var(--color-blue-dark); color:white;
          flex-shrink:0;
        }

        /* Section divider label */
        .qp-divider {
          display:flex; align-items:center; gap:12px; margin-bottom:20px;
        }
        .qp-divider-line { flex:1; height:1px; background:var(--color-border); }
      `}</style>

      <div className="qp min-h-screen" style={{ background: "var(--color-bg-main)" }}>

        {/* ── Breadcrumb ── */}
        <div style={{ background: "var(--color-white)", borderBottom: "1px solid var(--color-border)" }}>
          <div className="max-w-7xl mx-auto px-5 md:px-8 py-4">
            <nav className="flex items-center gap-2 text-[13px]">
              <Link href="/" style={{ color: "var(--color-text-secondary)", fontWeight: 500 }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-blue)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-text-secondary)"}>
                Home
              </Link>
              <ChevronRight size={13} style={{ color: "var(--color-border)" }} />
              <span style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>Get a Quote</span>
            </nav>
          </div>
        </div>

        {/* ── Hero ── */}
        <div className="qp-hero relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, var(--color-blue-dark) 0%, #1e2f5a 55%, #0d1a3a 100%)",
            paddingTop: "clamp(52px,8vw,96px)",
            paddingBottom: "clamp(72px,11vw,140px)",
          }}>

          {/* Gold top bar */}
          <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,transparent,var(--color-gold),transparent)" }} />

          {/* Dot grid */}
          <div style={{ position:"absolute", inset:0, opacity:0.04, backgroundImage:"radial-gradient(circle,var(--color-gold) 1px,transparent 1px)", backgroundSize:"30px 30px", pointerEvents:"none" }} />

          {/* Orbs */}
          <div style={{ position:"absolute", top:"5%", right:"5%", width:280, height:280, borderRadius:"50%", background:"radial-gradient(circle,rgba(242,180,97,0.1) 0%,transparent 70%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:"15%", left:"3%", width:180, height:180, borderRadius:"50%", background:"radial-gradient(circle,rgba(71,87,146,0.25) 0%,transparent 70%)", pointerEvents:"none" }} />

          <div className="max-w-4xl mx-auto px-5 md:px-8 text-center" style={{ position:"relative", zIndex:1 }}>

            {/* Pill */}
            <div className="qp-in inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background:"rgba(242,180,97,0.12)", border:"1px solid rgba(242,180,97,0.3)", animationDelay:"0ms" }}>
              <FileText size={13} style={{ color:"var(--color-gold)" }} />
              <span style={{ fontSize:"11px", fontWeight:700, color:"var(--color-gold)", letterSpacing:"1.2px", textTransform:"uppercase" }}>
                Custom Product Request
              </span>
            </div>

            <h1 className="qp-serif qp-in" style={{ fontSize:"clamp(36px,6vw,68px)", fontWeight:600, lineHeight:1.05, color:"#fff", marginBottom:20, animationDelay:"80ms" }}>
              Tell Us What<br />
              <span className="qp-shimmer">You Want to Create</span>
            </h1>

            <p className="qp-in" style={{ fontSize:"clamp(14px,1.5vw,17px)", color:"rgba(255,255,255,0.6)", lineHeight:1.8, maxWidth:520, margin:"0 auto 40px", animationDelay:"160ms" }}>
              From a single personalised frame to a bulk corporate order — fill in the details below and we'll send you a free, no-obligation quote within 24 hours.
            </p>

            {/* Trust badges */}
            <div className="qp-in flex flex-wrap items-center justify-center gap-3" style={{ animationDelay:"240ms" }}>
              {[
                { icon: Clock,   text: "Quote in 24hrs"    },
                { icon: Shield,  text: "No Obligation"     },
                { icon: Zap,     text: "Free Consultation" },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.14)" }}>
                  <Icon size={13} style={{ color:"var(--color-gold)" }} />
                  <span style={{ fontSize:"12px", fontWeight:600, color:"rgba(255,255,255,0.85)" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 py-14 md:py-20">

          {/* ── How It Works ── */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
                style={{ background:"var(--color-blue-soft)", border:"1px solid var(--color-blue)" }}>
                <span style={{ fontSize:"11px", fontWeight:700, color:"var(--color-blue)", letterSpacing:"1px", textTransform:"uppercase" }}>
                  Simple Process
                </span>
              </div>
              <h2 className="qp-serif" style={{ fontSize:"clamp(26px,3.5vw,40px)", fontWeight:600, color:"var(--color-blue-dark)" }}>
                How It Works
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {STEPS.map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="qp-step rounded-2xl p-6 relative"
                  style={{ background:"var(--color-white)", border:"1px solid var(--color-border)" }}>
                  {/* Step number */}
                  <div className="absolute top-4 right-4" style={{ fontSize:"32px", fontFamily:"'Cormorant Garamond',serif", fontWeight:700, color:"var(--color-border)", lineHeight:1 }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{ background:"var(--color-blue-soft)" }}>
                    <Icon size={20} style={{ color:"var(--color-blue)" }} />
                  </div>
                  <h3 style={{ fontSize:"15px", fontWeight:700, color:"var(--color-blue-dark)", marginBottom:6 }}>{title}</h3>
                  <p style={{ fontSize:"13px", color:"var(--color-text-secondary)", lineHeight:1.7 }}>{desc}</p>

                  {/* Arrow connector */}
                  {i < 3 && (
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full items-center justify-center"
                      style={{ background:"var(--color-blue-dark)" }}>
                      <ArrowRight size={12} style={{ color:"white" }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── FORM ── */}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-6 items-start">

              {/* ── LEFT COLUMN ── */}
              <div className="flex-1 min-w-0 flex flex-col gap-5">

                {/* Personal Info */}
                <div className="qp-section">
                  <div className="qp-divider">
                    <div className="qp-num">1</div>
                    <span style={{ fontSize:"14px", fontWeight:700, color:"var(--color-blue-dark)" }}>Your Details</span>
                    <div className="qp-divider-line" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Full Name" required>
                      <div style={{ position:"relative" }}>
                        <User size={15} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--color-text-secondary)", pointerEvents:"none" }} />
                        <input
                          type="text"
                          placeholder="Your full name"
                          value={form.name}
                          onChange={(e) => set("name", e.target.value)}
                          required
                          style={{ width:"100%", padding:"11px 14px 11px 36px", borderRadius:"12px", border:"1.5px solid var(--color-border)", background:"var(--color-bg-main)", fontSize:"14px", color:"var(--color-text-primary)", outline:"none", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }}
                          onFocus={(e) => { e.target.style.borderColor="var(--color-blue)"; e.target.style.background="white"; e.target.style.boxShadow="0 0 0 3px rgba(71,87,146,0.1)"; }}
                          onBlur={(e)  => { e.target.style.borderColor="var(--color-border)"; e.target.style.background="var(--color-bg-main)"; e.target.style.boxShadow="none"; }}
                        />
                      </div>
                    </Field>

                    <Field label="WhatsApp / Phone" required>
                      <div style={{ position:"relative" }}>
                        <Phone size={15} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--color-text-secondary)", pointerEvents:"none" }} />
                        <input
                          type="tel"
                          placeholder="+91 XXXXX XXXXX"
                          value={form.phone}
                          onChange={(e) => set("phone", e.target.value)}
                          required
                          style={{ width:"100%", padding:"11px 14px 11px 36px", borderRadius:"12px", border:"1.5px solid var(--color-border)", background:"var(--color-bg-main)", fontSize:"14px", color:"var(--color-text-primary)", outline:"none", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }}
                          onFocus={(e) => { e.target.style.borderColor="var(--color-blue)"; e.target.style.background="white"; e.target.style.boxShadow="0 0 0 3px rgba(71,87,146,0.1)"; }}
                          onBlur={(e)  => { e.target.style.borderColor="var(--color-border)"; e.target.style.background="var(--color-bg-main)"; e.target.style.boxShadow="none"; }}
                        />
                      </div>
                    </Field>

                    <Field label="Email Address" hint="We'll send the quote here">
                      <div style={{ position:"relative" }}>
                        <Mail size={15} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--color-text-secondary)", pointerEvents:"none" }} />
                        <input
                          type="email"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={(e) => set("email", e.target.value)}
                          style={{ width:"100%", padding:"11px 14px 11px 36px", borderRadius:"12px", border:"1.5px solid var(--color-border)", background:"var(--color-bg-main)", fontSize:"14px", color:"var(--color-text-primary)", outline:"none", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }}
                          onFocus={(e) => { e.target.style.borderColor="var(--color-blue)"; e.target.style.background="white"; e.target.style.boxShadow="0 0 0 3px rgba(71,87,146,0.1)"; }}
                          onBlur={(e)  => { e.target.style.borderColor="var(--color-border)"; e.target.style.background="var(--color-bg-main)"; e.target.style.boxShadow="none"; }}
                        />
                      </div>
                    </Field>

                    <Field label="Quantity" required>
                      <Select
                        options={QUANTITIES}
                        value={form.quantity}
                        onChange={(v) => set("quantity", v)}
                        placeholder="Select quantity"
                      />
                    </Field>
                  </div>
                </div>

                {/* Product Type */}
                <div className="qp-section">
                  <div className="qp-divider">
                    <div className="qp-num">2</div>
                    <span style={{ fontSize:"14px", fontWeight:700, color:"var(--color-blue-dark)" }}>Product Category</span>
                    <div className="qp-divider-line" />
                  </div>
                  <Field label="What type of product?" required hint="Select one or more categories">
                    <ChipGroup
                      options={CATEGORIES}
                      value={form.category}
                      onChange={(v) => set("category", v)}
                      multi
                    />
                  </Field>
                </div>

                {/* Size */}
                <div className="qp-section">
                  <div className="qp-divider">
                    <div className="qp-num">3</div>
                    <span style={{ fontSize:"14px", fontWeight:700, color:"var(--color-blue-dark)" }}>Size & Dimensions</span>
                    <div className="qp-divider-line" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Field label="Width" hint="Numeric value only">
                      <div style={{ position:"relative" }}>
                        <Ruler size={14} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--color-text-secondary)", pointerEvents:"none" }} />
                        <input
                          type="number"
                          placeholder="e.g. 45"
                          value={form.widthCm}
                          onChange={(e) => set("widthCm", e.target.value)}
                          min="1"
                          style={{ width:"100%", padding:"11px 14px 11px 34px", borderRadius:"12px", border:"1.5px solid var(--color-border)", background:"var(--color-bg-main)", fontSize:"14px", color:"var(--color-text-primary)", outline:"none", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }}
                          onFocus={(e) => { e.target.style.borderColor="var(--color-blue)"; e.target.style.background="white"; e.target.style.boxShadow="0 0 0 3px rgba(71,87,146,0.1)"; }}
                          onBlur={(e)  => { e.target.style.borderColor="var(--color-border)"; e.target.style.background="var(--color-bg-main)"; e.target.style.boxShadow="none"; }}
                        />
                      </div>
                    </Field>

                    <Field label="Height" hint="Numeric value only">
                      <div style={{ position:"relative" }}>
                        <Ruler size={14} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--color-text-secondary)", pointerEvents:"none" }} />
                        <input
                          type="number"
                          placeholder="e.g. 60"
                          value={form.heightCm}
                          onChange={(e) => set("heightCm", e.target.value)}
                          min="1"
                          style={{ width:"100%", padding:"11px 14px 11px 34px", borderRadius:"12px", border:"1.5px solid var(--color-border)", background:"var(--color-bg-main)", fontSize:"14px", color:"var(--color-text-primary)", outline:"none", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }}
                          onFocus={(e) => { e.target.style.borderColor="var(--color-blue)"; e.target.style.background="white"; e.target.style.boxShadow="0 0 0 3px rgba(71,87,146,0.1)"; }}
                          onBlur={(e)  => { e.target.style.borderColor="var(--color-border)"; e.target.style.background="var(--color-bg-main)"; e.target.style.boxShadow="none"; }}
                        />
                      </div>
                    </Field>

                    <Field label="Unit">
                      <div style={{ display:"flex", gap:6 }}>
                        {["cm", "inch", "ft"].map((u) => (
                          <button key={u} type="button" onClick={() => set("unit", u)}
                            style={{
                              flex:1, padding:"11px 0", borderRadius:"12px", fontSize:"13px", fontWeight:700,
                              border:`1.5px solid ${form.unit===u ? "var(--color-blue)" : "var(--color-border)"}`,
                              background: form.unit===u ? "var(--color-blue-soft)" : "var(--color-bg-main)",
                              color: form.unit===u ? "var(--color-blue)" : "var(--color-text-secondary)",
                              cursor:"pointer", transition:"all 0.15s ease", fontFamily:"'DM Sans',sans-serif",
                            }}>
                            {u}
                          </button>
                        ))}
                      </div>
                    </Field>
                  </div>

                  {/* Size preview */}
                  {(form.widthCm || form.heightCm) && (
                    <div className="flex items-center gap-3 mt-4 px-4 py-3 rounded-xl"
                      style={{ background:"var(--color-blue-soft)", border:"1px solid var(--color-blue)" }}>
                      <Ruler size={16} style={{ color:"var(--color-blue)" }} />
                      <span style={{ fontSize:"13px", fontWeight:600, color:"var(--color-blue)" }}>
                        Size: {form.widthCm || "?"} × {form.heightCm || "?"} {form.unit}
                        {form.widthCm && form.heightCm && (
                          <span style={{ marginLeft:8, opacity:0.7 }}>
                            ({Math.round(form.widthCm * form.heightCm)} {form.unit}²)
                          </span>
                        )}
                      </span>
                    </div>
                  )}
                </div>

                {/* Material */}
                <div className="qp-section">
                  <div className="qp-divider">
                    <div className="qp-num">4</div>
                    <span style={{ fontSize:"14px", fontWeight:700, color:"var(--color-blue-dark)" }}>Material & Finish</span>
                    <div className="qp-divider-line" />
                  </div>
                  <div className="flex flex-col gap-5">
                    <Field label="Material" hint="Select all that apply — we'll suggest the best fit">
                      <ChipGroup
                        options={MATERIALS}
                        value={form.material}
                        onChange={(v) => set("material", v)}
                        multi
                      />
                    </Field>
                    <Field label="Finish / Colour">
                      <ChipGroup
                        options={FINISHES}
                        value={form.finish}
                        onChange={(v) => set("finish", v)}
                        multi
                      />
                    </Field>
                  </div>
                </div>

                {/* Description */}
                <div className="qp-section">
                  <div className="qp-divider">
                    <div className="qp-num">5</div>
                    <span style={{ fontSize:"14px", fontWeight:700, color:"var(--color-blue-dark)" }}>Design Description</span>
                    <div className="qp-divider-line" />
                  </div>
                  <Field
                    label="Describe your vision"
                    required
                    hint="Arabic text, names, verses, or a detailed description of what you have in mind">
                    <Textarea
                      placeholder="e.g. 'Ayatul Kursi in gold on black acrylic, 60×45 cm, with a wooden border and hanging kit included. Need 2 pieces for gifting.'"
                      value={form.description}
                      onChange={(e) => set("description", e.target.value)}
                      rows={5}
                    />
                  </Field>
                </div>
              </div>

              {/* ── RIGHT COLUMN ── */}
              <div className="w-full lg:w-80 xl:w-96 flex flex-col gap-5 lg:sticky lg:top-24">

                {/* Image Upload */}
                <div className="qp-section">
                  <div className="qp-divider">
                    <div className="qp-num">6</div>
                    <span style={{ fontSize:"14px", fontWeight:700, color:"var(--color-blue-dark)" }}>Reference Image</span>
                    <div className="qp-divider-line" />
                  </div>
                  <Field label="Upload a reference image" hint="JPG, PNG, WEBP · Max 10MB">
                    {form.imagePreview ? (
                      <div className="relative rounded-2xl overflow-hidden"
                        style={{ aspectRatio:"4/3", background:"var(--color-bg-main)" }}>
                        <img src={form.imagePreview} alt="Preview"
                          className="w-full h-full object-cover" />
                        <button type="button"
                          onClick={() => { set("image", null); set("imagePreview", null); }}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ background:"rgba(0,0,0,0.5)", border:"none", cursor:"pointer" }}>
                          <X size={14} style={{ color:"white" }} />
                        </button>
                        <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full"
                          style={{ background:"rgba(0,0,0,0.5)" }}>
                          <span style={{ fontSize:"11px", color:"white", fontWeight:600 }}>
                            {form.image?.name}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`qp-drop rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer ${dragOver ? "over" : ""}`}
                        style={{ border:`2px dashed ${dragOver ? "var(--color-blue)" : "var(--color-border)"}`, background: dragOver ? "var(--color-blue-soft)" : "var(--color-bg-main)", padding:"36px 20px", transition:"all 0.2s ease" }}
                        onClick={() => fileRef.current?.click()}
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true);  }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={handleDrop}
                      >
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                          style={{ background:"var(--color-blue-soft)" }}>
                          <ImagePlus size={24} style={{ color:"var(--color-blue)" }} />
                        </div>
                        <div className="text-center">
                          <p style={{ fontSize:"14px", fontWeight:700, color:"var(--color-blue-dark)", marginBottom:4 }}>
                            Drop image here
                          </p>
                          <p style={{ fontSize:"12px", color:"var(--color-text-secondary)" }}>
                            or <span style={{ color:"var(--color-blue)", fontWeight:600 }}>click to browse</span>
                          </p>
                        </div>
                        <input ref={fileRef} type="file" accept="image/*" className="hidden"
                          style={{ display:"none" }}
                          onChange={(e) => handleFile(e.target.files[0])} />
                      </div>
                    )}
                  </Field>
                </div>

                {/* Summary card */}
                <div className="rounded-2xl p-5"
                  style={{ background:"var(--color-blue-dark)", border:"none", position:"relative", overflow:"hidden" }}>
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg,transparent,var(--color-gold),transparent)" }} />
                  <div style={{ position:"absolute", inset:0, opacity:0.04, backgroundImage:"radial-gradient(circle,white 1px,transparent 1px)", backgroundSize:"20px 20px" }} />

                  <div style={{ position:"relative", zIndex:1 }}>
                    <p style={{ fontSize:"12px", fontWeight:700, color:"var(--color-gold)", letterSpacing:"1px", textTransform:"uppercase", marginBottom:14 }}>
                      Your Request Summary
                    </p>

                    {[
                      { label:"Name",      value: form.name                        },
                      { label:"Phone",     value: form.phone                       },
                      { label:"Category",  value: form.category.length ? form.category.map(c => CATEGORIES.find(x=>x.value===c)?.label).join(", ") : null },
                      { label:"Size",      value: form.widthCm && form.heightCm ? `${form.widthCm}×${form.heightCm} ${form.unit}` : null },
                      { label:"Material",  value: form.material.length ? form.material.join(", ") : null },
                      { label:"Quantity",  value: form.quantity ? QUANTITIES.find(q=>q.value===form.quantity)?.label : null },
                    ].map(({ label, value }) => value ? (
                      <div key={label} className="flex items-start justify-between gap-3 py-2.5"
                        style={{ borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
                        <span style={{ fontSize:"12px", color:"rgba(255,255,255,0.45)", fontWeight:600, flexShrink:0 }}>{label}</span>
                        <span style={{ fontSize:"12px", color:"rgba(255,255,255,0.85)", fontWeight:600, textAlign:"right", wordBreak:"break-word" }}>{value}</span>
                      </div>
                    ) : null)}

                    {!form.name && !form.phone && (
                      <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.35)", fontStyle:"italic", textAlign:"center", padding:"8px 0" }}>
                        Fill the form to see your summary
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <button type="submit" className="qp-submit w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-white font-bold text-[15px] cursor-pointer"
                  style={{ border:"none" }}>
                  <FileText size={18} />
                  Send Quote Request
                  <ArrowRight size={17} />
                </button>

                {/* Reassurance */}
                <div className="flex flex-col gap-2">
                  {[
                    { icon: Clock,   text: "Quote delivered within 24 hours"       },
                    { icon: Shield,  text: "No payment required to get a quote"    },
                    { icon: Phone,   text: "We'll call/WhatsApp you directly"       },
                  ].map(({ icon: Icon, text }, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <Icon size={13} style={{ color:"var(--color-blue)", flexShrink:0 }} />
                      <span style={{ fontSize:"12px", color:"var(--color-text-secondary)", fontWeight:500 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}