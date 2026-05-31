import jwt from "jsonwebtoken";
import userModel from "../models/User.models.js";

const IsRiderAuthMw = async (req, res) => {
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
                message: "Rider not found",
            });
        }
        const rider = await userModel.findOne({ email: decode.userEmail });

        if (!rider) {
            return res.send({
                success: false,
                message: "RIder not found",
            });
        }
        if (rider.role !== "rider" || rider.isEmailVerified === false) {
            return res.send({
                success: false,
                message: "Access denied",
            });
        }
        req.user = rider;
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
};

export default IsRiderAuthMw;
