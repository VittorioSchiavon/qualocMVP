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
  },

  { timestamps: true }
);

const Store = mongoose.model("Store", StoreSchema);
export default Store;
