import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required For User Creation"],
    },
    email: {
      type: String,
      required: [true, "Email is Required For User Creation"],
      unique: true,
      index: 1,
    },
    password: {
      type: String,
      required: [true, "password is Required For User Creation"],
    },
    profile: {
      type: String,
      default: ""
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    role: { type: String, default: "user" },
    phone: {
      type: String,
      default: ""


    },
    address: {
      type: String,
      default: ""
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("user", userSchema);
export default userModel;
