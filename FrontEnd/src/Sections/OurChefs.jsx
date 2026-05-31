import React, { useState, useEffect, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ChefsData from "../dummy//ChefsData.json";

const OurChefs = () => {
  const [visible, setVisible] = useState([]);
  const cardRefs = useRef([]);

  // Intersection Observer — each card fades in when it scrolls into view
  useEffect(() => {
    const observers = cardRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((prev) => [...new Set([...prev, i])]);
            obs.disconnect();
          }
        },
        { threshold: 0.15 },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <section className="w-full min-h-screen bg-[#0a0a0a] py-20 px-4 md:px-10 xl:px-20 overflow-hidden">
      <div className="mx-auto mb-16">
        <h2 className="font-serif text-5xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight">
          Meet Our <span className="text-[#FF4757] italic">Chefs</span>
        </h2>
        <p className="mt-4 text-white/40 text-base font-light max-w-md leading-relaxed">
          Passionate culinary artists who turn every plate into a masterpiece.
        </p>
      </div>

      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ChefsData.map((chef, i) => (
          <div
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
            className="group relative"
            style={{
              opacity: visible.includes(i) ? 1 : 0,
              transform: visible.includes(i)
                ? "translateY(0px)"
                : "translateY(40px)",
              transition: `opacity 0.6s ease, transform 0.6s ease`,
              transitionDelay: `${i * 120}ms`,
            }}
          >
            <div className="relative rounded-2xl overflow-hidden cursor-pointer">
              <LazyLoadImage
                src={chef.image}
                alt={chef.name}
                width={"100%"}
                className="w-full h-105 object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                placeholderSrc="https://via.placeholder.com/300x420"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute inset-0 bg-linear-to-t from-[#FF4757]/80 via-[#FF4757]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Bottom text */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-[#FF4757] text-[11px] font-semibold tracking-[0.18em] uppercase mb-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                  {chef.specialty}
                </p>
                <h3 className="text-white font-serif text-xl font-semibold leading-tight">
                  {chef.name}
                </h3>
                <p className="text-white/50 text-sm mt-1 translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 delay-75">
                  {chef.title}
                </p>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurChefs;
