import mongoose, { model } from "mongoose";

const brandSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
    },
    {
        timestamps: true
    }
)

const Brand = mongoose.models.Brand || mongoose.model("Brand", brandSchema)
export default Brand