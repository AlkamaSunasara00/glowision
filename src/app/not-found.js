import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found | Glowison",
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-[#344676] via-[#232f56] to-[#0d1220]">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
        <div className="flex justify-center">
          <div className="w-[220px] h-[220px] rounded-full border border-[#F2B461]/40 flex items-center justify-center bg-white/5">
            <span className="text-7xl font-bold text-white">404</span>
          </div>
        </div>

        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-semibold text-[#F2B461] mb-4">Page Not Found</h1>
          <p className="text-gray-300 leading-relaxed mb-8 max-w-md">
            The page you are looking for might have been removed, renamed, or is temporarily unavailable.
            Let&apos;s get you back to something useful.
          </p>

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
