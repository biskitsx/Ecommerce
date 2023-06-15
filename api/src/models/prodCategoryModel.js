import mongoose, { model } from "mongoose";

const prodCategorySchema = new mongoose.Schema(
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

const Category = mongoose.models.Category || mongoose.model("PCategory", prodCategorySchema)
export default Category