import mongoose, { model } from "mongoose";

const cartSchama = new mongoose.Schema(
    {
        products: [
          {
            product: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Product",
            },
            count: Number,
            color: String,
            price: Number,
          },
        ],
        cartTotal: Number,
        totalAfterDiscount: Number,
        orderBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
      {
        timestamps: true,
      }
)

const Cart = mongoose.models.Cart || model("Cart", cartSchama)
export default Cart