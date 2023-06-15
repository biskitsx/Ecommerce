import mongoose, { model } from "mongoose";

const orderSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: "Product"
            },
            count: Number,
            color: String
        }
    ],
    paymentIntent: {},
    orderStatus: {
        type: String,
        default: "Not Processed",
        enum: [
            "Not Processed",
            "Cash on Delivery",
            "Processing",
            "Dispatched",
            "Cancelled",
            "Delivered"
        ]
    },
    orderBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }

},{ timestamps: true})

const Order = mongoose.models.Order || model('Order', orderSchema)
export default Order