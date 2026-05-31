import mongoose from "mongoose";

const verifyEmailSchema = new mongoose.Schema({
  email: String,
  otp: String,
});

const verifyEmailModel = mongoose.model("verifyEmail", verifyEmailSchema);

export default verifyEmailModel;