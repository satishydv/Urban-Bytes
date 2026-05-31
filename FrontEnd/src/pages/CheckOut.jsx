/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearWholeCart } from "../store/slices/userCartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BACK_END_API } from "../Constants"


const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const cartItems = useSelector((state) => state.userCart.cartItems);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.name) {
      navigate("/")
    }
  }, [])
  const [paymentMethod, setPaymentMethod] = useState("COD");
  // they both will get if user don't firstly give use or want to update them
  const [deliveryAddress, setDeliveryAddress] = useState(user?.address);
  const [phoneNumber, setphoneNumber] = useState(user?.phone);
  const [orderCity, setorderCity] = useState("");
  const [orderStreet, setorderStreet] = useState("");

  const [transactionId, setTransactionId] = useState("");


  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handlePlaceOrder = async () => {
    if (!deliveryAddress || !phoneNumber || !orderCity || !orderStreet) {
      return toast.error("Please provide Phone and address");
    }

    if (paymentMethod === "easypaisa" && !transactionId) {
      return alert("Enter transaction ID");
    }

    // this data will be send to backend then redirect user to his dashborad to track his Order
    console.log(deliveryAddress, phoneNumber, cartItems, totalPrice);
    if (cartItems.length < 1 || cartItems.length === 0 || totalPrice === 0) {
      toast.error("Please First Select Product To Order");
      return;
    }
    // we will decided here either user will allow to order less than 1000 or not
    const res = await fetch(`${BACK_END_API}/api/orders/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify({
        items: cartItems,
        paymentMethod,
        deliveryAddress,
        contactNumber: phoneNumber,
        orderCity,
        orderStreet,
        totalPrice,
      })
    })
    const result = await res.json();
    if (result.success) {
      toast.success(result.message);
      const oldIds = localStorage.getItem("OrderIds");
      let orders = oldIds ? JSON.parse(oldIds) : {};
      const nextKey = Object.keys(orders).length + 1;
      orders[nextKey] = result.data._id;
      localStorage.setItem("OrderIds", JSON.stringify(orders));
      dispatch(clearWholeCart());
      navigate("/user-profile");
    } else {
      toast.error(result.message)
    }
  };


  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* LEFT SIDE - FORM */}
        <div className="bg-[#141414] p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-4">Customer Details</h2>

          <input
            type="text"
            placeholder="Enter Your Full Adress"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            className="w-full mb-4 p-3 rounded-lg bg-black border border-gray-700 outline-none"
          />
          <input
            type="text"
            placeholder="Enter Your City"
            value={orderCity}
            onChange={(e) => setorderCity(e.target.value)}
            className="w-full mb-4 p-3 rounded-lg bg-black border border-gray-700 outline-none"
          />
          <input
            type="text"
            placeholder="Enter Your Street name"
            value={orderStreet}
            onChange={(e) => setorderStreet(e.target.value)}
            className="w-full mb-4 p-3 rounded-lg bg-black border border-gray-700 outline-none"
          />
          <input
            type="text"
            placeholder="Enter Your Phone"
            value={phoneNumber}
            onChange={(e) => setphoneNumber(e.target.value)}
            className="w-full mb-4 p-3 rounded-lg bg-black border border-gray-700 outline-none"
          />

          <h2 className="text-xl font-bold mb-3">Payment Method</h2>

          <div className="flex flex-col gap-3 mb-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />
              Cash on Delivery
            </label>

            <label className="flex items-center gap-2">
              <input
                title="Will Be Added Soon."
                type="radio"
                value="easypaisa"
                disabled
                checked={paymentMethod === "easypaisa"}
                onChange={() => setPaymentMethod("easypaisa")}
              />
              EasyPaisa (Will Be Added Soon...)
            </label>
          </div>

          {/* Dummy EasyPaisa UI */}
          {paymentMethod === "easypaisa" && (
            <div className="bg-black p-4 rounded-xl border border-[#D13E4B] mb-4">
              <h3 className="text-[#D13E4B] font-bold mb-2">
                EasyPaisa Payment
              </h3>

              <p className="text-gray-400 text-sm mb-2">
                Send payment to: 03XX-XXXXXXX
              </p>

              <input
                type="text"
                placeholder="Enter Transaction ID"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#141414] border border-gray-700 outline-none"
              />
            </div>
          )}

          {user.isEmailVerified ? <button
            onClick={handlePlaceOrder}
            className="w-full bg-[#D13E4B] py-3 rounded-xl font-bold"
          >
            Place Order
          </button> : <> <button

            className="w-full bg-[#D13E4B] py-3 rounded-xl font-bold"
          >
            Please Verify Your Email Before Placing Order
          </button>
            <p className="mt-3 text-sm cursor-pointer text-blue-400" onClick={() => window.open(
              "https://mail.google.com/mail/u/0/#inbox")}>Click Here To Navigate Your Eail</p>
          </>}
        </div>


        <div className="bg-[#141414] p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="flex flex-col gap-4 max-h-75 overflow-y-auto">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex justify-between border-b border-gray-800 pb-2"
              >
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-gray-400 text-sm">
                    {item.size !== "default" ? item.size : ""} x {item.quantity}
                  </p>
                </div>

                <p className="text-[#D13E4B] font-bold">
                  Rs.{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-[#D13E4B]">Rs.{totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
