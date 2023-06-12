import mongoose from "mongoose";

const ProductSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    shippingCost:{
        type: Number,
        required: true,
    },
    brand: {
        type: String
      },
    shopID:{
        type: String,
        required: true,
    },
    tags:{
        type: [String],
        //required: true,
    },
    options:{
        type: [String],
        //required: true,
    },
    isTemp:{
        type: Boolean,
        default: false,
        //required: true,
    }, 
       picture: {
        type: String,
        default: "",
      },
    
    
    rating:{
        type: Number,
        default:0
    }
})

const Product = mongoose.model("Product", ProductSchema);
export default Product;
