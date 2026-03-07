export const CATEGORIES = [
  {
    name: "Islamic Wall Art",
    slug: "islamic-wall-art",
    image: "/hero-images/hero4.jpg",
    subcategories: [
      { name: "Ayat Frames",        slug: "ayat-frames",        image: "/images/products/p2.png" },
      { name: "3D Islamic Art",     slug: "3d-islamic-art",     image: "/images/products/p4.png" },
      { name: "Calligraphy Panels", slug: "calligraphy-panels", image: "/images/products/p3.png" },
    ],
  },
  {
    name: "Islamic Wall Clocks",
    slug: "islamic-wall-clocks",
    image: "/hero-images/hero2.jpg",
    subcategories: [
      { name: "Metal Clocks",   slug: "metal-clocks",   image: "/images/products/p4.png" },
      { name: "Acrylic Clocks", slug: "acrylic-clocks", image: "/images/products/p3.png" },
    ],
  },
  {
    name: "Gifts",
    slug: "gifts",
    image: "/hero-images/hero5.jpeg",
    subcategories: [
      {
        name:        "Wedding Gifts",
        slug:        "wedding-gifts",
        image:       "/images/products/p1.png",
        bgImage:     "/gift-bg/wedding-gift-bg.png",   // ← wide mood photo shown as bg panel
        bgColor:     "#fff1f2",                   // ← soft fallback bg color
        accentColor: "#be123c",                   // ← deep rose red
      },
      {
        name:        "Birthday Gifts",
        slug:        "birthday-gifts",
        image:       "/images/products/p3.png",
        bgImage:     "/gift-bg/birthday-gift-bg.jpg",
        bgColor:     "#fffbeb",                   // ← warm amber soft
        accentColor: "#b45309",                   // ← amber brown
      },
      {
        name:        "Housewarming Gifts",
        slug:        "housewarming-gifts",
        image:       "/images/products/p2.png",
        bgImage:     "/gift-bg/home-gift-bg.webp",
        bgColor:     "#eff6ff",                   // ← soft sky blue
        accentColor: "#0369a1",                   // ← ocean blue
      },
      {
        name:        "Eid Gifts",
        slug:        "eid-gifts",
        image:       "/images/products/p4.png",
        bgImage:     "/gift-bg/eid-gift-bg.jpg",
        bgColor:     "#f5f3ff",                   // ← soft violet
        accentColor: "#6d28d9",                   // ← deep violet
      },
    ],
  },
];