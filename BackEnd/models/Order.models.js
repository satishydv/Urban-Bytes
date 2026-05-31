import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "User id is required for orders"],
    },
    items: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
        name: String,
        size: String,
        price: Number,
        quantity: Number,
        url: String,
      },
    ],
    // easypiasa will be added soon.
    paymentMethod: {
      type: String,
      enum: ["COD", "CARD", "ONLINE"],
      default: "COD",
    },
    orderStatus: {
      type: String,
      enum: [
        "placed",
        "confirmed",
        "preparing",
        "OnTheWay",
        "delivered",
        "cancelled",
      ],
      default: "placed",
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
    deliveryAddress: String,
    city: String,
    street: String,
    contactNumber: String,
    totalPrice: Number,
    orderAssignTo: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      default: null,
    }
  },
  {
    timestamps: true,
  },
);

const orderModel = mongoose.model("order", orderSchema);

export default orderModel;
