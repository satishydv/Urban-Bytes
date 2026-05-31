import userModel from "../models/User.models.js";

const SendAllCustomers = async (req, res) => {
    try {
        const customers = await userModel.find({}).select("-password");

        if (!customers) {
            return res.send({
                success: false,
                message: "Error in fetching data"
            })
        }
        return res.send({
            success: true,
            message: "Find From DB",
            data: customers
        })

    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
}

const SendRiders = async (req, res) => {
    try {
        const riders = await userModel.find({ role: "rider" }).select("-password");
        if (!riders) {
            return res.send({
                success: false,
                message: "Error in fetching data"
            })
        }
        return res.send({
            success: true,
            message: "Find From DB",
            data: riders
        })

    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
}

const UpdateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        if (!id || !role) {
            return res.send({
                success: false,
                message: "Please provide all fields"
            })
        }
        const findUserEmial = await userModel.findOne({ _id: id });
        if (findUserEmial.isEmailVerified === false) {
            return res.send({
                success: false,
                message: "Frist Ask Him to Verfiy Email"
            })

        }
        const user = await userModel.findOneAndUpdate({ _id: id }, { role }, { new: true });
        if (!user) {
            return res.send({
                success: false,
                message: "Error in updating role"
            })
        }
        return res.send({
            success: true,
            message: "Role Updated Successfully"
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
}

const DeleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await userModel.findOneAndDelete({ _id: id });
        if (!deleteUser) {
            return res.send({
                success: false,
                message: "Error in deleting user"
            })
        }
        return res.send({
            success: true,
            message: "User Deleted Successfully"
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
}
export { SendAllCustomers, SendRiders, UpdateUserRole, DeleteUser }