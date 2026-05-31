/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
import { CgAdd } from "react-icons/cg";
import { AiOutlineDelete } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BACK_END_API } from "../Constants";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import fetchAllProductSFun from "../utils/fetchAllProduts";
import { fetchAllProducts } from "../store//slices/productSlice"
import { useDispatch } from "react-redux";

const SIZE_OPTIONS = ["Small", "Medium", "Large", "Xtra Large", "default"];

const AdminProductUpdate = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (user.role !== "admin") {
            navigate("/")
        }
    }, [])

    const [imagePreview, setImagePreview] = useState(null);
    const [LoadingImgUplaod, setLoadingImgUplaod] = useState(false);
    const [isUploadNewImage, setIsUploadNewImage] = useState(false);
    const [oldImg, setOldImg] = useState("")
    const [ImgUrl, setUrl] = useState("");
    const [imageId, setImageId] = useState("");
    const [product, setProduct] = useState({
        name: "",
        desc: "",
        category: "",
        stockStatus: "In Stock",
        file: null,
        prices: [{ size: "default", originalPrice: "", offerPrice: "" }],
    });

    const fetchProductData = async () => {
        try {
            const res = await fetch(`${BACK_END_API}/api/products/single/${id}`, {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            });
            const result = await res.json();
            console.log(result);
            if (result.success) {
                toast.success(result.message);
                setUrl(result.data.url);
                setOldImg(result.data.url);
                setImageId(result.data.imageId);
                setProduct({
                    name: result?.data.name,
                    desc: result?.data.desc,
                    category: result?.data.category,
                    stockStatus: result?.data.stockStatus,
                    file: result?.data.url,
                    prices: result?.data.prices,
                });
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error(error.message);
            navigate("/");
        }
    };

    useEffect(() => {
        fetchProductData();
    }, []);


    const handleImageUpload = async (e, typeField) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("image", file);
        try {
            setLoadingImgUplaod(true);
            const res = await fetch(`${BACK_END_API}/api/products/upload-image`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
                body: formData,
            });
            const result = await res.json();
            if (result.success) {
                toast.success(result.message);
                setUrl(result.url);
                setImageId(result.ImageId);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoadingImgUplaod(false);
        }

        const blob = URL.createObjectURL(file);

        if (typeField === "product") {
            setImagePreview(blob);
            setProduct({ ...product, file });
        }
    };


    const handleProductChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
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
            const res = await fetch(`${BACK_END_API}/api/products/update/${id}`, {
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
                    url: isUploadNewImage ? ImgUrl : oldImg,
                    ImageId: imageId,
                }),
            });
            const result = await res.json();
            if (result.success) {
                toast.success(result.message);
                const pResult = await fetchAllProductSFun(true);
                dispatch(fetchAllProducts({ pResult, isError: false }));
                navigate("/")
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="max-w-5xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {isUploadNewImage && <div>
                        <input
                            type="file"
                            onChange={(e) => handleImageUpload(e, "product")}
                            className="w-full p-2 bg-white/10 rounded"
                        />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                className="mt-3 w-40 h-40 object-cover rounded"
                            />
                        )}
                    </div>}
                    {
                        isUploadNewImage == false && <div className="w-full flexCenter"><img
                            src={oldImg}
                            className="mt-3 w-40 h-40 object-cover rounded"
                        /></div>
                    }

                    <label
                        class="relative text-[#E7414F] w-fit flex cursor-pointer items-center justify-center gap-[1em]"
                        for="tick"
                    >
                        <input value={isUploadNewImage} onChange={() => setIsUploadNewImage((pre) => !pre)} class="peer appearance-none" id="tick" name="tick" type="checkbox" />
                        <span
                            class="absolute left-0 top-1/2 h-[2em] w-[2em] -translate-x-full -translate-y-1/2 rounded-[0.25em] border-2 border-[#E7414F]"
                        >
                        </span>
                        <svg
                            viewBox="0 0 69 89"
                            class="absolute left-0 top-1/2 h-[2em] w-[2em] -translate-x-full -translate-y-1/2 duration-500 ease-out [stroke-dasharray:100] [stroke-dashoffset:100] peer-checked:[stroke-dashoffset:0]"
                            fill="none"
                            height="89"
                            width="69"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M.93 63.984c3.436.556 7.168.347 10.147 2.45 4.521 3.19 10.198 8.458 13.647 12.596 1.374 1.65 4.181 5.922 5.598 8.048.267.4-1.31.823-1.4.35-5.744-30.636 9.258-59.906 29.743-81.18C62.29 2.486 63.104 1 68.113 1"
                                stroke-width="6px"
                                stroke="#E7414F"
                                pathLength="100"
                            ></path>
                        </svg>
                        <p class="text-[1em] font-bold [user-select:none]">Uplaod New Image</p>
                    </label>


                    {/* ROWS */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <input
                            value={product.name}
                            name="name"
                            placeholder="Product Name"
                            onChange={handleProductChange}
                            className="p-2 bg-white/10 rounded"
                        />
                        <input
                            value={product.category}
                            name="category"
                            placeholder="Category"
                            onChange={handleProductChange}
                            className="p-2 bg-white/10 rounded"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <input
                            value={product.desc}
                            name="desc"
                            placeholder="Description"
                            onChange={handleProductChange}
                            className="p-2 bg-white/10  rounded"
                        />
                        <select
                            value={product.stockStatus}
                            name="stockStatus"
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

                        <div className="grid md:grid-cols-2 gap-5">
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
                                        className="absolute bottom-0  z-40 rounded-full right-0 text-xs B p-3 bg-red-400"
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

                    <button type="submit" className="w-fit px-5  py-3 bg-[#CE3B48] rounded-xl relative left-1/2 -translate-x-1/2">
                        Update Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminProductUpdate;
