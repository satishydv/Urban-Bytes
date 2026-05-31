import { FiDelete } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";

import {
  removeFromCart,
  updateCountItem,
  clearWholeCart,
} from "../store/slices/userCartSlice";
import { useNavigate } from "react-router-dom";

const CartContainer = ({ isOpenCart, setIsOpenCart }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.userCart.cartItems);
  const user = useSelector((state) => state.user);

  const handleIncrease = (item) => {
    dispatch(
      updateCountItem({
        id: item.id,
        size: item.size,
        quantity: item.quantity + 1,
      }),
    );
  };

  const handleDecrease = (item) => {
    dispatch(
      updateCountItem({
        id: item.id,
        size: item.size,
        quantity: item.quantity - 1,
      }),
    );
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart({ id: item.id, size: item.size }));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div
      className={`md:w-[55%] w-full bg-[#0a0a0a] h-screen top-0 right-0  fixed z-50 p-6 transition-transform ${
        isOpenCart ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-2xl font-bold">Your Cart</h2>
        <button
          onClick={() => setIsOpenCart(!isOpenCart)}
          className="text-white px-4 py-2 rounded-lg"
        >
          <AiOutlineClose size={30} />
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex flex-col gap-4 pb-20 pt-1 overflow-y-scroll h-[65%] pr-2">
        {cartItems.length === 0 ? (
          <div className="w-full flex-col h-full flexCenter">
            <LazyLoadImage
              src="https://i.pinimg.com/originals/17/08/90/170890e64f751e6c7926f851719d4523.gif"
              className="w-[40vh] h-[40vh]"
              alt="Page not found in Punjab Pizza Club"
            />
            <h1 className="text-4xl">No Product In Cart</h1>
            <p>Let's Buy One</p>
          </div>
        ) : (
          cartItems.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex items-center sm:flex-row flex-col gap-3 justify-between bg-[#141414] p-4 rounded-xl"
            >
              {/* Info */}
              <div className="flex items-center gap-4">
                <LazyLoadImage
                  src={item.url}
                  alt={item.name}
                  className="w-22 h-22 rounded-full object-contain"
                />
                <div>
                  <h3 className="text-white font-bold text-md">{item.name}</h3>
                  <p className="text-gray-400 text-xs">
                    {item.size !== "default" ? item.size : ""}
                  </p>
                  <p className="text-[#D13E4B] font-bold text-md">
                    Rs.{item.price}
                  </p>
                </div>
              </div>

    
              <div className="flexCenter gap-5">
                <div className="flex justify-center items-center gap-2  px-2 py-1 rounded-lg">
                  <button
                    onClick={() => handleDecrease(item)}
                    className="text-white px-2"
                  >
                    <AiOutlineMinusCircle size={27} />
                  </button>
                  <span className="text-white text-md font-semibold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => handleIncrease(item)}
                    className="text-white px-2"
                  >
                    <AiFillPlusCircle size={27} />
                  </button>
                </div>

                <button
                  onClick={() => handleRemove(item)}
                  className="text-md text-red-400"
                >
                  <FiDelete size={28} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {user.isLogged ? (
        <div className="absolute bottom-0 left-0 w-full p-6 bg-[#0B0B0B] border-t border-gray-800">
          <div className="flex justify-between mt-3 items-center mb-4">
            <span className="text-gray-400">Total</span>
            <span className="text-white text-3xl font-bold">
              Rs.{totalPrice}
            </span>
          </div>
          <button
            onClick={() => {
              navigate("/checkout");
              setIsOpenCart(!isOpenCart);
            }}
            className="w-full bg-[#D13E4B] text-white font-bold py-3 rounded-xl mb-3"
          >
            Checkout
          </button>

          {cartItems.length > 0 && (
            <button
              onClick={() => dispatch(clearWholeCart())}
              className="w-full border border-[#D13E4B] text-[#D13E4B] py-2 rounded-xl"
            >
              Clear Cart
            </button>
          )}
        </div>
      ) : (
        cartItems.length > 0 && (
          <>
            {" "}
            <div className="flex justify-between mt-3 items-center mb-4">
              <span className="text-gray-400">Total</span>
              <span className="text-white text-3xl font-bold">
                Rs.{totalPrice}
              </span>
            </div>{" "}
            <button
              onClick={() => navigate("/auth")}
              className="w-full bg-[#D13E4B] text-white font-bold py-3 rounded-xl mb-3"
            >
              Please Login / Sign Up Frist For Order
            </button>
          </>
        )
      )}
    </div>
  );
};

export default CartContainer;
