/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { AiOutlineSearch } from "react-icons/ai";
import React, { useEffect, useState } from "react";
// import PizzaData from "../dummy/PizzaData.json";
import SinglePizzaCard from "../components/SinglePizzaCard";
import { useSelector } from "react-redux";
import ErrorInFetchingProdcuts from "../components/ErrorInFetchingProdcuts";
import ProductLoading from "../components/ProductLoading";
import SpecialDeal from "../Sections/SpecialDeal";

const Menu = () => {
  const products = useSelector((state) => state.products.items);
  const productLoading = useSelector((state) => state.products.loading);
  const productError = useSelector((state) => state.products.isError);

  const [filteredData, setFilteredData] = useState([]);
  const [SearchVal, setSearchVal] = useState("");

  useEffect(() => {
    if (!SearchVal) {
      setFilteredData(products);
    }
    const searchResults = products.filter((pizza) =>
      pizza.name.toLowerCase().includes(SearchVal.toLowerCase()),
    );
    if (searchResults.length < 1) console.log(searchResults);
    setFilteredData(searchResults);
  }, [SearchVal, products]);

  return (
    <>
      <div className="w-full py-12 px-5 md:px-10 mt-5 flex flex-col items-start">
        <div className="md:flex-row flex w-full flex-col justify-evenly items-center gap-3">
          <h1 className="text-3xl  md:w-1/2 w-full">What We are Providing?</h1>
          <div className="flex  md:w-fit px-5 w-full justify-center items-center gap-2 ">
            <AiOutlineSearch size={29} />
            <input
              value={SearchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              class="rounded-full text-xl border-2 border-[#FF6467] px-4 py-2 placeholder-[#FF6467] focus:text-[#FF6467] focus:border-[#f34c4f] focus:outline-none focus:ring-2 focus:ring-[#FF6467]"
              placeholder="Seach anything Here..."
            />
          </div>
        </div>
        {productLoading ? (
          <ProductLoading />
        ) : (
          <div className="ShowActiveMenuItems  grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-12 mt-15 w-full">
            {filteredData.map((item, index) => (
              <SinglePizzaCard key={index} item={item} />
            ))}
          </div>
        )}
        {productError && <ErrorInFetchingProdcuts />}
        {filteredData.length === 0 && !products.isError && !products.loading ? (
          <div className="w-full flex-col h-full flexCenter">
            <img
              src="https://i.pinimg.com/originals/17/08/90/170890e64f751e6c7926f851719d4523.gif"
              className="w-[40vh] h-[40vh]"
              alt="Page not found in Punjab Pizza Club"
            />
            <h1 className="text-4xl">Product Not Found</h1>
            <p className="text-lg flexCenter mt-4 gap-4">
              Search Something Else Like{" "}
              <span
                onClick={() => setSearchVal("pizza")}
                className="text-[#FF6467] cursor-pointer"
              >
                Pizza
              </span>
              <span
                onClick={() => setSearchVal("burger")}
                className="text-[#FF6467] cursor-pointer"
              >
                Burger
              </span>
              <span
                onClick={() => setSearchVal("roll")}
                className="text-[#FF6467] cursor-pointer"
              >
                Paratha Roll
              </span>
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
      <SpecialDeal />
    </>
  );
};

export default Menu;
