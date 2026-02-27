"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const originalSlides = [
  { id: 8, image: "/hero-images/image.png" },
  { id: 7, image: "/hero-images/hero7.jpeg" },
  { id: 5, image: "/hero-images/hero5.jpeg" },
  { id: 6, image: "/hero-images/hero6.jpeg" },
  { id: 1, image: "/hero-images/hero1.jpg" },
  { id: 2, image: "/hero-images/hero2.jpg" },
  { id: 3, image: "/hero-images/hero3.webp" },
  { id: 4, image: "/hero-images/hero4.jpg" },
];

const slides = [
  originalSlides[originalSlides.length - 1],
  ...originalSlides,
  originalSlides[0],
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(1);
  const [transition, setTransition] = useState(true);
  const [activeBtn, setActiveBtn] = useState(null);
  const sliderRef = useRef(null);
  const isAnimating = useRef(false);

  const goNext = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setActiveBtn("right");
    setCurrent((prev) => prev + 1);
  }, []);

  const goPrev = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setActiveBtn("left");
    setCurrent((prev) => prev - 1);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setActiveBtn(null);
    }, 400);
    return () => clearTimeout(timeout);
  }, [current]);

  useEffect(() => {
    const interval = setInterval(goNext, 40000);
    return () => clearInterval(interval);
  }, [goNext]);

  const currentRef = useRef(current);
  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  useEffect(() => {
    const slider = sliderRef.current;

    const handleTransitionEnd = () => {
      const cur = currentRef.current;

      if (cur === slides.length - 1) {
        setTransition(false);
        setCurrent(1);
      } else if (cur === 0) {
        setTransition(false);
        setCurrent(slides.length - 2);
      } else {
        isAnimating.current = false;
      }
    };

    slider.addEventListener("transitionend", handleTransitionEnd);
    return () => slider.removeEventListener("transitionend", handleTransitionEnd);
  }, []);

  useEffect(() => {
    if (!transition) {
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransition(true);
          isAnimating.current = false;
        });
      });
      return () => cancelAnimationFrame(id);
    }
  }, [transition]);

  return (
    <section className="relative w-full h-[65vh] md:h-[90vh] overflow-hidden group bg-black">
      
      {/* SLIDER TRACK */}
      <div
        ref={sliderRef}
        className="flex h-full"
        style={{
          transform: `translateX(-${current * 100}%)`,
          transition: transition ? "transform 700ms ease-in-out" : "none",
        }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full h-full relative">
            <img
              src={slide.image}
              alt="hero"
              className="w-full h-full object-cover object-center"
            />

            {/* Optional subtle dark overlay for premium look */}
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}
      </div>

      {/* LEFT BUTTON */}
      <button
        onClick={goPrev}
        className={`
          absolute left-0 top-1/2 -translate-y-1/2
          w-9 md:w-12 h-20 md:h-28
          rounded-r-2xl
          flex items-center justify-center
          shadow-md transition-all duration-300
          md:opacity-0 md:group-hover:opacity-100
          ${
            activeBtn === "left"
              ? "bg-[var(--color-gold)] text-white"
              : "bg-white text-[var(--color-blue-dark)] hover:bg-[var(--color-gold)] hover:text-white"
          }
        `}
      >
        <ChevronLeft />
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={goNext}
        className={`
          absolute right-0 top-1/2 -translate-y-1/2
          w-9 md:w-12 h-20 md:h-28
          rounded-l-2xl
          flex items-center justify-center
          shadow-md transition-all duration-300
          md:opacity-0 md:group-hover:opacity-100
          ${
            activeBtn === "right"
              ? "bg-[var(--color-gold)] text-white"
              : "bg-white text-[var(--color-blue-dark)] hover:bg-[var(--color-gold)] hover:text-white"
          }
        `}
      >
        <ChevronRight />
      </button>
    </section>
  );
}