/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BACK_END_API } from "../Constants";

import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  updateAssignToRider,
  updateOrderStatus,
  deleteOrder,
} from "../store/slices/orderSlice";

const AllOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const user = useSelector((state) => state.user);
  const [isAddingOrderModelOpen, setIsAddingOrderModelOpen] = useState(false);

  const [localOrders, setLocalOrders] = useState([]);
  const [riders, setRiders] = useState([]);

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    fetchRiders();
  }, []);

  const fetchRiders = async () => {
    try {
      const res = await fetch(`${BACK_END_API}/api/customers/riders`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setRiders(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const orderStatusOptions = [
    "placed",
    "confirmed",
    "preparing",
    "OnTheWay",
    "delivered",
    "cancelled",
  ];

  const orderFilters = [
    "placed",
    "confirmed",
    "preparing",
    "OnTheWay",
    "delivered",
    "cancelled",
    "All",
  ];

  const paymentStatusOptions = ["paid", "unpaid"];
  const paymentFilters = ["paid", "unpaid", "All"];

  const [orderStatusFilter, setOrderStatusFilter] = useState("All");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("All");

  const handleOrderStatus = async (id, value) => {
    try {
      const res = await fetch(
        `${BACK_END_API}/api/orders/update-order-status/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ orderStatus: value }),
        },
      );
      const result = await res.json();
      if (!result.success) {
        toast.error(result.message);
      }
      dispatch(
        updateOrderStatus({
          id: result.data._id,
          paymentStatus: result.data.paymentStatus,
          orderStatus: result.data.orderStatus,
        }),
      );
      toast.success(result.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handlePaymentStatus = async (id, value) => {
    try {
      const res = await fetch(
        `${BACK_END_API}/api/orders/update-payment-status/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ paymentStatus: value }),
        },
      );

      const result = await res.json();
      if (!result.success) {
        toast.error(result.message);
      }
      dispatch(
        updateOrderStatus({
          id: result.data._id,
          paymentStatus: result.data.paymentStatus,
          orderStatus: result.data.orderStatus,
        }),
      );
      toast.success(result.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleAssignRider = async (id, riderId) => {
    if (riderId == "") {
      return toast.error("Please Select Rider");
    }
    try {
      const res = await fetch(`${BACK_END_API}/api/orders/assgin-rider/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ riderId }),
      });
      const result = await res.json();
      if (result.success) {
        dispatch(
          updateAssignToRider({
            id: result.data._id,
            riderId: result?.data.orderAssignTo,
          }),
        );
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleOrderDeletions = async (id) => {
    console.log(id);
    try {
      const res = await fetch(`${BACK_END_API}/api/orders/delete-order/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const result = await res.json();
      if (result.success) {
        console.log(result);
        dispatch(deleteOrder({ id: result?.data._id }));
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-6 text-white">
      {isAddingOrderModelOpen && <div>Home</div>}
      <div className="flex gap-5 w-full mb-5 mt-2">
        <div className="ProductFIlter flex gap-2">
          <p>Order Filters By</p>
          <select
            value={orderStatusFilter}
            onChange={(e) => setOrderStatusFilter(e.target.value)}
            className="bg-black border border-white/20 text-white text-sm p-1 rounded focus:outline-none"
          >
            {orderFilters.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="Deals flex gap-2">
          <p>Payment Filters By</p>
          <select
            value={paymentStatusFilter}
            onChange={(e) => setPaymentStatusFilter(e.target.value)}
            className="bg-black border border-white/20 text-white text-sm p-1 rounded focus:outline-none"
          >
            {paymentFilters.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="min-w-300 mx-auto  border border-white/10 rounded-lg">
          <thead className="bg-white/5">
            <tr>
              <th className="p-3">Order By</th>
              <th className="p-3">Items</th>
              <th className="p-3">Total</th>
              <th className="p-3">Order Status</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Assign Rider</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((order) =>
              order?.orderStatus === orderStatusFilter ||
              order?.paymentStatus === paymentStatusFilter ||
              (orderStatusFilter === "All" && paymentStatusFilter === "All") ? (
                <tr
                  key={order?._id}
                  className="border-t border-white/10  align-top"
                >
                  <td className="p-3 text-xs w-40 ">
                    <p className="text-gray-400">{order?.orderBy?.name}</p>
                    <p>{order?.orderBy?.email || order?.orderBy}</p>
                    <p className="text-gray-400">{order?.contactNumber}</p>
                    <p className="text-gray-400">{order?.deliveryAddress}</p>
                    <p className="text-gray-400">
                      City :{" "}
                      <span className="text-md font-semibold text-green-400">
                        {order?.city}
                      </span>
                    </p>
                    <p className="text-gray-400">{`${order?.createdAt.split("T")[0]} at ${order?.createdAt.split("T")[1].slice(0, 5)}`}</p>
                  </td>

                  <td className="p-3  w-100">
                    <div className=" gap-2 grid-cols-1 md:grid-cols-2 w-full grid">
                      {order?.items.map((item) => (
                        <div
                          key={item._id}
                          className="flex bg-black/5 gap-2 items-center b p-2 rounded"
                        >
                          <LazyLoadImage
                            src={item.url}
                            alt={item.name}
                            className="w-10 h-10 rounded object-cover"
                          />
                          <div className="text-md">
                            <p>{item.name}</p>
                            <p className="text-gray-400">
                              {item.size} | x{item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="p-3 text-[#FF4757] font-bold">
                    Rs.{order?.totalPrice}
                  </td>

                  {/* Order Status */}
                  <td className="p-3">
                    <select
                      value={order?.orderStatus}
                      onChange={(e) =>
                        handleOrderStatus(order?._id, e.target.value)
                      }
                      className="bg-black border border-white/20 p-1 rounded"
                    >
                      {orderStatusOptions.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </td>

                  {/* Payment */}
                  <td className="p-3">
                    <select
                      value={order?.paymentStatus}
                      onChange={(e) =>
                        handlePaymentStatus(order?._id, e.target.value)
                      }
                      className="bg-black border border-white/20 p-1 rounded"
                    >
                      {paymentStatusOptions.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </td>

                  {/* Assign Rider */}
                  <td className="p-3">
                    <select
                      value={order?.orderAssignTo?._id || ""}
                      onChange={(e) =>
                        handleAssignRider(order?._id, e.target.value)
                      }
                      className="bg-black w-40 border border-white/20 p-1 rounded"
                    >
                      <option value="">Select Rider</option>
                      {riders.map((r) => (
                        <option key={r._id} value={r._id}>
                          {r.name}
                        </option>
                      ))}
                    </select>

                    {/* Currently assigned rider info */}
                    {order?.orderAssignTo?.name && (
                      <div className="flex items-center gap-2 mt-2">
                        {order.orderAssignTo?.url ||
                        order.orderAssignTo?.image ? (
                          <LazyLoadImage
                            src={
                              order.orderAssignTo?.url ||
                              order.orderAssignTo?.image
                            }
                            alt={order.orderAssignTo.name}
                            className="w-8 h-8 rounded-full object-cover border border-white/20"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white border border-white/20">
                            {order.orderAssignTo.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="text-xs">
                          <p className="text-green-400 font-semibold">
                            {order.orderAssignTo.name}
                          </p>
                          {order.orderAssignTo?.phone && (
                            <p className="text-gray-400">
                              {order.orderAssignTo.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleOrderDeletions(order?._id)}
                      className="bg-[#FF4757] text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ) : null,
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrder;
