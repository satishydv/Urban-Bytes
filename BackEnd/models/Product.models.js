import mongoose from "mongoose";

const priceSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      required: true,
      enum: ["Small", "Medium", "Large", "Xtra Large", "default"],
    },

    originalPrice: {
      type: Number,
      required: true,
    },

    offerPrice: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    desc: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    url: {
      type: String,
      required: true,
    },
    imageId: String,
    prices: {
      type: [priceSchema],
      required: true,
    },
    stockStatus: {
      type: String,
      enum: ["In Stock", "Out Off Stock", "Soon"],
    },
  },
  {
    timestamps: true,
  },
);

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
