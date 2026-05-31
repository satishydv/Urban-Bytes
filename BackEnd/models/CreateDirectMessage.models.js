import { Schema, model } from "mongoose"

const DmSchema = new Schema({
    name: String,
    email: String,
    message: String,
}, { timestamps: true })


const DMModel = model("dm", DmSchema)

export default DMModel;