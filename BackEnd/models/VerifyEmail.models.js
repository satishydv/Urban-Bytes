import mongoose from "mongoose";

const verifyEmailSchema = new mongoose.Schema({
  email: String,
  otp: String,
  purpose: {
    type: String,
    default: "verify",
  },
  expiresAt: Date,
});

const verifyEmailModel = mongoose.model("verifyEmail", verifyEmailSchema);

export default verifyEmailModel;