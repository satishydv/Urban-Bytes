import jwt from "jsonwebtoken";
import userModel from "../models/User.models.js";
const IsUserLoginAuth = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.send({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decode) {
      return res.send({
        success: false,
        message: "User not found",
      });
    }
    const user = await userModel.findOne({ email: decode.userEmail });
    if (!user) {
      return res.send({
        success: false,
        message: "User not found",
      });
    }
    if (user.role !== "user" || user.isEmailVerified === false) {
      return res.send({
        success: false,
        message: "Access denied",
      });
    }
    req.user = user;
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

export default IsUserLoginAuth;
