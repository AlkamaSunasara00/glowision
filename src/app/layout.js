import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Poppins, Inter } from "next/font/google";
import BottomTabBar from "./components/home/TabBar";
import { Suspense } from "react"; // 1. Import Suspense

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

export const metadata = {
  metadataBase: new URL("https://glowisongraphics.com"),

  title: {
    default: "Glowison | Laser Cutting, Printing & Design Services in Palanpur",
    template: "%s | Glowison Graphics",
  },

  verification: {
    google: "IQ_6o34Ylzouizf3r7-53Uh8c4aBEnXEbCCePVX_4P8",
  },

  description:
    "Glowison provides professional laser cutting, acrylic name plates, MDF cutting, visiting card printing, digital printing and custom wall decor in Palanpur, Chhapi and Banaskantha, Gujarat.",

  keywords: [
    "Glowison",
    "laser cutting Palanpur",
    "laser cutting Chhapi",
    "acrylic name plate Palanpur",
    "MDF laser cutting Gujarat",
    "visiting card printing Palanpur",
    "digital printing Chhapi",
    "wall decor laser cutting",
    "custom name plate Gujarat",
    "Glowison Graphics",
  ],

  authors: [{ name: "Glowison Graphics" }],
  creator: "Glowison Graphics",
  publisher: "Glowison Graphics",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Glowison | Laser Cutting & Printing Services",
    description:
      "Professional laser cutting, acrylic name plates, wall decor and digital printing services in Palanpur, Chhapi and Banaskantha.",
    url: "https://glowision.vercel.app",
    siteName: "Glowison",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Glowison Laser Cutting & Printing",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Glowison | Laser Cutting & Printing",
    description:
      "Laser cutting, acrylic name plates, digital printing and wall decor services in Palanpur & Chhapi.",
    images: ["/og-image.jpg"],
  },

  alternates: {
    canonical: "https://glowision.vercel.app",
  },

  category: "Business",

  other: {
    "geo.region": "IN-GJ",
    "geo.placename": "Palanpur, Gujarat",
    "geo.position": "24.1745;72.4330",
    "ICBM": "24.1745, 72.4330",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable} antialiased`}>
        {/* Wrap components that use useSearchParams() in Suspense. 
            This prevents the build from failing during static generation.
        */}
        <Suspense fallback={<div className="h-20 bg-white" />}>
          <Navbar />
        </Suspense>

        {children}

        <Footer />

        <Suspense fallback={null}>
          <BottomTabBar />
        </Suspense>
      </body>
    </html>
  );
}


<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Glowison Graphics",
      image: "https://glowisongraphics.com/og-image.jpg",
      url: "https://glowisongraphics.com",
      telephone: "+91-9624721516",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Galaxy Complex, Opp Hotel Ekta",
        addressLocality: "Chhapi",
        addressRegion: "Gujarat",
        postalCode: "385210",
        addressCountry: "IN",
      },
      areaServed: [
        "Palanpur",
        "Chhapi",
        "Banaskantha",
        "Gujarat"
      ],
      sameAs: [
        "https://www.instagram.com/glowison"
      ]
    }),
  }}
/>