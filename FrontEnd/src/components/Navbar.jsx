import { GiFullPizza } from "react-icons/gi";
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
import { HiOutlineUserCircle } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { FaLuggageCart } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import CartContainer from "./CartContainer";
import UserOptions from "./UserOptions";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";

const NavBar = ({ isShow = true }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [isOpenUserOption, setIsOpenUserOption] = useState(false);
  const user = useSelector((state) => state.user);
  const itemsInCart = useSelector((state) => state.userCart);
  const [CartCount, setCartCount] = useState(itemsInCart?.cartItems.length);

  useEffect(() => {
    setCartCount(itemsInCart?.cartItems?.length);
  }, [itemsInCart, itemsInCart?.cartItems]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user.isEmailVerified == false && user.isLogged) {
      toast.warn("Please Verify Your Email First");
    }
  }, [user.isLogged]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const LP = location.pathname;
  return (
    <div
      className={`${isShow ? "" : "hidden"} justify-between flex bg-clip-padding backdrop-filter  backdrop-blur-sm bg-opacity-10 items-center sticky top-0 z-100 px-10`}
    >
      <div className="LogoContainer gap-2 my-4 flex justify-center items-center w-[20%] md:w-[10%]">
        {/* <LazyLoadImage
          src="https://i.pinimg.com/originals/eb/96/af/eb96af1f97f1447195b22359fac8a152.jpg"
          alt="Company Logo Here"
          className="w-30 bg-cover"
        /> */}
        <GiFullPizza style={{fontSize : "40px"}} color="ff4757" />{" "}
        <h1 className="text-lg text-nowrap">Urban Bites</h1>
      </div>
      <div className="NavLinksContainer md:flex hidden ThreeDivs gap-3 justify-evenly items-center w-[80%] md:w-[90%]">
        <div className="flex gap-5 text-lg font-medium">
          <Link className={LP == "/" ? "BrandColor relative" : ""} to="/">
            Home{" "}
            <span
              className={`absolute -bottom-1 ${LP == "/" ? "w-full" : ""}  left-0 h-0.5 bg-red-500`}
            ></span>
          </Link>

          <Link
            className={LP == "/menu" ? "BrandColor relative" : ""}
            to="/menu"
          >
            Menu{" "}
            <span
              className={`absolute -bottom-1 ${LP == "/menu" ? "w-full" : ""}  left-0 h-0.5 bg-red-500`}
            ></span>
          </Link>
          <Link
            className={LP == "/about" ? "BrandColor relative" : ""}
            to="/about"
          >
            About{" "}
            <span
              className={`absolute -bottom-1 ${LP == "/about" ? "w-full" : ""}  left-0 h-0.5 bg-red-500`}
            ></span>
          </Link>
          <Link
            className={LP == "/contact" ? "BrandColor relative" : ""}
            to="/contact"
          >
            Contact
            <span
              className={`absolute -bottom-1 ${LP == "/contact" ? "w-full" : ""}  left-0 h-0.5 bg-red-500`}
            ></span>
          </Link>
        </div>
        <div className="HereCartIconAndSearchbar flexCenter   gap-5 ">
          <div onClick={() => setIsOpenCart(!isOpenCart)} className="relative">
            <AiOutlineShoppingCart size={34} />
            {CartCount !== 0 && (
              <span className="absolute -top-2 flexCenter -right-2 bg-red-400 rounded-full h-6 w-6">
                {CartCount}
              </span>
            )}
          </div>
        </div>
        {user.isLogged ? (
          <div
            className="border-2 border-white rounded-full"
            onClick={() => setIsOpenUserOption(!isOpenUserOption)}
          >
            <img
              className="w-8 h-8 m-1 rounded-full"
              src={
                user?.profile
                  ? user.profile
                  : "https://i.pinimg.com/originals/1f/a1/66/1fa166b8be7105927a3af53cc8891458.png"
              }
              alt="user profile"
            />
          </div>
        ) : (
          <div className="HereLoginAndSignup flex  gap-2 justify-center items-center">
            <button
              onClick={() => navigate("/auth", { state: { form: "signup" } })}
              className="px-6 py-2 border-2 border-[#FF4757]  rounded-full bg-[#FF4757] hover:text-[#FF4757] hover:bg-transparent  transition-all duration-300"
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate("/auth", { state: { form: "login" } })}
              className="px-6 py-2 border-2 border-[#FF4757] text-[#FF4757] rounded-full hover:bg-[#FF4757] hover:text-white transition-colors duration-300"
            >
              Log In
            </button>
          </div>
        )}
      </div>
      <div
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="MobileMenuIcon md:hidden flex items-center"
      >
        {isMobileMenuOpen ? (
          <RxCross1 size={32} />
        ) : (
          <RxHamburgerMenu size={32} />
        )}
      </div>

      {/* mobile menu */}
      {isMobileMenuOpen && (
        <div className="MobileMenu md:hidden w-full bg-black absolute top-20 left-0  bg-clip-padding backdrop-filter z-50  backdrop-blur-sm bg-opacity-10 text-white flex flex-col items-center gap-4 py-4">
          <Link to="/" className="text-lg font-medium">
            Home
          </Link>
          <Link to="/menu" className="text-lg font-medium">
            Menu
          </Link>
          <Link to="/about" className="text-lg font-medium">
            About
          </Link>
          <Link to="/contact" className="text-lg font-medium">
            Contact
          </Link>
          <div className="flex items-center justify-center flex-row gap-5 mt-4">
            <div
              onClick={() => setIsOpenCart(!isOpenCart)}
              className="relative"
            >
              <AiOutlineShoppingCart size={34} />
              {CartCount > 0 && (
                <span className="absolute -top-2 flexCenter -right-2 bg-red-400 rounded-full h-6 w-6">
                  {CartCount}
                </span>
              )}
            </div>
          </div>
          {user.isLogged ? (
            <div onClick={() => setIsOpenUserOption(!isOpenUserOption)}>
              <img
                className="w-8 h-8 m-1 rounded-full"
                src={
                  user?.profile
                    ? user.profile
                    : "https://i.pinimg.com/originals/1f/a1/66/1fa166b8be7105927a3af53cc8891458.png"
                }
                alt="user profile"
              />
            </div>
          ) : (
            <div className="HereLoginAndSignup flex  gap-2 justify-center items-center">
              <button
                onClick={() => navigate("/auth", { state: { form: "signup" } })}
                className="px-6 py-2 border-2 border-[#FF4757]  rounded-full bg-[#FF4757] hover:text-[#FF4757] hover:bg-transparent  transition-all duration-300"
              >
                Sign Up
              </button>
              <button
                onClick={() => navigate("/auth", { state: { form: "login" } })}
                className="px-6 py-2 border-2 border-[#FF4757] text-[#FF4757] rounded-full hover:bg-[#FF4757] hover:text-white transition-colors duration-300"
              >
                Log In
              </button>
            </div>
          )}
        </div>
      )}
      {isOpenCart && (
        <CartContainer isOpenCart={isOpenCart} setIsOpenCart={setIsOpenCart} />
      )}
      {isOpenUserOption && (
        <UserOptions
          setIsOpenUserOption={setIsOpenUserOption}
          isOpenUserOption={isOpenUserOption}
          isOpenCart={isOpenCart}
          setIsOpenCart={setIsOpenCart}
        />
      )}
    </div>
  );
};

export default NavBar;
