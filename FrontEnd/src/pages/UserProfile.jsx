/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { BACK_END_API } from "../Constants";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchUserOrdersAsRider } from "../utils/fetchRiderOrders";
import OrderCardForUser from "../components/OrderCartForUser";
import { UserStatusContext } from "../store/contextStore/userUserStatus";

const orderStatusFilters = [
  "placed",
  "confirmed",
  "preparing",
  "OnTheWay",
  "delivered",
  "cancelled",
  "All",
];

const UserProfile = () => {
  const [userOrders, setUserOrders] = useState([]);
  const { riderOrders, setRiderOrders } = useContext(UserStatusContext);
  const user = useSelector((state) => state.user);
  const [orderStatusFilter, setOrderStatusFilter] = useState("All");

  const navigate = useNavigate();

  const fetchUsersOrders = async () => {
    try {
      const res = await fetch(`${BACK_END_API}/api/orders/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const result = await res.json();
      console.log(result);
      if (result.success) {
        toast.success(result.message);
        setUserOrders(result.data);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user.role === "user") {
      fetchUsersOrders();
    } else if (user.role === "rider") {
      fetchUserOrdersAsRider(user).then((orders) => {
        setRiderOrders(orders);
      });
    } else {
      navigate("/");
    }
  }, []);

  const handleUserCancelClick = async (orderId) => {
    if (confirm("Are Your Sure to Cancel Order?")) {
      const res = await fetch(`${BACK_END_API}/api/orders/cancel/${orderId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const result = await res.json();
      if (result.success) {
        setUserOrders(() =>
          userOrders?.filter((order) => order._id !== orderId),
        );
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };

  const filteredUserOrders =
    orderStatusFilter === "All"
      ? userOrders
      : userOrders.filter((order) => order.orderStatus === orderStatusFilter);

  const filteredRiderOrders =
    orderStatusFilter === "All"
      ? riderOrders
      : riderOrders.filter((order) => order.orderStatus === orderStatusFilter);

  return (
    <div className="w-full min-h-screen py-10 px-5">
      <p className="text-3xl mb-4 font-semibold">
        {user.role == "rider" ? "Riders Orders" : "User Orders"}
      </p>
      <div className="Deals flex justify-between">
        <span className="flexCenter gap-2">
          <p>Order Filters By</p>
          <select
            value={orderStatusFilter}
            onChange={(e) => setOrderStatusFilter(e.target.value)}
            className="bg-black border border-white/20 text-white text-sm p-1 rounded focus:outline-none"
          >
            {orderStatusFilters.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </span>
        <button
          onClick={() => {
            if (user.role == "user") {
              fetchUsersOrders();
            } else if (user.role == "rider") {
              fetchUserOrdersAsRider(user).then((orders) => {
                setRiderOrders(orders);
                toast.success("Orders Refreshed");
              });
            }
          }}
          className="bg-[#FF4757] hover:bg-[#ff4756d5] text-white font-bold py-2 px-4 rounded"
        >
          Refresh Orders
        </button>
      </div>
      <div className="my-5">
        {filteredUserOrders.length > 0 && user.role == "user" ? (
          filteredUserOrders?.map((order) => {
            return (
              <OrderCardForUser
                user={user}
                order={order}
                key={order._id}
                onCancel={handleUserCancelClick}
              />
            );
          })
        ) : user.role == "rider" ? (
          filteredRiderOrders?.map((order) => {
            return (
              <OrderCardForUser user={user} order={order} key={order._id} />
            );
          })
        ) : (
          <div className="w-full flex-col h-full flexCenter">
            <img
              src="https://i.pinimg.com/originals/17/08/90/170890e64f751e6c7926f851719d4523.gif"
              className="w-[40vh] h-[40vh]"
              alt="Page not found in Punjab Pizza Club"
            />
            <h1 className="text-4xl mt-3">
              {user.role == "rider"
                ? "You have No Order Assigned Yet"
                : "Order Not Found 404"}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
