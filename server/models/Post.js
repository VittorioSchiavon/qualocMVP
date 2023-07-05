import mongoose from "mongoose";

const PostSchema= new mongoose.Schema({
    shopID:{
        type: String,
        required: true,
    },
    text:{
        type: String,
        default: "",

    },
    picture: {
      type: String,
      default: "",
    },
},
{ timestamps: true })

const Post = mongoose.model("Post", PostSchema);
export default Post;
