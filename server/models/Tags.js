import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
  tag: {
    type: String,
  },
});

const Tag = mongoose.model("Tag", TagSchema);
export default Tag;
