import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    ownerID: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "",
    },
    streetNumber: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    tags: [String],
    picture: {
      type: String,
      default: "",
    },
  },

  { timestamps: true }
);

const Store = mongoose.model("Store", StoreSchema);
export default Store;
