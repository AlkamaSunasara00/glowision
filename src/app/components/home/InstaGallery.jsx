// FILE: src/app/components/home/InstagramGallery.jsx
// Place your video at: public/insta-video.mp4
"use client";

import { Instagram, ExternalLink } from "lucide-react";

export default function InstagramGallery() {
  return (
    <>
      <style>{`
        @keyframes igPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(225,48,108,0.5); }
          50%       { box-shadow: 0 0 0 8px rgba(225,48,108,0); }
        }
        .ig-badge { animation: igPulse 2.5s ease-in-out infinite; }

        @keyframes igFadeUp {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .ig-a1 { animation: igFadeUp 0.5s ease 0.05s both; }
        .ig-a2 { animation: igFadeUp 0.5s ease 0.15s both; }
        .ig-a3 { animation: igFadeUp 0.5s ease 0.25s both; }
        .ig-a4 { animation: igFadeUp 0.5s ease 0.35s both; }
        .ig-a5 { animation: igFadeUp 0.5s ease 0.45s both; }
      `}</style>

      <section
        className="relative overflow-hidden"
        style={{ background: "var(--color-blue-dark)" }}
      >
        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,white,white 1px,transparent 1px,transparent 44px)," +
              "repeating-linear-gradient(90deg,white,white 1px,transparent 1px,transparent 44px)",
          }}
        />

        {/* Gold top rule */}
        <div className="h-[2px]"
          style={{ background: "linear-gradient(90deg,transparent,var(--color-gold) 30%,var(--color-gold) 70%,transparent)" }}
        />

        <div className="relative max-w-6xl mx-auto px-4 md:px-10 py-14 md:py-20">

          {/* ── Section label ── */}
          <div className="ig-a1 flex items-center justify-center gap-3 mb-12">
            <div className="h-px flex-1 max-w-[72px]" style={{ background: "rgba(242,180,97,0.25)" }} />
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: "rgba(225,48,108,0.12)", border: "1px solid rgba(225,48,108,0.28)" }}>
              <Instagram size={12} color="#f472b6" />
              <span className="text-[10px] font-bold tracking-[2px] uppercase text-pink-400">
                Instagram
              </span>
            </div>
            <div className="h-px flex-1 max-w-[72px]" style={{ background: "rgba(242,180,97,0.25)" }} />
          </div>

          {/* ── Two column: video left, text right ── */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

            {/* ── VIDEO — phone frame ── */}
            <div className="ig-a2 order-2 lg:order-1 w-full lg:w-[42%] flex justify-center">
              <div className="relative" style={{ width: "min(260px, 78vw)" }}>

                {/* Glow behind */}
                <div className="absolute -inset-8 -z-10 blur-3xl opacity-25 rounded-full"
                  style={{ background: "radial-gradient(circle,#E1306C 0%,transparent 70%)" }}
                />

                {/* Phone frame */}
                <div
                  className="relative rounded-[32px] overflow-hidden"
                  style={{
                    aspectRatio: "9/16",
                    border: "2.5px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 40px 90px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                  {/* Fallback bg */}
                  <div className="absolute inset-0"
                    style={{ background: "linear-gradient(160deg,#1a2e6e 0%,#2d4a9e 45%,#E1306C 100%)" }}
                  />

                  {/* Video */}
                  <video
                    src="/insta-video.mp4"
                    autoPlay muted loop playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Bottom fade */}
                  <div className="absolute bottom-0 left-0 right-0 h-28"
                    style={{ background: "linear-gradient(to top,rgba(0,0,0,0.65),transparent)" }}
                  />

                  {/* Handle pill at bottom */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                      style={{ background: "rgba(0,0,0,0.48)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <Instagram size={10} color="white" />
                      <span className="text-[10px] font-bold text-white tracking-wider">@glowisongraphics</span>
                    </div>
                  </div>
                </div>

                {/* Floating Instagram icon badge */}
                <div className="ig-badge absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg,#E1306C,#F77737)", border: "2.5px solid var(--color-blue-dark)" }}>
                  <Instagram size={15} color="white" />
                </div>
              </div>
            </div>

            {/* ── TEXT ── */}
            <div className="order-1 lg:order-2 w-full lg:w-[58%] text-center lg:text-left">

              <h2 className="ig-a3 text-[clamp(26px,3.8vw,46px)] font-bold leading-[1.1] tracking-tight mb-5 text-white">
                See Our Work<br />
                <span style={{ color: "var(--color-gold)" }}>in Real Homes</span>
              </h2>

              <p className="ig-a3 text-[14px] leading-relaxed mb-8 max-w-md mx-auto lg:mx-0"
                style={{ color: "rgba(255,255,255,0.5)" }}>
                From Ayatul Kursi frames to handcrafted clocks — see how our pieces transform homes across India. Follow for daily inspiration and new drops.
              </p>

              {/* Stats row */}
              <div className="ig-a4 flex items-center justify-center lg:justify-start gap-8 mb-10">
                {[
                  { value: "10K+",  label: "Followers" },
                  { value: "500+",  label: "Posts"     },
                  { value: "Daily", label: "Updates"   },
                ].map((s, i) => (
                  <div key={i}>
                    <p className="text-[22px] font-bold text-white leading-none">{s.value}</p>
                    <p className="text-[11px] mt-1 font-medium" style={{ color: "rgba(255,255,255,0.38)" }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="ig-a4 mb-8 h-px max-w-xs mx-auto lg:mx-0"
                style={{ background: "rgba(255,255,255,0.08)" }}
              />

              {/* CTA */}
              <div className="ig-a5 flex justify-center lg:justify-start">
                <a
                  href="https://www.instagram.com/glowisongraphics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-[14px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg,#E1306C 0%,#F77737 100%)",
                    boxShadow: "0 4px 20px rgba(225,48,108,0.35)",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 10px 32px rgba(225,48,108,0.52)"}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 4px 20px rgba(225,48,108,0.35)"}
                >
                  <Instagram size={16} />
                  Follow @glowisongraphics
                  <ExternalLink size={13} className="opacity-70" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Gold bottom rule */}
        <div className="h-[2px]"
          style={{ background: "linear-gradient(90deg,transparent,var(--color-gold) 30%,var(--color-gold) 70%,transparent)" }}
        />
      </section>
    </>
  );
}















































// // FILE: src/app/components/home/InstagramGallery.jsx
// // Place your video at: public/insta-video.mp4
// "use client";

// import { Instagram, ExternalLink } from "lucide-react";

// export default function InstagramGallery() {
//   return (
//     <>
//       <style>{`
//         @keyframes igFadeUp {
//           from { opacity:0; transform:translateY(16px); }
//           to   { opacity:1; transform:translateY(0); }
//         }
//         .ig-a1 { animation: igFadeUp 0.6s ease 0.1s both; }
//         .ig-a2 { animation: igFadeUp 0.6s ease 0.25s both; }
//         .ig-a3 { animation: igFadeUp 0.6s ease 0.4s both; }
//         .ig-a4 { animation: igFadeUp 0.6s ease 0.55s both; }

//         .ig-btn {
//           transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
//         }
//         .ig-btn:hover {
//           transform: translateY(-1px);
//           box-shadow: 0 8px 28px rgba(225,48,108,0.45);
//         }
//         .ig-btn:active { transform: scale(0.97); }
//       `}</style>

//       {/* ── Full-width video banner ── */}
//       <section className="relative w-full overflow-hidden" style={{ height: "clamp(480px, 70vh, 680px)" }}>

//         {/* Fallback gradient behind video */}
//         <div
//           className="absolute inset-0"
//           style={{ background: "linear-gradient(160deg, #0f1c45 0%, #1a2e6e 60%, #0d1a3a 100%)" }}
//         />

//         {/* Video — full cover */}
//         <video
//           src="/insta-video.mp4"
//           autoPlay muted loop playsInline
//           className="absolute inset-0 w-full h-full object-cover"
//           style={{ opacity: 0.75 }}
//         />

//         {/* Dark gradient overlay — bottom heavy so text is legible */}
//         <div
//           className="absolute inset-0"
//           style={{
//             background:
//               "linear-gradient(to top, rgba(10,18,45,0.92) 0%, rgba(10,18,45,0.55) 45%, rgba(10,18,45,0.15) 100%)",
//           }}
//         />

//         {/* ── Content — bottom aligned ── */}
//         <div className="absolute inset-0 flex flex-col justify-end">
//           <div className="max-w-6xl mx-auto w-full px-5 md:px-10 pb-12 md:pb-16">

//             {/* Instagram label */}
//             <div className="ig-a1 inline-flex items-center gap-2 mb-5">
//               <Instagram size={13} color="white" style={{ opacity: 0.7 }} />
//               <span
//                 className="text-[11px] font-bold tracking-[2.5px] uppercase text-white"
//                 style={{ opacity: 0.6 }}
//               >
//                 @glowisongraphics
//               </span>
//             </div>

//             {/* Headline */}
//             <h2 className="ig-a2 text-white font-bold leading-[1.1] tracking-tight mb-4"
//               style={{ fontSize: "clamp(28px, 5vw, 54px)", maxWidth: 560 }}>
//               See Our Work<br />
//               <span style={{ color: "var(--color-gold)" }}>in Real Homes</span>
//             </h2>

//             {/* Subtext */}
//             <p className="ig-a3 text-[14px] mb-8"
//               style={{ color: "rgba(255,255,255,0.55)", maxWidth: 420, lineHeight: 1.7 }}>
//               Follow us for daily inspiration, new drops, and behind-the-scenes from our studio.
//             </p>

//             {/* CTA */}
//             <a
//               href="https://www.instagram.com/glowisongraphics"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="ig-a4 ig-btn inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-[13px] font-bold text-white"
//               style={{
//                 background: "linear-gradient(135deg, #E1306C 0%, #F77737 100%)",
//                 boxShadow: "0 4px 18px rgba(225,48,108,0.35)",
//               }}
//             >
//               <Instagram size={15} />
//               Follow on Instagram
//               <ExternalLink size={12} style={{ opacity: 0.7 }} />
//             </a>
//           </div>
//         </div>

//         {/* ── Top-right: floating handle chip ── */}
//         <div className="absolute top-5 right-5">
//           <div
//             className="flex items-center gap-2 px-3 py-2 rounded-full"
//             style={{
//               background: "rgba(255,255,255,0.08)",
//               backdropFilter: "blur(12px)",
//               border: "1px solid rgba(255,255,255,0.12)",
//             }}
//           >
//             <div
//               className="w-2 h-2 rounded-full"
//               style={{ background: "#E1306C", boxShadow: "0 0 6px #E1306C" }}
//             />
//             <span className="text-[11px] font-semibold text-white" style={{ opacity: 0.85 }}>
//               Live on Instagram
//             </span>
//           </div>
//         </div>

//       </section>
//     </>
//   );
// }