"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const originalSlides = [
  { id: 1, image: "/hero-images/hero1.jpg" },
  { id: 2, image: "/hero-images/hero2.jpg" },
  { id: 3, image: "/hero-images/hero3.webp" },
  { id: 3, image: "/hero-images/hero4.jpg" },
];

// Clone slides for infinite illusion
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
  const isAnimating = useRef(false); // true while slide transition is in progress

  const goNext = useCallback(() => {
    if (isAnimating.current) return; // block if mid-animation
    isAnimating.current = true;
    setActiveBtn("right");
    setCurrent((prev) => prev + 1);
  }, []);

  const goPrev = useCallback(() => {
    if (isAnimating.current) return; // block if mid-animation
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

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(goNext, 4000);
    return () => clearInterval(interval);
  }, [goNext]);

  // Read current via ref inside transitionend (avoids stale closure)
  const currentRef = useRef(current);
  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  useEffect(() => {
    const slider = sliderRef.current;

    const handleTransitionEnd = () => {
      const cur = currentRef.current;

      if (cur === slides.length - 1) {
        // Jumped past last clone → reset to real first (index 1)
        setTransition(false);
        setCurrent(1);
      } else if (cur === 0) {
        // Jumped before first clone → reset to real last
        setTransition(false);
        setCurrent(slides.length - 2);
      } else {
        // Normal slide finished → unlock immediately
        isAnimating.current = false;
      }
    };

    slider.addEventListener("transitionend", handleTransitionEnd);
    return () => slider.removeEventListener("transitionend", handleTransitionEnd);
  }, []);

  // After a clone-jump (transition disabled), re-enable and unlock
  useEffect(() => {
    if (!transition) {
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransition(true);
          isAnimating.current = false; // unlock after jump completes
        });
      });
      return () => cancelAnimationFrame(id);
    }
  }, [transition]);

  return (
    <section className="relative w-full aspect-[10/6] md:aspect-[16/6] overflow-hidden group">
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
          <div key={index} className="min-w-full h-full">
            <img
              src={slide.image}
              alt="hero"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <button
        onClick={goPrev}
        className={`
  absolute 
  left-0
  top-1/2 -translate-y-1/2 
  w-8 md:w-12 h-20 md:h-24
  rounded-r-xl
  flex items-center justify-center
  shadow-md
  transition-all duration-300
  hover:shadow-lg
  md:opacity-0 md:group-hover:opacity-100
  ${
    activeBtn === "left"
      ? "bg-[var(--color-gold)] text-white"
      : "bg-white text-[var(--color-blue-dark)] hover:bg-[var(--color-gold)] hover:text-white"
  }
  `}
      >
        <ChevronLeft className="transition-colors duration-300" />
      </button>

      <button
        onClick={goNext}
        className={`
  absolute 
  right-0
  top-1/2 -translate-y-1/2 
  w-8 md:w-12 h-20 md:h-24
  rounded-l-xl
  flex items-center justify-center
  shadow-md
  transition-all duration-300
  hover:shadow-lg
  md:opacity-0 md:group-hover:opacity-100
  ${
    activeBtn === "right"
      ? "bg-[var(--color-gold)] text-white"
      : "bg-white text-[var(--color-blue-dark)] hover:bg-[var(--color-gold)] hover:text-white"
  }
  `}
      >
        <ChevronRight className="transition-colors duration-300" />
      </button>
    </section>
  );
}