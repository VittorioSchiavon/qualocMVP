import mongoose from "mongoose";

const productSchema= new mongoose.Schema({
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
    }/*,
    
    rating:{
        type: Number,
    },
    images:{
        type: [String],
    }*/
})

module.exports = mongoose.model('Product', productSchema);
