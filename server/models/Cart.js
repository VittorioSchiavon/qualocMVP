import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  products: [
    {
      productID: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        //required: true,
        default: 1,
        min: 1,
      },
      price: {
        type: Number,
        default: 1,
        //required: true
      },
      option: {
        type: String,
        default: "",
        //required: true
      },
    },
  ],
});

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
