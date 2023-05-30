import Store from "../models/Store.js";
import User from "../models/User.js";
import mongoose from "mongoose";

/* READ */
export const getStore = async (req, res) => {
  try {
    const store = await Store.findOne({ _id: req.params.id });
    console.log(store)
    res.status(200).json(store);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getStores = async (req, res) => {
  try {
    const store = await Store.find();
    res.status(200).json(store);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getMyStore = async (req, res) => {
  console.log("i'jnc sdcisc ")
  try {
    console.log(req.user.id)
    const store = await Store.findOne({ ownerID: req.user.id });
    res.status(200).json(store);
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: err.message });
  }
};

