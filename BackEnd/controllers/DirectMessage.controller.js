import DMModel from "../models/CreateDirectMessage.models.js";

const CreateDirectMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.send({
                success: false,
                message: "Please provide all fields"
            })
        }
        const exist = await DMModel.findOne({ email });
        if (exist) {
            return res.send({
                success: false,
                message: "This email has already message Posted"
            })
        }
        const newMes = await DMModel.create({
            name, email, message
        })
        return res.send({
            success: true,
            message: "Your Query is submitted successfully",
            data: newMes
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
}

const sendAllDMs = async (req, res) => {
    try {
        const allDm = await DMModel.find();
        return res.send({
            success: true,
            message: "All Direct Messages",
            data: allDm
        })
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
}


export { CreateDirectMessage, sendAllDMs }