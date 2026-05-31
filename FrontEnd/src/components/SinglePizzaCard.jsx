import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/userCartSlice";
import { toast } from "react-toastify";

const PizzaCard = ({ item, activeMenu = "All" }) => {
  const dispatch = useDispatch();
  // State to handle size selection
  const [selectedSize, setSelectedSize] = useState(item?.prices[0]);
  function checkPercentOff(originalPrice, offerPrice) {
    const discount = originalPrice - offerPrice;
    const percent = (discount / originalPrice) * 100;

    return Math.round(percent); // ya .toFixed(2)
  }

  const handleAddToCartClick = () => {
    if (item.stockStatus !== "In Stock") {
      toast.warn(`Please Wait Product is Currently ${item.stockStatus}`);
    }
    dispatch(
      addToCart({
        name: item.name,
        url: item.url,
        id: item._id,
        size: selectedSize.size,
        price: selectedSize.offerPrice,
      }),
    );
    toast.success(`${item.name} added to cart!`);
  };

  return activeMenu === item.category || activeMenu === "All" ? (
    <div className="flex shrink-0 items-center justify-center  p-6">
      <div className="bg-[#1a1a1a] rounded-[2.5rem] p-6 flex flex-col items-center shadow-2xl transition-transform cursor-pointer">
        {/* Pizza Image */}
        <div className="relative group rounded-full hover:border-2 border-[#FF4757] overflow-hidden -top-14 shadow-sm shadow-red-300 w-52 h-52 mb-2 drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]">
          <LazyLoadImage
            src={item.url}
            alt={item.name}
            className="w-full h-full group-hover:scale-95  duration-300 object-cover  border-4 border-transparent hover:border-yellow-500/20 transition-all"
          />
        </div>

        <h2 className="text-white ItalicFont text-3xl font-bold text-center mb-2">
          {item.name}
        </h2>

        <p className="text-gray-400 text-xs text-center mb-6 px-2 leading-relaxed">
          {item.desc}
        </p>

        <div
          className={`flex ${item.prices[0].size == "default" ? "hidden" : "bg-black/40 "} p-1 rounded-xl mb-6 w-full justify-between`}
        >
          {item.prices.map((item) =>
            item.size !== "default" ? (
              <button
                key={item.size}
                onClick={() => setSelectedSize(item)}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all ${
                  selectedSize.size === item.size
                    ? "bg-[#FF4757] text-black"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {item.size === "Xtra Large" ? "XL" : item?.size[0]}
              </button>
            ) : (
              ""
            ),
          )}
        </div>

        <div className="flex  items-center gap-3 mb-6">
          {selectedSize.offerPrice == selectedSize.originalPrice ? (
            <span className="text-[#FF4757] text-3xl font-black">
              Rs.{selectedSize.offerPrice}
            </span>
          ) : (
            <>
              {" "}
              <span className="text-[#FF4757]  text-3xl font-black">
                Rs.{selectedSize.offerPrice}
              </span>
              <span className="text-gray-600  text-lg line-through decoration-red-500/50">
                Rs.{selectedSize.originalPrice}
              </span>
              <span className="text-[#FF4757]  text-sm font-black">
                {checkPercentOff(
                  selectedSize.originalPrice,
                  selectedSize.offerPrice,
                )}{" "}
                % off
              </span>
            </>
          )}
        </div>

        {item.stockStatus == "In Stock" ? (
          <button
            onClick={handleAddToCartClick}
            className="w-full bg-[#FF4757] hover:bg-[#FF4757]/80 text-white font-black py-4 rounded-full transition-all transform active:scale-95 "
          >
            Order Now
          </button>
        ) : (
          <button
            className={`w-full ${item.stockStatus == "Soon" ? "bg-yellow-500 hover:bg-yellow-500/80" : "bg-red-700 hover:bg-red-800"} text-white font-black py-4 rounded-full transition-all transform active:scale-95 `}
          >
            {item.stockStatus}
          </button>
        )}
      </div>
    </div>
  ) : (
    ""
  );
};

export default PizzaCard;
