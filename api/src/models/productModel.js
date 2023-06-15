import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Category"
        type: String,
        required: true
    
    },
    brand: {
        type: String,
        required: true
    },
    color: [{
        type: mongoose.Types.ObjectId,
        ref: "Color"
    }],
    tags: [],
    sold: {
        type: Number,
        default: 0
    },
    images: {
        type: Array
    },
    ratings: [{
        star: Number,
        comment: String,
        postedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
    }],
    totalRating: {
        type: String,
        default: 0
    }
}, {timestamps: true});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema)
export default Product