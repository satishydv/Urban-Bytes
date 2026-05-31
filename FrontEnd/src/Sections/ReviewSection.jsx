import React, { useState } from "react";
import ReviewsData from "../dummy/ReviewsData.json";
import { BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ReviewSection = () => {
  const [activeReview, setActiveReview] = useState(0);
  const [visible, setVisible] = useState(true);

  const navigate = (dir) => {
    if (!visible) return;
    setVisible(false);
    setTimeout(() => {
      setActiveReview((prev) =>
        dir === "next"
          ? prev === ReviewsData.length - 1
            ? 0
            : prev + 1
          : prev === 0
            ? ReviewsData.length - 1
            : prev - 1,
      );
      setVisible(true);
    }, 280);
  };

  const review = ReviewsData[activeReview];

  return (
    <section className="w-full py-20 px-4 md:px-10 xl:px-20">
      <div className="max-w-6xl mx-auto flex flex-col xl:flex-row items-center gap-14">
        <div className="w-full  justify-center items-center flex flex-col">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-[1.15] tracking-tight mb-10">
            What our customers say about{" "}
            <span className="text-[#FF4757] italic">Urban Bites</span>
          </h2>

          <div className="relative   border border-[#FF4757]/10 rounded-2xl p-7 md:p-9 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#FF4757]/40 to-transparent" />

            <div className="absolute -bottom-14 -right-14 w-52 h-52 rounded-full bg-[#FF4757]/5 blur-2xl pointer-events-none" />

            <span className="absolute top-3 right-6 font-serif text-[110px] leading-none text-[#FF4757]/10 select-none pointer-events-none">
              “
            </span>

            <div
              className={`flex flex-col md:flex-row gap-7 items-start transition-all duration-300 ease-in-out ${
                visible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              }`}
            >
              <div className="relative shrink-0 w-22 h-22">
                <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#FF4757,transparent_60%,#FF4757)] animate-spin [animation-duration:5s]" />
                <div className="absolute inset-0.5 rounded-full bg-[#131313]" />
                <div className="absolute inset-1 rounded-full overflow-hidden">
                  <LazyLoadImage
                    src={review.profile}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col flex-1 min-w-0">
                <h3 className="font-serif text-2xl font-semibold text-white leading-tight">
                  {review.name}
                </h3>

                <div className="flex items-center gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      viewBox="0 0 24 24"
                      className={`w-3.5 h-3.5 shrink-0 ${
                        star <= review.stars
                          ? "fill-[#FF4757]"
                          : "fill-white/15"
                      }`}
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-white/35 text-xs font-medium tracking-wide">
                    {review.stars}.0 / 5.0
                  </span>
                </div>

                <p className="mt-4 text-[15px] font-light leading-[1.8] text-white/60 max-w-lg">
                  {review.reviewText}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-8 pt-5 border-t border-white/[0.07]">
              <div className="flex items-center gap-1.5">
                {ReviewsData.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(i > activeReview ? "next" : "prev")}
                    aria-label={`Go to review ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 border-none cursor-pointer ${
                      i === activeReview
                        ? "w-5 bg-[#FF4757] shadow-[0_0_8px_rgba(255,71,87,0.6)]"
                        : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[13px] text-white/30 font-medium tracking-widest">
                  {String(activeReview + 1).padStart(2, "0")} /{" "}
                  {String(ReviewsData.length).padStart(2, "0")}
                </span>

                <button
                  onClick={() => navigate("prev")}
                  aria-label="Previous review"
                  className="flex items-center justify-center w-11 h-11 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  <BiLeftArrowAlt size={20} />
                </button>

                <button
                  onClick={() => navigate("next")}
                  aria-label="Next review"
                  className="flex items-center justify-center w-11 h-11 rounded-full bg-[#FF4757] text-white hover:bg-[#ff5e6a] hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,71,87,0.4)] hover:shadow-[0_0_28px_rgba(255,71,87,0.6)] transition-all duration-200 cursor-pointer"
                >
                  <BiRightArrowAlt size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
