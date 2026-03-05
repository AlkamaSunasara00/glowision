// FILE: src/app/components/home/FAQ.jsx
"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  { q: "How long does delivery take?",                   a: "Standard delivery takes 5–7 business days across India. Express 2–3 day delivery is available in major cities. You'll receive a tracking link once your order is shipped." },
  { q: "Do you offer Cash on Delivery (COD)?",           a: "Yes! COD is available on all orders across India. You pay only when the package arrives at your door. A small COD handling fee of ₹49 applies." },
  { q: "Can I get a custom design or size?",             a: "Absolutely. We create fully custom pieces — custom text (names, verses), custom sizes, and custom finishes. Fill out our quote form and we'll get back to you within 24 hours with a detailed quote." },
  { q: "What materials do you use?",                     a: "We work with premium Acrylic, MDF Wood, Sheesham Wood, Stainless Metal, and Foam Board. Gold and silver plating is applied on select items. All materials are sourced for durability and finish quality." },
  { q: "What is your return and refund policy?",         a: "We offer a 7-day easy return policy. If your product arrives damaged or differs from what was ordered, we'll replace it or issue a full refund — no questions asked." },
  { q: "Do you take bulk or corporate orders?",          a: "Yes, we handle bulk orders for mosques, corporates, events, and weddings. Orders of 10+ pieces receive a discount. Contact us via the quote page or WhatsApp for bulk pricing." },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="max-w-3xl mx-auto px-4 md:px-6 py-14 md:py-20">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
          style={{ background: "var(--color-blue-soft)", border: "1px solid var(--color-blue)" }}>
          <HelpCircle size={11} style={{ color: "var(--color-blue)" }} />
          <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-blue)", letterSpacing: "1px", textTransform: "uppercase" }}>
            FAQ
          </span>
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 600, color: "var(--color-blue-dark)", lineHeight: 1.15 }}>
          Frequently Asked Questions
        </h2>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-2">
        {FAQS.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div key={i}
              style={{ background: "var(--color-white)", border: `1.5px solid ${isOpen ? "var(--color-blue)" : "var(--color-border)"}`, borderRadius: 16, overflow: "hidden", transition: "border-color 0.2s ease", boxShadow: isOpen ? "0 4px 20px rgba(71,87,146,0.1)" : "none" }}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 text-left"
                style={{ padding: "16px 20px", cursor: "pointer", background: "transparent", border: "none", fontFamily: "'DM Sans',sans-serif" }}>
                <span style={{ fontSize: "14px", fontWeight: 700, color: isOpen ? "var(--color-blue)" : "var(--color-blue-dark)", lineHeight: 1.4, flex: 1 }}>
                  {faq.q}
                </span>
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-200"
                  style={{ background: isOpen ? "var(--color-blue)" : "var(--color-bg-main)", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                  <ChevronDown size={14} style={{ color: isOpen ? "white" : "var(--color-text-secondary)" }} />
                </div>
              </button>

              {/* Answer — grid-rows trick */}
              <div style={{ display: "grid", gridTemplateRows: isOpen ? "1fr" : "0fr", transition: "grid-template-rows 0.25s ease" }}>
                <div style={{ overflow: "hidden" }}>
                  <p style={{ padding: "0 20px 16px", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: 1.8 }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}