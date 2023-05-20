import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema(
  {
    firstName:{
      type: String,
      required: true,
  },
  lastName:{
      type: String,
      required: true,
  },
  shopName:{
      type: String,
      required: true,
  },
  email:{
      type: String,
      required: true,
      unique: true,
  },
  phone:{
      type: String,
  },
  tags:{
      type: [String],
      required: true,
  },
  password:{
      type: String,
      required: true,
  },
  description:{
      type: String,
      required: true,
  },
  street:{
      type: String,
  },
  city:{
      type: String,
      required: true,
  },
  state:{
      type: String,
  },
  zip:{
      type: String,
  }
  },
  { timestamps: true }
);

const Store = mongoose.model("Store", StoreSchema);
export default Store;