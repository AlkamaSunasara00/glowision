"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { Poppins, Inter } from "next/font/google";

const heading = Poppins({ subsets: ["latin"], weight: ["600", "700"] });
const body = Inter({ subsets: ["latin"], weight: ["400", "500"] });

const NAV_ITEMS = [
  { label: "Best Sellers", href: "#" },
  { label: "New Arrivals", href: "#" },
  {
    label: "Islamic Wall Decor",
    children: [
      { label: "Islamic Wall Clocks", href: "#" },
      { label: "Islamic Key Holders", href: "#" },
      { label: "Islamic Wall Art", href: "#" },
      { label: "Islamic Printed Art", href: "#" },
      { label: "Exclusive Combos", href: "#" },
    ],
  },
  {
    label: "Shop by Themes",
    children: [
      { label: "Ramadan Collection", href: "#" },
      { label: "Eid Special", href: "#" },
      { label: "Home & Living", href: "#" },
      { label: "Gift Sets", href: "#" },
    ],
  },
  { label: "Modern Wall Clocks", href: "#" },
  { label: "Bulk Orders", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Blog", href: "#" },
];

function Dropdown({ items }) {
  return (
    <div className="absolute left-0 top-full pt-2 z-50">
      <div className="bg-white border border-[var(--color-border)] rounded-xl shadow-lg min-w-[230px] overflow-hidden">
        {items.map((item) => (
          <a key={item.label} href={item.href} className={`${body.className} block px-5 py-2.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-blue)] hover:bg-[var(--color-blue-soft)] transition`}>
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function NavItem({ item }) {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);

  const enter = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };

  const leave = () => {
    timer.current = setTimeout(() => setOpen(false), 80);
  };

  if (!item.children) {
    return (
      <a href={item.href} className={`${body.className} relative text-[13.5px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-blue)] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[var(--color-gold)] hover:after:w-full after:transition`}>
        {item.label}
      </a>
    );
  }

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button className={`${body.className} flex items-center gap-1 text-[13.5px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-blue)]`}>
        {item.label}
        <ChevronDown size={14} className={open ? "rotate-180 transition" : ""} />
      </button>
      {open && <Dropdown items={item.children} />}
    </div>
  );
}

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
  }, [sidebarOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-[var(--color-border)] shadow-sm">

        {/* Top Row */}
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <div className="flex w-[66%] md:w-[33%]">
            <img src="/logos/logo1.png" alt="Glowison Logo" className="h-12 w-auto object-contain" />
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center w-[33%] gap-2 px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-main)]">
            <Search size={20} className="text-[var(--color-text-secondary)]" />
            <input placeholder="What are you looking for..." className={`${body.className} text-[var(--color-text-secondary)] bg-transparent outline-none text-md w-full`} />
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex justify-end gap-5 w-[33%]">
            <User className="hover:text-[var(--color-blue)] cursor-pointer transition" />
            <Heart className="hover:text-[var(--color-blue)] cursor-pointer transition" />
            <ShoppingBag className="hover:text-[var(--color-blue)] cursor-pointer transition" />
          </div>

          {/* Mobile Icons — only hamburger, no search icon */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} aria-label="Open menu">
              <Menu />
            </button>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex justify-center gap-8 py-5">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </nav>
      </header>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40"
          style={{ background: "rgba(10,14,28,0.45)", backdropFilter: "blur(4px)" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-full z-60 transform transition duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "var(--color-bg-main)" }}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[#EEF1F8]">
          <img src="/logos/logo1.png" alt="Glowison Logo" className="h-12 w-auto object-contain" />
          <button onClick={() => setSidebarOpen(false)}>
            <X size={26} />
          </button>
        </div>

        {/* Sidebar Items */}
        <div className="px-3 py-4 space-y-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <>
                  <button
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition"
                    style={{
                      background: expanded === item.label ? "var(--color-blue-soft)" : "white",
                      color: expanded === item.label ? "var(--color-blue)" : "var(--color-text-primary)",
                      border: "1px solid var(--color-border)",
                    }}
                    onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                  >
                    {item.label}
                    <ChevronDown size={16} className={`transition ${expanded === item.label ? "rotate-180" : ""}`} />
                  </button>

                  {expanded === item.label && (
                    <div className="ml-5 mt-2 space-y-2 py-3 px-2 rounded-lg" style={{ background: "var(--color-blue-soft)" }}>
                      {item.children.map((child) => (
                        <a key={child.label} href={child.href} className="block px-3 py-2 rounded-md transition" style={{ color: "var(--color-text-secondary)" }}>
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a href={item.href} className="block px-4 py-3 rounded-xl text-lg font-medium transition" style={{ background: "white", color: "var(--color-text-primary)" }}>
                  {item.label}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}