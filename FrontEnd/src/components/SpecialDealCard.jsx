/* eslint-disable react-hooks/set-state-in-effect */
import { BsFillCalendarDayFill } from "react-icons/bs";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/userCartSlice";
import { toast } from "react-toastify";
import { formatDate } from "../utils/dateFormat";

const SpecialDealCard = ({ deal }) => {
  const dispatch = useDispatch();
  const isAvailable = deal.isActive;

  const handleDealClick = () => {
    if (!isAvailable) {
      toast.error("This deal is no longer available");
      return;
    }
    dispatch(
      addToCart({
        id: deal._id,
        name: deal.title,
        url: deal.image,
        price: deal.price,
        size: "Special Deal",
      }),
    );
    toast.success(`${deal.title} added — Almost done!`);
  };

  return (
    <div className="flex shrink-0 items-center justify-center p-4 md:p-6">
      <div
        className={`relative bg-linear-to-b from-[#1e1e1e] to-[#141414] rounded-[2.5rem] p-6 flex flex-col items-center shadow-2xl transition-transform duration-300 cursor-pointer
          ${isAvailable ? "hover:-translate-y-2" : "opacity-70"}`}
      >
        <div className="relative rounded-2xl w-full h-64 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] mb-5">
          <LazyLoadImage
            src={deal.image}
            alt={deal.title}
            className={`w-full h-full object-cover transition-transform duration-500 ${isAvailable ? "group-hover:scale-110" : "grayscale"}`}
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

          {isAvailable && (
            <span className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-[#FF4757] text-[10px] font-semibold px-3 py-1 rounded-full tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4757] animate-pulse" />
              Live Deal
            </span>
          )}

          <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-4 py-1.5">
            <span className="text-[#FF4757] text-lg font-black">
              Rs.{deal.price}
            </span>
          </div>
        </div>

        <h2 className="text-white font-serif text-2xl font-bold text-center leading-tight tracking-tight">
          {deal.title}
        </h2>

        <p className="text-white/40 text-xs text-center mt-2 mb-4 leading-relaxed px-2">
          {deal.description}
        </p>

        <div className="w-full mb-4">
          <div className="flex items-center justify-between bg-white/4 border border-white/[0.07] rounded-2xl px-4 py-3 mb-3">
            <div className="flex items-center gap-2">
              <BsFillCalendarDayFill size={20} color="gray" />
              <span className="text-white/40 text-[11px] tracking-wide uppercase font-medium">
                Created At
              </span>
            </div>
            <span
              className={`text-sm font-semibold ${isAvailable ? "text-red-400" : "text-white"}`}
            >
              {formatDate(deal.createdAt)}
            </span>
          </div>
        </div>
        {/* 2026-05-17T01:15:56.256Z */}
        <button
          onClick={handleDealClick}
          disabled={!isAvailable}
          className={`w-full py-4 rounded-full font-black text-sm tracking-wide transition-all duration-200 active:scale-95
            ${
              isAvailable
                ? "bg-[#FF4757] hover:bg-[#ff5e6a] text-white shadow-[0_8px_24px_rgba(255,71,87,0.35)] hover:shadow-[0_8px_32px_rgba(255,71,87,0.5)]"
                : "bg-white/5 text-white/30 cursor-not-allowed border border-white/10"
            }`}
        >
          {isAvailable
            ? "Grab This Deal →"
            : isAvailable
              ? "Deal Expired"
              : "Unavailable"}
        </button>
      </div>
    </div>
  );
};

export default SpecialDealCard;
