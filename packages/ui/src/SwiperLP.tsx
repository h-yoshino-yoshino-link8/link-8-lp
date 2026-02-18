"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

interface SwiperLPProps {
  slides: ReactNode[];
  onSlideChange?: (index: number) => void;
}

export function SwiperLP({ slides, onSlideChange }: SwiperLPProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleSlideChange = (swiper: SwiperType) => {
    onSlideChange?.(swiper.activeIndex);
  };

  if (isMobile) {
    return (
      <Swiper
        direction="vertical"
        modules={[Pagination, Mousewheel, Keyboard]}
        pagination={{ clickable: true }}
        mousewheel
        keyboard
        speed={600}
        onSwiper={(s) => { swiperRef.current = s; }}
        onSlideChange={handleSlideChange}
        className="swiper"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>{slide}</SwiperSlide>
        ))}
      </Swiper>
    );
  }

  return (
    <div className="w-full">
      {slides.map((slide, i) => (
        <section key={i} className="min-h-screen flex items-center justify-center">
          {slide}
        </section>
      ))}
    </div>
  );
}
