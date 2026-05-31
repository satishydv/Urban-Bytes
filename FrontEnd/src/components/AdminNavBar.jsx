/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { HiOutlineRefresh, HiMenuAlt3, HiX } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../store/slices/productSlice";
import { sideBarNavLins } from "../Constants";
import fetchAllProductSFun from "../utils/fetchAllProduts";
import { toast } from "react-toastify";
import fetchAllOrderfun from "../utils/fetchAllOrders";
import { allOrders } from "../store/slices/orderSlice";
import fetchUsersFun from "../utils/fetchAllCustomers";
import { allUser } from "../store/slices/customerSlice";

const AdminNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [CrtTime, setCrtTime] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const time = setInterval(() => {
      const date = new Date();
      const formattedDate = date.toLocaleString("en-US", {
        timeZoneName: "short",
      });
      setCrtTime(formattedDate.split("GMT+5"));
    }, 1000);
    return () => clearInterval(time);
  }, []);

  useEffect(() => {
    if (user.name === "") navigate("/");
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleReLoadNewDataClick = async () => {
    if (location.pathname === "/all-products") {
      const data = await fetchAllProductSFun(true);
      if (data) {
        dispatch(fetchAllProducts({ result: data, isError: false }));
        return toast.success("Updated Data fetched");
      } else return toast.error("Something Went Wrong While fetching Products");
    } else if (location.pathname === "/all-orders") {
      const response = await fetchAllOrderfun(user?.token);
      if (response) {
        dispatch(allOrders({ orders: response, isError: false }));
        return toast.success("Updated Data fetched");
      } else return toast.error("Something Went Wrong While fetching Orders");
    } else if (location.pathname === "/all-customers") {
      const customerData = await fetchUsersFun(user?.token);
      if (customerData) {
        dispatch(allUser({ data: customerData }));
        return toast.success("Updated Data fetched");
      } else
        return toast.error("Something Went Wrong While fetching Customers");
    }
  };

  const currentPage = sideBarNavLins.find((l) => l.link === location.pathname);

  return (
    <>
      <div className="sticky top-0 z-50 bg-black border-b border-white/10">
        <div className="flex items-center justify-between px-4 md:px-8 py-3">
          <h1 className="text-white font-bold text-lg tracking-wide">
            {currentPage?.name ?? "Admin"}
          </h1>

          <div className="hidden md:flex items-center gap-2">
            {sideBarNavLins.map((link, idx) => (
              <div
                key={idx}
                title={link.name}
                onClick={() => navigate(link.link)}
                className={`flex items-center gap-2 py-2 px-4 rounded-2xl cursor-pointer transition-all duration-200 hover:bg-[#ff4757]
                  ${location.pathname === link.link ? "bg-[#ff4757]" : ""}`}
              >
                <link.icon size={22} />
                <span className="text-sm font-medium">{link.name}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block py-1.5 px-4 bg-[#00183A] rounded-xl text-sm text-white/80">
              {CrtTime}
            </div>

            {currentPage && location.pathname !== "/add-new-product" && (
              <button
                onClick={handleReLoadNewDataClick}
                title="Refresh data"
                className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-white/5 hover:bg-[#ff4757] transition-all duration-200 text-sm"
              >
                <HiOutlineRefresh size={20} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            )}

            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 hover:bg-[#ff4757] transition-all duration-200"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="flex flex-col px-4 pb-4 gap-2 border-t border-white/10 pt-3">
            {sideBarNavLins.map((link, idx) => (
              <div
                key={idx}
                onClick={() => navigate(link.link)}
                className={`flex items-center gap-3 py-2.5 px-4 rounded-xl cursor-pointer transition-all duration-200 hover:bg-[#ff4757]
                  ${location.pathname === link.link ? "bg-[#ff4757]" : "bg-white/5"}`}
              >
                <link.icon size={20} />
                <span className="text-sm font-medium">{link.name}</span>
              </div>
            ))}

            {/* Clock in mobile menu */}
            <div className="sm:hidden mt-1 py-2 px-4 bg-[#00183A] rounded-xl text-sm text-white/70 text-center">
              {CrtTime}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNavBar;
