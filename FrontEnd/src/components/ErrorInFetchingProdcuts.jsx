import { IoMdRefresh } from "react-icons/io";
import { BiErrorAlt } from "react-icons/bi";
import React, { useState } from "react";

const ErrorInFetchingProdcuts = () => {
  const [refreshLoading, setRefreshLoading] = useState(false);
  const handlePageRefreshClick = () => {
    setRefreshLoading(true);
    window.location.reload();
  };
  return (
    <div className="w-full h-full flexCenter">
      <div class="flex flex-col gap-2 w-80 text-[10px] sm:text-xs z-50">
        <div class="error-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#232531] px-2.5">
          <div class="flex gap-2">
            <div class="text-[#d65563] backdrop-blur-xl rounded-lg">
              <BiErrorAlt size={35} />
            </div>
            <div>
              <p class="text-white text-2xl">Please try again later</p>
              <p class="text-gray-500">Something Went Wrong On Server</p>
            </div>
          </div>
          <button
            onClick={() => handlePageRefreshClick()}
            class="text-gray-400 hover:bg-white/10 p-1 rounded-md transition-colors ease-linear"
          >
            <IoMdRefresh
              className={`${refreshLoading ? "animate-spin" : ""}`}
              size={30}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorInFetchingProdcuts;
