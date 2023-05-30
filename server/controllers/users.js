import User from "../models/User.js";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

/* READ */
export const getUser = async (req, res) => {
  try {
    const id= req.user.id;
    const user = await User.findById(id);
    console.log(user)
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getPublicUser = async (req, res) => {
  try {
    console.log("i'me here searching for pubs")
    const user = await User.findById(req.params.userID);
    console.log(user)
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};