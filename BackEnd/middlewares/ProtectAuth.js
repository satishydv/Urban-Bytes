import jwt from "jsonwebtoken";
import userModel from "../models/User.models.js";
const ProtectAuth = async (req, res) => {
    try {
        const token = req.query?.token;
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

        req.user = user;
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
};

export default ProtectAuth;
