"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { CATEGORIES } from "@/app/data/categoriesData";

// ── Build Explore links dynamically from CATEGORIES ──────────────────────────
const EXPLORE_LINKS = [
  { label: "All Products", href: "/products" },
  ...CATEGORIES.map((cat) => ({ label: cat.name, href: `/${cat.slug}` })),
  { label: "Custom Quote", href: "/quote" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact" },
];

const SERVICE_LINKS = [
  { label: "Islamic Wall Art", href: "/islamic-wall-art" },
  { label: "Name Plates", href: "#" },
  { label: "Wall Clocks", href: "/islamic-wall-clocks" },
  { label: "Bulk Orders", href: "/quote" },
];

const CONTACT_ITEMS = [
  {
    icon: Phone,
    text: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+91 99787 50622",
    href: `tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+919978750622"}`,
    color: "#16a34a",
  },
  {
    icon: Mail,
    text:
      process.env.NEXT_PUBLIC_CONTACT_EMAIL ??
      "connect.glowisonchhapi@gmail.com",
    href: `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "connect.glowisonchhapi@gmail.com"}`,
    color: "var(--color-blue)",
  },
  {
    icon: MapPin,
    text:
      process.env.NEXT_PUBLIC_CONTACT_ADDRESS ??
      "Galaxy Complex, Opp Hotel Ekta Palanpur- Ahmedabad Highway, Chhapi",
    href: `https://maps.google.com/?q=${encodeURIComponent(process.env.NEXT_PUBLIC_CONTACT_ADDRESS ?? "Galaxy Complex, Opp Hotel Ekta Palanpur- Ahmedabad Highway, Chhapi")}`,
    color: "#dc2626",
  },
];

const SOCIAL = [
  { icon: Instagram, color: "#E1306C" },
  { icon: Facebook, color: "#1877F2" },
  { icon: Twitter, color: "#1DA1F2" },
];

export default function Footer() {
  const [open, setOpen] = useState(null);
  const toggle = (key) => setOpen(open === key ? null : key);

  return (
    <footer
      className="text-white mt-20 md:pb-0 pb-20"
      style={{ background: "var(--color-blue-dark)" }}
    >
      {/* Top gold bar */}
      <div
        className="h-1 w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-gold), transparent)",
        }}
      />

      {/* ══════════════ DESKTOP ══════════════ */}
      <div className="hidden md:block max-w-7xl mx-auto px-8 pt-16 pb-12">
        <div className="grid grid-cols-12 gap-10">
          {/* Brand col */}
          <div className="col-span-3">
            <img
              src="/logos/logo2.png"
              alt="Glowison"
              className="h-12 w-auto object-contain mb-4"
            />
            <p className="text-[13px] leading-relaxed text-white/60 max-w-[260px] mt-5">
              Premium Acrylic & Metal Wall Art crafted with precision, elegance,
              and modern Islamic aesthetics.
            </p>

            {/* Social */}
            <div className="flex gap-2.5 mt-6">
              {SOCIAL.map(({ icon: Icon, color }, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-xl bg-white flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <Icon size={16} style={{ color }} />
                </button>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-7">
              <p className="text-[11px] font-bold text-white/30 uppercase tracking-[1.2px] mb-2.5">
                Stay Updated
              </p>
              <div className="flex gap-2">
                <input
                  placeholder="Your email..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl text-[13px] text-gray-700 placeholder:text-gray-400 outline-none border border-gray-200 focus:border-[var(--color-gold)] transition-colors"
                  style={{ background: "#ffffff" }}
                />
                <button
                  className="px-4 py-2.5 rounded-xl text-[12px] font-bold cursor-pointer transition-transform duration-200 hover:-translate-y-0.5"
                  style={{
                    background: "var(--color-gold)",
                    color: "var(--color-blue-dark)",
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="col-span-1 flex justify-center">
            <div className="w-px h-full bg-white/10" />
          </div>

          {/* Link cols */}
          <div className="col-span-7 grid grid-cols-3 gap-0">
            {/* ── Explore — dynamic from CATEGORIES ── */}
            <DesktopCol title="Explore" links={EXPLORE_LINKS} />

            {/* ── Services ── */}
            <DesktopCol title="Services" links={SERVICE_LINKS} />

            {/* ── Contact ── */}
            <div>
              <p className="text-[15px] font-bold text-[var(--color-gold)] uppercase tracking-[1.5px] mb-5">
                Contact
              </p>
              <div className="space-y-3.5">
                {CONTACT_ITEMS.map(({ icon: Icon, text, href, color }) => (
                  <a
                    key={text}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : "_self"}
                    rel="noreferrer"
                    className="flex place-items-start gap-2.5 group cursor-pointer no-underline"
                  >
                    <div
                      className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shrink-0"
                      style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      <Icon size={13} style={{ color }} />
                    </div>
                    <span className="text-[14px] text-white/60 group-hover:text-white/90 transition-colors duration-150 font-medium">
                      {text}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════ MOBILE ══════════════ */}
      <div className="md:hidden">
        {/* Brand header */}
        <div className="px-5 pt-8 pb-6 border-b border-white/10">
          <img
            src="/logos/logo2.png"
            alt="Glowison"
            className="h-10 w-auto object-contain mb-3"
          />
          <p className="text-[13px] text-white/50 leading-relaxed max-w-[280px] mt-5">
            Premium Islamic Wall Art crafted with precision and modern
            aesthetics.
          </p>
          <div className="flex gap-2.5 mt-4">
            {SOCIAL.map(({ icon: Icon, color }, i) => (
              <button
                key={i}
                className="w-9 h-9 rounded-xl bg-white flex items-center justify-center cursor-pointer"
                style={{ border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <Icon size={16} style={{ color }} />
              </button>
            ))}
          </div>
        </div>

        {/* Accordion */}
        <div className="px-4 py-3">
          {[
            {
              key: "explore",
              title: "Explore",
              // ── Dynamic from CATEGORIES ──
              links: EXPLORE_LINKS,
            },
            {
              key: "services",
              title: "Services",
              links: SERVICE_LINKS,
            },
            {
              key: "contact",
              title: "Contact",
              custom: (
                <div className="space-y-2.5 pb-1">
                  {CONTACT_ITEMS.map(({ icon: Icon, text, href, color }) => (
                    <a
                      key={text}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : "_self"}
                      rel="noreferrer"
                      className="flex items-center gap-3 no-underline"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        <Icon size={13} style={{ color }} />
                      </div>
                      <span className="text-[13px] text-white/60 font-medium">
                        {text}
                      </span>
                    </a>
                  ))}
                </div>
              ),
            },
          ].map(({ key, title, links, custom }) => (
            <div key={key} className="border-b border-white/10 last:border-b-0">
              <button
                onClick={() => toggle(key)}
                className="w-full flex items-center justify-between py-4 cursor-pointer"
              >
                <span className="text-[17px] font-bold text-white/90 tracking-wide">
                  {title}
                </span>
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-200"
                  style={{
                    background:
                      open === key
                        ? "var(--color-gold)"
                        : "rgba(255,255,255,0.08)",
                  }}
                >
                  <ChevronDown
                    size={14}
                    color={open === key ? "var(--color-blue-dark)" : "white"}
                    style={{
                      transform:
                        open === key ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                    }}
                  />
                </div>
              </button>

              <div
                className="grid transition-[grid-template-rows] duration-200 ease-out"
                style={{ gridTemplateRows: open === key ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <div className="pb-4">
                    {custom ? (
                      custom
                    ) : (
                      <div className="space-y-1">
                        {links.map(({ label, href }) => (
                          <Link
                            key={label}
                            href={href}
                            className="flex items-center gap-2.5 px-3 pl-5 py-2.5 rounded-xl hover:bg-white/5 transition-colors duration-150 group"
                          >
                            <ArrowRight
                              size={16}
                              className="text-[var(--color-gold)] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform duration-150"
                            />
                            <span className="text-[15px] text-white/60 font-medium group-hover:text-white/90 transition-colors duration-150">
                              {label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile newsletter */}
        <div
          className="mx-4 mb-6 mt-2 p-4 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <p className="text-[11px] font-bold text-[var(--color-gold)] uppercase tracking-[1.2px] mb-2.5">
            Stay Updated
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email..."
              className="flex-1 px-3.5 py-2.5 rounded-xl text-[13px] text-gray-700 placeholder:text-gray-400 outline-none border border-gray-200 focus:border-[var(--color-gold)] transition-colors"
              style={{ background: "#ffffff" }}
            />
            <button
              className="px-4 py-2.5 rounded-xl text-[12px] font-bold cursor-pointer transition-transform duration-200 hover:opacity-90"
              style={{
                background: "var(--color-gold)",
                color: "var(--color-blue-dark)",
              }}
            >
              Go
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-5 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-[13px] text-white/40 font-medium">
          © 2026 Glowison. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {[
            { label: "Privacy Policy",  href: "/privacy-policy"  },
            { label: "Terms of Use",    href: "/terms-of-use"    },
            { label: "Shipping Policy", href: "/shipping-policy" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-150 font-medium"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

function DesktopCol({ title, links }) {
  return (
    <div>
      <p className="text-[15px] font-bold text-[var(--color-gold)] uppercase tracking-[1.5px] mb-5">
        {title}
      </p>
      <div className="space-y-3">
        {links.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-2 text-[14px] text-white/55 hover:text-white/90 transition-colors duration-150 font-medium group w-fit"
          >
            <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-150 opacity-0 group-hover:opacity-100">
              <ArrowRight size={13} className="text-[var(--color-gold)]" />
            </span>
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
