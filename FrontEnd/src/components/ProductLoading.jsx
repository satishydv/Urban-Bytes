import { GiFullPizza } from "react-icons/gi";
import React from "react";

const ProductLoading = () => {
  return (
    <div className="w-full h-full py-20 flexCenter">
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div className="w-28 h-28 border-8 text-[#E74D3C] text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-[#E74D3C] rounded-full">
          <GiFullPizza size={38} />
        </div>
      </div>
    </div>
  );
};

export default ProductLoading;
