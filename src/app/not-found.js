"use client";

import Link from "next/link";
import animationData from "../../public/animations/404.json";
import Lottie from "lottie-react";


export const metadata = {
  title: "404 — Page Not Found | Glowison",
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-[#344676] via-[#232f56] to-[#0d1220]">

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT — Animation */}
        <div className="flex justify-center">
          <div className="w-[350px] md:w-[700px]">
            <Lottie animationData={animationData} loop={true} />
          </div>
        </div>

        {/* RIGHT — Content */}
        <div className="text-center md:text-left">

          <h1 className="text-7xl font-bold text-white mb-4">
            404
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold text-[#F2B461] mb-4">
            Page Not Found
          </h2>

          <p className="text-gray-300 leading-relaxed mb-8 max-w-md">
            The page you are looking for might have been removed,
            renamed, or is temporarily unavailable.
            Let’s get you back to something beautiful.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">

            <Link
              href="/"
              className="px-6 py-3 rounded-lg bg-[#F2B461] text-[#0d1220] font-semibold hover:opacity-90 transition"
            >
              Go Home
            </Link>

            <Link
              href="/products"
              className="px-6 py-3 rounded-lg border border-[#F2B461] text-[#F2B461] hover:bg-[#F2B461] hover:text-[#0d1220] transition"
            >
              Browse Products
            </Link>

          </div>

        </div>
      </div>
    </main>
  );
}