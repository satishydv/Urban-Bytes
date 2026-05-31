/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import LoginAndSignUp from "./pages/LoginAndSignUp";
import TermsOfServiecs from "./pages/TermsOfServiecs";
import Privacy from "./pages/Privacy";
import PageNotFound from "./pages/PageNotFound";
import AllOrders from "./pages/AllOrder";
import UserProfile from "./pages/UserProfile";
import AllProductsAdminPage from "./pages/AllProducts";
import AllCustomers from "./pages/AllCustomers";
import AddNewProduct from "./pages/AddNewProduct";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import CheckOut from "./pages/CheckOut";
import fetchUser from "./utils/fetchUserFromLC";
import fetchAllProductsFun from "./utils/fetchAllProduts";
import { login } from "./store/slices/userSlice";
import AdminNavBar from "./components/AdminNavBar";
import { fetchAllProducts } from "./store/slices/productSlice";
import { RestrictPages } from "./Constants";
import AdminProductUpdate from "./pages/UpdateProduct";
import fetchAllDealsfun from "./utils/fetchAllDeals";
import { allDeals } from "./store/slices/dealSlice";
import UpdateDeal from "./pages/updateDeal";
import fetchAllOrderfun from "./utils/fetchAllOrders";
import { allOrders } from "./store/slices/orderSlice";
import fetchUsersFun from "./utils/fetchAllCustomers";
import { allUser } from "./store/slices/customerSlice";
import useSSE from "./hooks/useSSE";
import { UserStatusContext } from "./store/contextStore/userUserStatus";
import { useContext } from "react";
import { fetchUserOrdersAsRider } from "./utils/fetchRiderOrders";

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { orderStatus, setOrderStatus, setRiderOrders } =
    useContext(UserStatusContext);

  // the routes where i don't want to show navbar

  const isShownNavOrFooter = RestrictPages.includes(location.pathname);

  const fetchUserData = async (token) => {
    const data = await fetchUser(token);
    if (!data) {
      return;
    } else {
      dispatch(
        login({
          isLogged: true,
          isEmailVerified: data.isEmailVerified,
          phone: data.phone,
          role: data.role,
          profile: data.profile,
          email: data.email,
          name: data.name,
          address: data.address,
          token: token,
        }),
      );
    }
  };

  const fetchProduct = async () => {
    const result = await fetchAllProductsFun(false);
    if (result) {
      dispatch(fetchAllProducts({ result, isError: false }));
    } else {
      dispatch(fetchAllProducts({ result: [], isError: true }));
      toast.error("Something Wents Wrong While fetching Products");
    }
  };

  const fetchDeals = async () => {
    try {
      const response = await fetchAllDealsfun();
      if (response) {
        dispatch(allDeals({ deals: response, isError: false }));
      } else {
        toast.error("Something Wents Wrong While fetching Deals");
      }
    } catch (error) {
      toast.error(
        error.message || "Something Wents Wrong While fetching Deals",
      );
    }
  };

  const fetchAllOrder = async () => {
    try {
      const response = await fetchAllOrderfun(user.token);
      if (response) {
        dispatch(allOrders({ orders: response, isError: false }));
      } else {
        toast.error("Something Wents Wrong While fetching Orders");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetchUsersFun(user?.token);
      if (res) {
        dispatch(allUser({ data: res }));
        return toast.success("Users fetched successfully");
      } else {
        return toast.error("Something Wents Wrong While fetching Users");
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("PPCUserToken");
    if (!token) {
      return;
    }
    fetchUserData(token);
  }, []);

  useSSE({
    onOrderStatus: (data) => {
      setOrderStatus((prevOrders) => {
        const orderExists = prevOrders.find((order) => order._id === data._id);

        // Update existing order
        if (orderExists) {
          return prevOrders.map((order) =>
            order._id === data._id
              ? {
                  ...order,
                  ...data,
                }
              : order,
          );
        }

        // Add new order
        return [data, ...prevOrders];
      });
      toast.success(`Your Order ${data.orderId} Is Update To ${data.status}`);
    },
    onNewOrder: (data) => {
      if (user?.role === "admin") {
        console.log("New order came in:", data);
        toast.info(`New Order Placed: ${data.orderId}`);
        fetchAllOrder();
        // dispatch(fetchAllOrders()); // refresh admin orders
      }
    },
    AssignOrder: (data) => {
      if (user?.role !== "admin") {
        toast.info(data.status);
        fetchUserOrdersAsRider(user).then((orders) => {
          setRiderOrders(orders);
        });
      }
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchProduct();
    fetchDeals();
    if (user.role === "admin") {
      fetchAllOrder();
      fetchUsers();
      return;
    }
  }, [user.role]);

  return (
    <>
      <NavBar isShow={isShownNavOrFooter} />
      {!isShownNavOrFooter && <AdminNavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/tofs" element={<TermsOfServiecs />} />
        <Route path="/auth" element={<LoginAndSignUp />} />
        {/* Only login user can checkout */}
        <Route
          path="/checkout"
          element={user.isLogged ? <CheckOut /> : <LoginAndSignUp />}
        />
        <Route
          path="/user-profile"
          element={user.isLogged ? <UserProfile /> : <LoginAndSignUp />}
        />

        {/* Only admin can access */}
        <Route path="/all-orders" element={<AllOrders />} />
        <Route path="/all-products" element={<AllProductsAdminPage />} />

        <Route path="/all-customers" element={<AllCustomers />} />

        <Route path="/add-new-product" element={<AddNewProduct />} />
        <Route path="/update/:id" element={<AdminProductUpdate />} />
        <Route path="/update-deal/:id" element={<UpdateDeal />} />
        {/* Page not found  */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer isShow={isShownNavOrFooter} />
    </>
  );
};

export default App;
