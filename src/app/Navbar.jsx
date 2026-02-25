// "use client";

// import { useState, useRef } from "react";
// import {
//   Search,
//   User,
//   Heart,
//   ShoppingBag,
//   Menu,
//   X,
//   ChevronDown,
// } from "lucide-react";
// import { Poppins, Inter } from "next/font/google";

// const heading = Poppins({ subsets: ["latin"], weight: ["600", "700"] });
// const body = Inter({ subsets: ["latin"], weight: ["400", "500"] });

// const NAV_ITEMS = [
//   { label: "Best Sellers", href: "#" },
//   { label: "New Arrivals", href: "#" },
//   {
//     label: "Islamic Wall Decor",
//     children: [
//       { label: "Islamic Wall Clocks", href: "#" },
//       { label: "Islamic Key Holders", href: "#" },
//       { label: "Islamic Wall Art", href: "#" },
//       { label: "Islamic Printed Art", href: "#" },
//       { label: "Exclusive Combos", href: "#" },
//     ],
//   },
//   {
//     label: "Shop by Themes",
//     children: [
//       { label: "Ramadan Collection", href: "#" },
//       { label: "Eid Special", href: "#" },
//       { label: "Home & Living", href: "#" },
//       { label: "Gift Sets", href: "#" },
//     ],
//   },
//   { label: "Modern Wall Clocks", href: "#" },
//   { label: "Bulk Orders", href: "#" },
//   { label: "Contact Us", href: "#" },
//   { label: "Blog", href: "#" },
// ];

// function Dropdown({ items }) {
//   return (
//     <div className="absolute left-0 top-full pt-2 z-50">
//       <div className="bg-white border border-[var(--color-border)] rounded-xl shadow-lg min-w-[230px] overflow-hidden">
//         {items.map((item) => (
//           <a
//             key={item.label}
//             href={item.href}
//             className={`${body.className} block px-5 py-2.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-blue)] hover:bg-[var(--color-blue-soft)] transition`}
//           >
//             {item.label}
//           </a>
//         ))}
//       </div>
//     </div>
//   );
// }

// function NavItem({ item }) {
//   const [open, setOpen] = useState(false);
//   const timer = useRef(null);

//   const enter = () => {
//     if (timer.current) clearTimeout(timer.current);
//     setOpen(true);
//   };

//   const leave = () => {
//     timer.current = setTimeout(() => setOpen(false), 80);
//   };

//   if (!item.children) {
//     return (
//       <a
//         href={item.href}
//         className={`${body.className} relative text-[13.5px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-blue)] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[var(--color-gold)] hover:after:w-full after:transition`}
//       >
//         {item.label}
//       </a>
//     );
//   }

//   return (
//     <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
//       <button
//         className={`${body.className} flex items-center gap-1 text-[13.5px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-blue)]`}
//       >
//         {item.label}
//         <ChevronDown
//           size={14}
//           className={open ? "rotate-180 transition" : ""}
//         />
//       </button>

//       {open && <Dropdown items={item.children} />}
//     </div>
//   );
// }

// export default function Navbar() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [expanded, setExpanded] = useState(null);

//   return (
//     <>
//       <header className="sticky top-0 z-50 bg-white border-b border-[var(--color-border)] shadow-sm">
//         {/* TOP ROW */}
//         <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-3 flex items-center justify-between">
//           {/* Search */}
//           <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-main)] w-64">
//             <Search size={16} className="text-[var(--color-text-secondary)]" />
//             <input
//               placeholder="What are you looking for..."
//               className={`${body.className} bg-transparent outline-none text-sm w-full`}
//             />
//           </div>

//           {/* Logo */}
//           <div className="flex flex-col items-center">
//             <span
//               className={`${heading.className} text-[26px] tracking-widest text-[var(--color-blue-dark)]`}
//             >
//               GLOWI<span className="text-[var(--color-gold)]">SON</span>
//             </span>
//             <span
//               className={`${body.className} text-[9px] uppercase tracking-[0.2em] text-[var(--color-text-secondary)]`}
//             >
//               Acrylic & Metal Wall Art
//             </span>
//           </div>

//           {/* Icons */}
//           <div className="hidden md:flex items-center gap-5">
//             <User className="hover:text-[var(--color-blue)] cursor-pointer transition" />
//             <Heart className="hover:text-[var(--color-blue)] cursor-pointer transition" />
//             <ShoppingBag className="hover:text-[var(--color-blue)] cursor-pointer transition" />
//           </div>

//           {/* Mobile button */}
//           <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
//             <Menu />
//           </button>
//         </div>

//         {/* NAV ROW */}
//         <nav className="hidden md:flex justify-center gap-8 py-3 border-t border-[var(--color-border)]">
//           {NAV_ITEMS.map((item) => (
//             <NavItem key={item.label} item={item} />
//           ))}
//         </nav>
//       </header>

//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 z-40"
//           style={{
//             background: "rgba(10,14,28,0.45)",
//             backdropFilter: "blur(4px)",
//           }}
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}
//       {/* SIDEBAR */}
//       <div
//         className={`fixed left-0 top-0 h-full w-[80%] z-50 transform transition duration-300 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//         style={{
//           background: "var(--color-bg-main)",
//           boxShadow: "10px 0 40px rgba(0,0,0,0.18)",
//         }}
//       >
//         {/* HEADER */}
//         <div
//           className="px-6 py-5"
//           style={{
//             background: "linear-gradient(135deg,#242E4A,#475792)",
//             color: "white",
//           }}
//         >
//           <h2 className="text-lg font-semibold tracking-widest">
//             GLOWI<span style={{ color: "var(--color-gold)" }}>SON</span>
//           </h2>
//           <p className="text-xs opacity-70 mt-1">Acrylic & Metal Wall Art</p>
//         </div>

//         {/* MENU */}
//         <div className="px-3 py-4 space-y-2 overflow-y-auto">
//           {NAV_ITEMS.map((item) => (
//             <div key={item.label}>
//               {item.children ? (
//                 <>
//                   <button
//                     className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition"
//                     style={{
//                       background:
//                         expanded === item.label
//                           ? "var(--color-blue-soft)"
//                           : "white",
//                       color:
//                         expanded === item.label
//                           ? "var(--color-blue)"
//                           : "var(--color-text-primary)",
//                       border: "1px solid var(--color-border)",
//                     }}
//                     onClick={() =>
//                       setExpanded(expanded === item.label ? null : item.label)
//                     }
//                   >
//                     <span className="flex items-center gap-3">
//                       <span
//                         style={{
//                           width: "4px",
//                           height: "18px",
//                           borderRadius: "10px",
//                           background:
//                             expanded === item.label
//                               ? "var(--color-blue)"
//                               : "var(--color-gold)",
//                           opacity: 0.7,
//                         }}
//                       />

//                       {item.label}
//                     </span>

//                     <ChevronDown
//                       size={16}
//                       className={`transition ${
//                         expanded === item.label ? "rotate-180" : ""
//                       }`}
//                     />
//                   </button>

//                   {expanded === item.label && (
//                     <div
//                       className="ml-5 mt-2 space-y-1 p-2 rounded-lg"
//                       style={{ background: "var(--color-blue-soft)" }}
//                     >
//                       {item.children.map((child) => (
//                         <a
//                           key={child.label}
//                           href={child.href}
//                           className="block px-3 py-2 rounded-md text-sm transition"
//                           style={{
//                             color: "var(--color-text-secondary)",
//                           }}
//                           onMouseEnter={(e) => {
//                             e.currentTarget.style.background =
//                               "rgba(255,255,255,0.6)";
//                             e.currentTarget.style.color = "var(--color-blue)";
//                           }}
//                           onMouseLeave={(e) => {
//                             e.currentTarget.style.background = "transparent";
//                             e.currentTarget.style.color =
//                               "var(--color-text-secondary)";
//                           }}
//                         >
//                           {child.label}
//                         </a>
//                       ))}
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 <a
//                   href={item.href}
//                   className="block px-4 py-3 rounded-xl text-sm font-medium transition"
//                   style={{
//                     background: "white",
//                     border: "1px solid var(--color-border)",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.background = "var(--color-blue-soft)";
//                     e.currentTarget.style.color = "var(--color-blue)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.background = "white";
//                     e.currentTarget.style.color = "var(--color-text-primary)";
//                   }}
//                 >
//                   {item.label}
//                 </a>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

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
  ChevronLeft,
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
          <a
            key={item.label}
            href={item.href}
            className={`${body.className} block px-5 py-2.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-blue)] hover:bg-[var(--color-blue-soft)] transition`}
          >
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
      <a
        href={item.href}
        className={`${body.className} relative text-[13.5px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-blue)] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[var(--color-gold)] hover:after:w-full after:transition`}
      >
        {item.label}
      </a>
    );
  }

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        className={`${body.className} flex items-center gap-1 text-[13.5px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-blue)]`}
      >
        {item.label}
        <ChevronDown
          size={14}
          className={open ? "rotate-180 transition" : ""}
        />
      </button>

      {open && <Dropdown items={item.children} />}
    </div>
  );
}

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const overlayRef = useRef(null);

  // ✅ BODY SCROLL LOCK
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
  }, [sidebarOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-[var(--color-border)] shadow-sm">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-main)] w-64">
            <Search size={16} className="text-[var(--color-text-secondary)]" />
            <input
              placeholder="What are you looking for..."
              className={`${body.className} bg-transparent outline-none text-sm w-full`}
            />
          </div>

          {/* Logo */}
          <div className="flex flex-col items-center">
            <span
              className={`${heading.className} text-[26px] tracking-widest text-[var(--color-blue-dark)]`}
            >
              GLOWI<span className="text-[var(--color-gold)]">SON</span>
            </span>
            <span
              className={`${body.className} text-[9px] uppercase tracking-[0.2em] text-[var(--color-text-secondary)]`}
            >
              Acrylic & Metal Wall Art
            </span>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center gap-5">
            <User className="hover:text-[var(--color-blue)] cursor-pointer transition" />
            <Heart className="hover:text-[var(--color-blue)] cursor-pointer transition" />
            <ShoppingBag className="hover:text-[var(--color-blue)] cursor-pointer transition" />
          </div>

          {/* ✅ ANIMATED HAMBURGER */}
          <button
            className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-[5px]"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span
              className={`w-6 h-[2px] bg-black transition ${sidebarOpen ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              className={`w-6 h-[2px] bg-black transition ${sidebarOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`w-6 h-[2px] bg-black transition ${sidebarOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
            />
          </button>
        </div>

        <nav className="hidden md:flex justify-center  gap-8 py-5 border-t border-[var(--color-border)]">
          {NAV_ITEMS.map((item) => (
            <NavItem className key={item.label} item={item} />
          ))}
        </nav>
      </header>

      {/* ✅ OVERLAY CLICK CLOSE */}
      {sidebarOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-40"
          style={{
            background: "rgba(10,14,28,0.45)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed left-0 top-0 h-full w-[85%] z-50 transform transition duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: "var(--color-bg-main)",
          boxShadow: "10px 0 40px rgba(0,0,0,0.18)",
        }}
      >
        {/* YOUR ORIGINAL SIDEBAR CONTENT BELOW (UNCHANGED) */}

        <div
          className="px-5 md:px-8 py-4.5"
          style={{
            background: "linear-gradient(135deg,#242E4A,#475792)",
            color: "white",
          }}
        >
          <h2 className="text-lg font-semibold tracking-widest">
            GLOWI<span style={{ color: "var(--color-gold)" }}>SON</span>
          </h2>
          <p className="text-xs opacity-70 mt-1">Acrylic & Metal Wall Art</p>
        </div>

        <div className="px-3 py-4 space-y-2 overflow-y-auto ">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <>
                  <button
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition"
                    style={{
                      background:
                        expanded === item.label
                          ? "var(--color-blue-soft)"
                          : "white",
                      color:
                        expanded === item.label
                          ? "var(--color-blue)"
                          : "var(--color-text-primary)",
                      border: "1px solid var(--color-border)",
                    }}
                    onClick={() =>
                      setExpanded(expanded === item.label ? null : item.label)
                    }
                  >
                    <span className="flex items-center gap-3 text-lg">
                      <span
                        style={{
                          width: "4px",
                          height: "18px",
                          borderRadius: "10px",
                          background:
                            expanded === item.label
                              ? "var(--color-blue)"
                              : "var(--color-gold)",
                          opacity: 0.7,
                        }}
                      />

                      {item.label}
                    </span>

                    <ChevronDown
                      size={16}
                      className={`transition ${
                        expanded === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {expanded === item.label && (
                    <div
                      className="ml-5 mt-2 space-y-2 py-3 px-2   rounded-lg"
                      style={{ background: "var(--color-blue-soft)" }}
                    >
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block px-3 py-2  rounded-md transition"
                          style={{
                            color: "var(--color-text-secondary)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "rgba(255,255,255,0.6)";
                            e.currentTarget.style.color = "var(--color-blue)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color =
                              "var(--color-text-secondary)";
                          }}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                
                <a
                  href={item.href}
                  className="block px-4 py-3 rounded-xl text-lg font-medium transition shadow-sm "
                  style={{
                    background: "white",
                    
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--color-blue-soft)";
                    e.currentTarget.style.color = "var(--color-blue)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "white";
                    e.currentTarget.style.color = "var(--color-text-primary)";
                  }}
                >
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
