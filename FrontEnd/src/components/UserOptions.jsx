import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { BACK_END_API } from "../Constants";
import { logout } from "../store/slices/userSlice";

const UserOptions = ({
  isOpenCart,
  setIsOpenCart,
  setIsOpenUserOption,
  isOpenUserOption,
}) => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const token = localStorage.getItem("PPCUserToken");
  const handleUserLogout = async () => {
    if (confirm("Are you sure to log Out...")) {
      if (token) {
        setLoading(true);
        try {
          const res = await fetch(`${BACK_END_API}/api/auth/logout`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const result = await res.json();
          if (result.success) {
            dispatch(logout());
            setIsOpenUserOption(!isOpenUserOption);
            toast.success("Logout successfully..");
          } else {
            toast.error(result.message);
          }
        } catch (error) {
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      }
    } else {
      toast.error("Token is not avaible");
    }
  };
  const CommonClass =
    "py-2 px-6 cursor-pointer  hover:bg-[#FF4757]  rounded-4xl duration-300 transition-all";
  return (
    <div className="fixed z-50 top-100 bg-black rounded-2xl shadow-2xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 text-lg md:top-19 right-15  py-6 px-8">
      {user.role == "admin" ? ( // this will be protected
        <div onClick={() => { navigate("/all-orders"); setIsOpenUserOption(!isOpenUserOption); }} className={CommonClass}>
          All Orders
        </div>
      ) : (
        <div
          onClick={() => {
            setIsOpenCart(!isOpenCart);
            setIsOpenUserOption(!isOpenUserOption);
          }}
          className={CommonClass}
        >
          Cart
        </div>
      )}
      {user.role == "admin" ? (
        <div onClick={() => { navigate("/all-products"); setIsOpenUserOption(!isOpenUserOption); }} className={CommonClass}>
          All Products
        </div>
      ) : (
        <div onClick={() => { navigate("/user-profile"); setIsOpenUserOption(!isOpenUserOption); }} className={CommonClass}>
          My Orders
        </div>
      )}
      {Loading ? (
        "Signing Out..."
      ) : (
        <div onClick={handleUserLogout} className={CommonClass}>
          Sign Out
        </div>
      )}
      <div></div>
    </div>
  );
};

export default UserOptions;
