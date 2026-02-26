"use client";

import { useState } from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const [open, setOpen] = useState(null);

  const toggle = (key) => setOpen(open === key ? null : key);

  return (
    <footer
      className="mt-20 text-white"
      style={{
        background:
          "linear-gradient(180deg, #2d3756 0%, #242E4A 100%)",
      }}
    >

      {/* ===== DESKTOP ===== */}
      <div className="hidden md:grid max-w-7xl mx-auto px-6 py-16 grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-semibold tracking-wide text-[var(--color-gold)]">
            Glowison
          </h2>

          <p className="text-sm mt-3 opacity-70 leading-relaxed">
            Premium Acrylic & Metal Wall Art crafted with precision and modern aesthetics.
          </p>

          {/* Social */}
          <div className="flex gap-3 mt-5">
            <SocialIcon><Facebook size={18} /></SocialIcon>
            <SocialIcon><Instagram size={18} /></SocialIcon>
            <SocialIcon><Twitter size={18} /></SocialIcon>
          </div>
        </div>

        <FooterCol title="Explore">
          <FooterLink text="Products" />
          <FooterLink text="Gallery" />
          <FooterLink text="Custom Projects" />
          <FooterLink text="Quote" />
        </FooterCol>

        <FooterCol title="Services">
          <FooterLink text="Laser Cutting" />
          <FooterLink text="LED Signage" />
          <FooterLink text="Name Plates" />
          <FooterLink text="Wall Decor" />
        </FooterCol>

        <FooterCol title="Contact">
          <FooterLink text="+91 XXXXX XXXXX" />
          <FooterLink text="hello@glowison.com" />
        </FooterCol>

      </div>

      {/* ===== MOBILE ===== */}
      <div className="md:hidden px-5 py-6">

        <MobileSection title="Explore" open={open === "explore"} toggle={() => toggle("explore")}>
          <FooterLink text="Products" />
          <FooterLink text="Gallery" />
          <FooterLink text="Custom Projects" />
          <FooterLink text="Quote" />
        </MobileSection>

        <MobileSection title="Services" open={open === "services"} toggle={() => toggle("services")}>
          <FooterLink text="Laser Cutting" />
          <FooterLink text="LED Signage" />
          <FooterLink text="Name Plates" />
          <FooterLink text="Wall Decor" />
        </MobileSection>

        <MobileSection title="Contact" open={open === "contact"} toggle={() => toggle("contact")}>
          <FooterLink text="+91 XXXXX XXXXX" />
          <FooterLink text="hello@glowison.com" />
        </MobileSection>

        {/* SOCIAL */}
        <div className="flex justify-center gap-4 mt-6">
          <SocialIcon><Facebook size={18} /></SocialIcon>
          <SocialIcon><Instagram size={18} /></SocialIcon>
          <SocialIcon><Twitter size={18} /></SocialIcon>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10 text-center py-4 text-sm opacity-70">
        © 2026 Glowison. All rights reserved.
      </div>

    </footer>
  );
}

/* ===== COMPONENTS ===== */

function FooterCol({ title, children }) {
  return (
    <div>
      <h3 className="text-sm uppercase tracking-wider font-semibold mb-4 text-[var(--color-gold)]">
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function FooterLink({ text }) {
  return (
    <p className="relative text-md opacity-70 hover:opacity-100 cursor-pointer transition group w-fit">
      {text}

      {/* animated underline */}
      <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[var(--color-gold)] transition-all duration-300 group-hover:w-full"></span>
    </p>
  );
}

function MobileSection({ title, open, toggle, children }) {
  return (
    <div className="border-b border-white/10 py-4">

      <button
        onClick={toggle}
        className="flex justify-between w-full text-left  font-semibold text-lg tracking-wide text-[var(--color-gold)]"
      >
        {title}
        <span className="text-xl ">{open ? "−" : "+"}</span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-60 opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-3 ">{children}</div>
      </div>

    </div>
  );
}

function SocialIcon({ children }) {
  return (
    <div
      className="w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition hover:scale-105"
      style={{
        background: "rgba(255,255,255,0.08)",
      }}
    >
      {children}
    </div>
  );
}