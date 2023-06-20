import mongoose from "mongoose";

const OrderSchema= new mongoose.Schema({
    shopID:{
        type: String,
        required: true,
    },
    clientID:{
        type: String,
        required: true,
    },
    address:{
        type: String,
    },

    products: [
        {
          productID: {
            type: String,
            required: true,
          },
          quantity: {
            type: Number,
            default: 1,
            min: 1,
          },
          price: {
            type: Number,
            default: 1,
          },
          option: {
            type: String,
            default: "",
          },
        },
      ],
    status:{
        type: String,
        default: "created"
    },
    totalPrice:{
        type: Number,
        default:0,
    },
    totalProductPrice:{
        type: Number,
        default:0,
    },
    shippingPrice:{
        type: Number,
        default:0,
    },
    checkoutSessionID:{
        type: String,
    },/*
    ShippingDate:{
        type: Date,
    },
    shippingAttempt:{
        type: Number,
    },*/

},
{ timestamps: true })

const Order = mongoose.model("Order", OrderSchema);
export default Order;
