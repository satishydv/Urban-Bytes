/* eslint-disable react-hooks/exhaustive-deps */
import { AiFillDelete } from "react-icons/ai";
import { AiTwotoneEdit } from "react-icons/ai";
import { MdAddBox } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BACK_END_API } from "../Constants";
import {
  deleteProductStatus,
  updateProductStatus,
} from "../store/slices/productSlice";
import { deleteDeal, updateDealStatus } from "../store/slices/dealSlice";
import { formatDate } from "../utils/dateFormat";

const statusStyles = {
  "In Stock": "bg-green-500/20 text-green-400 border-green-500",
  "Out Off Stock": "bg-red-500/20 text-red-400 border-red-500",
  Soon: "bg-yellow-500/20 text-yellow-400 border-yellow-500",
};

const statusOptions = ["In Stock", "Out Off Stock", "Soon"];
const ProductFilters = ["All", "In Stock", "Out Off Stock", "Soon"];
const DealFilters = ["Active", "InActiv", "All"];

export default function AllProductsAdminPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);
  const allDeals = useSelector((state) => state.deals.deals);
  const user = useSelector((state) => state.user);
  const [OpenTab, setOpenTab] = useState("ProductTab");
  const [productFilter, setProductFilter] = useState("All"); // this will based on stack
  const [dealFilter, setDealFilter] = useState("Active");

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/");
    }
  }, []);

  const [products, setProducts] = useState(allProducts?.items);
  console.log(products);

  const updateStatus = async (id, value) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === id ? { ...p, stockStatus: value } : p)),
    );
    try {
      console.log(id, value);
      const res = await fetch(`${BACK_END_API}/api/products/update-status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          id: id,
          status: value,
        }),
      });
      const result = await res.json();
      console.log(result);
      if (result.success) {
        toast.success(result.message);
        dispatch(updateProductStatus({ id, value }));
      } else {
        toast.error(result.message);
        setProducts(products?.items);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteProducts = async (id) => {
    try {
      if (confirm("Are You Sure to Delete Product..")) {
        const res = await fetch(`${BACK_END_API}/api/products/${id}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        const result = await res.json();
        console.log(result);
        if (result.success) {
          toast.success(result.message);
          dispatch(deleteProductStatus({ id }));
          setProducts((prev) => prev.filter((p) => p._id !== id));
        } else {
          toast.error(result.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const hanleUpdationDealStatusClick = async (id, isActive) => {
    if (confirm("Are You Sure to Update Status")) {
      try {
        const res = await fetch(
          `${BACK_END_API}/api/deals/update-status/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
            body: JSON.stringify({
              activeStatus: !isActive,
            }),
          },
        );

        const result = await res.json();
        console.log(result);
        if (result.success) {
          toast.success(result.message);
          dispatch(updateDealStatus({ id, status: !isActive }));
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleDeleteDeal = async (id) => {
    if (confirm("Are You Sure to Delete Deal..")) {
      try {
        const res = await fetch(`${BACK_END_API}/api/deals/delete/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        });
        const result = await res.json();
        if (!result.success) {
          toast.error(result.message);
        } else {
          toast.success(result.message);
          dispatch(deleteDeal({ id }));
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen py-6">
      <div className="flex py-3 sm:flex-row flex-col gap-3 mr-5 justify-between items-center">
        <div className="flexCenter px-10 gap-2">
          <button
            onClick={() => setOpenTab("ProductTab")}
            className={`py-3 px-2 rounded-xl ${OpenTab == "ProductTab" ? "bg-[#CE3B48]" : "bg-white/10"}`}
          >
            Products
          </button>
          <button
            onClick={() => setOpenTab("DealTab")}
            className={`py-3 px-2 rounded-xl ${OpenTab == "DealTab" ? "bg-[#CE3B48]" : "bg-white/10"}`}
          >
            Deals
          </button>
        </div>
        <div>
          {OpenTab == "ProductTab" ? (
            <div className="ProductFIlter flex gap-2">
              <p>Product Filters By</p>
              <select
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
                className="bg-black border border-white/20 text-white text-sm p-1 rounded focus:outline-none"
              >
                {ProductFilters.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="Deals flex gap-2">
              <p>Deals Filters By</p>
              <select
                value={dealFilter}
                onChange={(e) => setDealFilter(e.target.value)}
                className="bg-black border border-white/20 text-white text-sm p-1 rounded focus:outline-none"
              >
                {DealFilters.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {OpenTab == "ProductTab" ? (
        <div className="w-full overflow-x-auto">
          <table className="min-w-300 mx-auto border border-white/10 rounded-lg overflow-scroll">
            <thead className="bg-white/5 text-left">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Prices</th>
                <th className="p-3">Last Updated</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {products?.map((product) =>
                product.stockStatus === productFilter ||
                productFilter === "All" ? (
                  <tr key={product._id} className="border-t border-white/10">
                    <td className="p-3 w-40">
                      <img
                        src={product.url}
                        alt={product.name}
                        className="w-14 h-14 object-cover rounded"
                      />
                    </td>
                    <td className="p-3 w-40 font-medium">
                      {product.name.slice(0, 20)}...
                    </td>

                    <td className="p-3 w-40">{product.category}</td>

                    <td className="p-3 w-40">
                      <span
                        className={`px-2 py-1 text-xs border rounded ${
                          statusStyles[product.stockStatus]
                        }`}
                      >
                        {product.stockStatus}
                      </span>

                      <div className="mt-2">
                        <select
                          value={product.stockStatus}
                          onChange={(e) =>
                            updateStatus(product._id, e.target.value)
                          }
                          className="bg-black border border-white/20 text-white text-sm p-1 rounded focus:outline-none"
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>

                    <td className="p-3 ">
                      <div className="space-y-1 grid grid-cols-2 gap-2">
                        {product.prices.map((p, idx) => (
                          <div
                            key={idx}
                            className="text-xs bg-white/5 p-2 rounded"
                          >
                            <div className="font-medium">{p.size}</div>
                            <div>
                              Original:{" "}
                              <span className="line-through text-white/60">
                                {p.originalPrice}
                              </span>
                            </div>
                            <div className="text-[#ff4757]">
                              Offer: {p.offerPrice}
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="p-3 w-40">
                      {formatDate(product.updatedAt)}
                    </td>

                    <td className="p-3 w-40">
                      <button
                        onClick={() => navigate(`/update/${product._id}`)}
                        className="bg-[green]  px-3 py-1 rounded text-sm hover:opacity-80"
                      >
                        <AiTwotoneEdit size={20} /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProducts(product._id)}
                        className="bg-[#ff4757]  ml-5 px-3 py-1 rounded text-sm hover:opacity-80"
                      >
                        <AiFillDelete size={20} /> Delete
                      </button>
                    </td>
                  </tr>
                ) : (
                  ""
                ),
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto w-full  ">
          <table className="min-w-250 mx-auto border border-white/10 rounded-lg ">
            <thead className="bg-white/5 text-left">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Desc.</th>
                <th className="p-3">IsActive</th>
                <th className="p-3">Prices</th>
                <th className="p-3">Last Updated</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {allDeals?.map((deal) =>
                dealFilter === "All" ||
                dealFilter === (deal.isActive ? "Active" : "InActiv") ? (
                  <tr key={deal._id} className="border-t border-white/10">
                    <td className="p-3 w-40">
                      <img
                        src={deal.image}
                        alt={deal.title}
                        className="w-14 h-14 object-cover rounded"
                      />
                    </td>
                    <td className="p-3 w-50 font-medium">
                      {deal.title.slice(0, 20)}...
                    </td>

                    <td className="p-3 w-100">{deal.description}</td>

                    <td className="p-3 flex justify-around w-30">
                      <span
                        onClick={() =>
                          hanleUpdationDealStatusClick(deal._id, deal.isActive)
                        }
                        className={`px-2  flex py-1 text-xs border rounded ${deal.isActive ? "bg-green-500/20 text-green-400 border-green-500" : ""}`}
                      ></span>
                      {deal.isActive}{" "}
                      <p>{deal.isActive ? "Active" : "Not Active"}</p>
                    </td>
                    <td className="p-3 w-40">{deal.price}</td>

                    <td className="p-3 w-40">{formatDate(deal.updatedAt)}</td>
                    <td className="p-3 w-40">
                      <button
                        onClick={() => navigate(`/update-deal/${deal._id}`)}
                        className="bg-[green]  px-3 py-1 rounded text-sm hover:opacity-80"
                      >
                        <AiTwotoneEdit size={20} /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteDeal(deal._id)}
                        className="bg-[#ff4757]  ml-5 px-3 py-1 rounded text-sm hover:opacity-80"
                      >
                        <AiFillDelete size={20} /> Delete
                      </button>
                    </td>
                  </tr>
                ) : (
                  ""
                ),
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
