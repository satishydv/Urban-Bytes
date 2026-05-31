import { AiOutlineCamera } from "react-icons/ai";
/* eslint-disable react-hooks/exhaustive-deps */
import { CgAdd } from "react-icons/cg";
import { AiOutlineDelete } from "react-icons/ai";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { BACK_END_API } from "../Constants"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { SIZE_OPTIONS, AllCategory } from "../Constants";


const AdminProductForm = () => {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  // check for admin 
  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/")
    }
  }, [])
  const [type, setType] = useState("product");

  const [imagePreview, setImagePreview] = useState(null);
  const [LoadingImgUplaod, setLoadingImgUplaod] = useState(false);
  const [ImgUrl, setUrl] = useState("")
  const [imageId, seImageId] = useState("")

  const [product, setProduct] = useState({
    name: "",
    desc: "",
    category: AllCategory[0],
    stockStatus: "In Stock",
    file: null,
    prices: [{ size: "default", originalPrice: "", offerPrice: "" }],
  });

  const [deal, setDeal] = useState({
    title: "",
    description: "",
    file: null,
    preview: null,
    price: "",
    isActive: true,
    activetill: null
  });

  const ImageRef = useRef(null)


  const handleImageUpload = async (e, typeField) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      setLoadingImgUplaod(true)
      const res = await fetch(`${BACK_END_API}/api/products/upload-image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        body: formData
      })
      const result = await res.json();
      if (result.success) {
        toast.success(result.message);
        setUrl(result.url);
        seImageId(result.ImageId)
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoadingImgUplaod(false)
    }

    const blob = URL.createObjectURL(file);

    if (typeField === "product") {
      setImagePreview(blob);
      setProduct({ ...product, file });
    } else {
      setDeal({ ...deal, file: file, preview: blob });
    }
  };


  const handleProductChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleDealChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDeal({
      ...deal,
      [name]: type === "checkbox" ? checked : value,
    });
  };


  const handlePriceChange = (i, field, value) => {
    const updated = [...product.prices];
    updated[i][field] = value;
    setProduct({ ...product, prices: updated });
  };

  const addPrice = () => {
    setProduct({
      ...product,
      prices: [
        ...product.prices,
        { size: "default", originalPrice: "", offerPrice: "" },
      ],
    });
  };

  const removePrice = (index) => {
    const updated = product.prices.filter((_, i) => i !== index);
    setProduct({ ...product, prices: updated });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "product") {
      if (!product.name || !product.category) {
        alert("Missing fields");
        return;
      }

      for (let p of product.prices) {
        if (!p.size || !p.originalPrice || !p.offerPrice) {
          alert("Complete price fields");
          return;
        }
      }
      try {
        const res = await fetch(`${BACK_END_API}/api/products/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({
            name: product.name,
            category: product.category,
            desc: product.desc,
            stockStatus: product.stockStatus,
            prices: product.prices,
            url: ImgUrl,
            ImageId: imageId,

          })
        });
        const result = await res.json();
        if (result.success) {
          toast.success(result.message);
          navigate("/all-products");
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    if (type === "deal") {
      if (!deal.title || !deal.description || !deal.price) {
        alert("Missing deal fields");
        return;
      }
      const dealres = await fetch(`${BACK_END_API}/api/deals/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`
        },
        body: JSON.stringify({
          title: deal.title,
          description: deal.description,
          image: ImgUrl,
          price: deal.price,
          isActive: deal.isActive,
          activetill: deal.activetill
        })
      });
      const dealresult = await dealres.json();
      if (dealresult.success) {
        toast.success(dealresult.message)
        navigate("/all-products")
      } else {
        toast.error(dealresult.message)
      }
      console.log("DEAL:", deal);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setType("product")}
            className={`px-4 py-2 rounded ${type === "product" ? "bg-[#CE3B48]" : "bg-white/10"
              }`}
          >
            Product
          </button>
          <button
            onClick={() => setType("deal")}
            className={`px-4 py-2 rounded ${type === "deal" ? "bg-[#CE3B48]" : "bg-white/10"
              }`}
          >
            Deal
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {type === "product" && (
            <>
              <div>
                <input
                  ref={ImageRef}
                  hidden
                  type="file"
                  onChange={(e) => handleImageUpload(e, "product")}
                  className="w-full p-2 bg-white/10 rounded"
                />
                <div onClick={() => ImageRef.current.click()} className="w-full py-10 px-5 rounded-4xl border-2 border-dashed gap-5 flexCenter"><AiOutlineCamera size={34} />Click Here to Select Image</div>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    className="mt-3 w-40 h-40 object-cover rounded"
                  />
                )}
              </div>

              {/* ROWS */}
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="name"
                  placeholder="Product Name Goes here.."
                  value={product.name}
                  onChange={handleProductChange}
                  className="p-2 bg-white/10 rounded"
                />
                <select
                  name="category"
                  value={product.category}
                  onChange={handleProductChange}
                  className="p-2 appearance-none bg-white/10 rounded"
                >
                  {
                    AllCategory.map((cat, idx) => {
                      return <option key={idx} className="bg-black">{cat}</option>
                    })
                  }
                </select>

              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="desc"
                  placeholder="Description Goes here"
                  value={product.desc}
                  onChange={handleProductChange}
                  className="p-2 bg-white/10 text-black rounded"
                />
                <select
                  name="stockStatus"
                  value={product.stockStatus}
                  onChange={handleProductChange}
                  className="p-2 appearance-none bg-white/10 rounded"
                >
                  <option className="bg-black">In Stock</option>
                  <option className="bg-black">Out Off Stock</option>
                  <option className="bg-black"> Soon</option>
                </select>
              </div>

              {/* PRICES */}
              <div>
                <h2 className="mb-3">Prices</h2>

                <div className="grid md:grid-cols-2 gap-4">
                  {product.prices.map((p, i) => (
                    <div
                      key={i}
                      className="p-3 bg-white/5 border border-white/10 rounded space-y-2 relative"
                    >
                      <select
                        value={p.size}
                        onChange={(e) =>
                          handlePriceChange(i, "size", e.target.value)
                        }
                        className="w-full p-2 bg-black border border-white/10 rounded"
                      >
                        {SIZE_OPTIONS.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>

                      <input
                        placeholder="Original Price"
                        value={p.originalPrice}
                        onChange={(e) =>
                          handlePriceChange(i, "originalPrice", e.target.value)
                        }
                        className="w-full p-2 bg-black border border-white/10 rounded"
                      />

                      <input
                        placeholder="Offer Price"
                        value={p.offerPrice}
                        onChange={(e) =>
                          handlePriceChange(i, "offerPrice", e.target.value)
                        }
                        className="w-full p-2 bg-black border border-white/10 rounded"
                      />

                      <button
                        type="button"
                        onClick={() => removePrice(i)}
                        className="absolute -bottom-13 rounded-full right-2 text-xs B p-3 bg-red-400"
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addPrice}
                  className="mt-4 px-4 flexCenter gap-3 py-2 bg-[#CE3B48] rounded"
                >
                  <CgAdd size={20} /> Add Price
                </button>
              </div>
            </>
          )}

          {/* DEAL */}
          {type === "deal" && (
            <>
              <div>
                <input
                  type="file"
                  ref={ImageRef}
                  hidden
                  onChange={(e) => handleImageUpload(e, "deal")}
                  className="w-full p-2 bg-white/10 rounded"
                />
                {deal.preview == null && <div onClick={() => ImageRef.current.click()} className="w-full py-10 px-5 rounded-4xl border-2 border-dashed gap-5 flexCenter"><AiOutlineCamera size={34} /> Click Here to Select Image</div>}
                {deal.preview && (
                  <img
                    src={deal.preview}
                    className="mt-3 w-40 h-40 object-cover rounded"
                  />
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="title"
                  placeholder="Title"
                  onChange={handleDealChange}
                  className="p-2 bg-white/10 rounded"
                />
                <input
                  name="price"
                  placeholder="Price"
                  onChange={handleDealChange}
                  className="p-2 bg-white/10 rounded"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="description"
                  type="text"
                  rows={4}
                  placeholder="Description"
                  onChange={handleDealChange}
                  className="p-2 bg-white/10  rounded"
                />
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={deal.isActive}
                    onChange={handleDealChange}
                  />
                  Active
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="datetime-local"
                    name="activetill"
                    checked={deal.activetill}
                    onChange={handleDealChange}
                  />
                  Active Till
                </label>
              </div>


            </>
          )}

          <button type="submit" className="w-fit px-5  py-3 bg-[#CE3B48] rounded-xl relative left-1/2 -translate-x-1/2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;
