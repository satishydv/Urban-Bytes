/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BACK_END_API } from "../Constants";
import { updateDeal } from "../store/slices/dealSlice";

const AdminDealUpdate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [image, setImage] = useState({
    old: "",
    new: "",
    useNew: false,
  });

  const [deal, setDeal] = useState({
    title: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    if (user?.role !== "admin") navigate("/");
  }, [user, navigate]);

  const fetchDealData = async () => {
    try {
      const res = await fetch(`${BACK_END_API}/api/deals/single/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      const result = await res.json();

      if (result.success) {
        const d = result.data;

        setDeal({
          title: d.title,
          description: d.description,
          price: d.price
        });

        setImage((prev) => ({
          ...prev,
          old: d.image,
        }));
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchDealData();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);

      const res = await fetch(`${BACK_END_API}/api/products/upload-image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        setImage((prev) => ({
          ...prev,
          new: result.url,
        }));

        toast.success("Image uploaded");
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setDeal((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(`${BACK_END_API}/api/deals/update/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          ...deal,
          image: image.useNew ? image.new : image.old,
        }),
      });

      const result = await res.json();

      if (result.success) {
        dispatch(updateDeal(result.data));
        toast.success("Deal updated");
        navigate("/all-products");
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* IMAGE */}
          <div className="space-y-3">
            <img
              src={image.useNew ? image.new : image.old}
              className="w-40 h-40 object-cover rounded"
            />

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={image.useNew}
                onChange={() =>
                  setImage((prev) => ({
                    ...prev,
                    useNew: !prev.useNew,
                  }))
                }
              />
              Use new image
            </label>

            {image.useNew && (
              <input
                type="file"
                onChange={handleImageUpload}
                className="p-2 bg-white/10 rounded w-full"
              />
            )}

            {uploading && (
              <p className="text-xs text-white/50">Uploading image...</p>
            )}
          </div>

          {/* FIELDS */}
          <input
            name="title"
            value={deal.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 bg-white/10 rounded"
          />

          <input
            name="price"
            value={deal.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-2 bg-white/10 rounded"
          />

          <textarea
            name="description"
            value={deal.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 bg-white/10 rounded"
          />

         

          <button
            disabled={loading}
            className="w-full bg-[#CE3B48] py-3 rounded"
          >
            {loading ? "Updating..." : "Update Deal"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDealUpdate;
