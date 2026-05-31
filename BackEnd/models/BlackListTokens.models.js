import mongoose from "mongoose";

const blackListTokens = new mongoose.Schema({
    token: String,
}, { timestamps: true })

const blackListTokenModel = mongoose.model("blacklisttokne", blackListTokens)
export default blackListTokenModel;