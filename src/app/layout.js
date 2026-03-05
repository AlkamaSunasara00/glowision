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
  title: "Glowison | Premium Islamic Wall Art & Decor",
  description: "Discover premium Ayatul Kursi frames, Islamic wall clocks, and luxury home decor in India.",
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