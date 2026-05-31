/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { UserStatusContext } from "../store/contextStore/userUserStatus";
import { useEffect } from "react";
import { useState } from "react";


const OrderCardForUser = ({ order, user, onCancel }) => {
  const { setOrderStatus, orderStatus } = useContext(UserStatusContext);
  const [SingleOrderStatus, setSingleOrderStatus] = useState(order.orderStatus);

  useEffect(() => {
    setSingleOrderStatus(order.orderStatus);
    if (String(order._id) === orderStatus[0]?.orderId) {
      setSingleOrderStatus(orderStatus[0].status);
    }
  }, [orderStatus]);



  return (
    <div className="bg-[#1a1a1a] p-5 md:p-6 rounded-2xl shadow-xl mb-6 border border-white/10">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-5">
        <h2 className="text-white font-bold text-lg break-all">
          Order ID:{" "}
          <span className="text-white/50 font-mono text-sm">{order._id}</span>
        </h2>
      </div>

      {/* ── Status Stepper ── */}
      <div className="flex my-4 items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm">
        <span className="text-white/50">Current status</span>

        <span className="rounded-md bg-[#FF4757]/10 px-2 py-1 text-xs font-semibold tracking-wide text-[#FF4757] capitalize">
          {SingleOrderStatus}
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* LEFT → Items */}
        <div className="flex-1 space-y-3">
          {order.items.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 bg-white/5 p-3 rounded-xl hover:bg-white/10 transition"
            >
              <LazyLoadImage
                src={item.url}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-white font-semibold">{item.name}</h3>
                <p className="text-gray-400 text-sm">
                  Size: {item.size} | Qty: {item.quantity}
                </p>
              </div>
              <div className="text-[#FF4757] font-bold">Rs.{item.price}</div>
            </div>
          ))}
        </div>

        {/* RIGHT → Info */}
        <div className="w-full md:w-[320px] bg-white/5 p-4 rounded-xl space-y-4 text-sm text-gray-300">
          {/* Assigned Rider */}
          {order.orderAssignTo && (
            <div className="flex items-center gap-3">
              <LazyLoadImage
                src={order.orderAssignTo.profile}
                alt={order.orderAssignTo.name}
                className="w-10 h-10 rounded-full object-cover border border-green-500"
              />
              <div>
                <p className="text-white font-semibold">
                  {order.orderAssignTo.name}
                </p>
                <p className="text-xs text-green-400">Assigned Rider</p>
              </div>
            </div>
          )}

          {/* Payment */}
          <div>
            <p>
              <span className="text-white">Payment:</span>{" "}
              {order.paymentMethod === "COD"
                ? "Cash On Delivery"
                : order.paymentMethod}
            </p>
            <p>
              <span className="text-white">Payment Status:</span>{" "}
              <span
                className={
                  order.paymentStatus === "unpaid"
                    ? "text-red-500"
                    : "text-green-400"
                }
              >
                {order.paymentStatus}
              </span>
            </p>
          </div>

          {/* Contact */}
          <div>
            <p>
              <span className="text-white">Phone:</span> {order.contactNumber}
            </p>
            <p>
              <span className="text-white">Address:</span>{" "}
              {order.deliveryAddress}, {order.street}, {order.city}
            </p>
          </div>

          {/* Total */}
          <div className="pt-3 border-t border-white/10">
            <p className="text-white font-semibold">
              Total:{" "}
              <span className="text-[#FF4757] text-lg">
                Rs.{order.totalPrice}
              </span>
            </p>
          </div>

          {/* Cancel Button */}
          {user.role === "user" && SingleOrderStatus === "placed" && (
            <button
              onClick={() => onCancel(order._id)}
              className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-bold transition"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCardForUser;
