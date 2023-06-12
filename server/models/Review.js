import mongoose from "mongoose";

    const ReviewSchema= new mongoose.Schema({
        userID:{
            type: String,
            required: true,
        },
        productID:{
            type: String,
            required: true,
        },
        content:{
            type: String,
            default: "",
        },
        productRating:{
            type: Number,
            required: true,
        },
        serviceRating:{
            type: Number,
            required: true,
        }
        
    },{ timestamps: true })

const Review = mongoose.model("Review", ReviewSchema);
export default Review;
