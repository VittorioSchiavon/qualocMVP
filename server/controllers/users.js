import User from "../models/User.js";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

/* READ */
export const getUser = async (req, res) => {
  try {
    const id= req.user.id;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getPublicUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userID);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const setOnline = async (req, res) => {
  try {
    const user = await User.findById(req.params.id );
    user.isOnline=true
    const savedUser= await user.save()
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const setOffline = async (req, res) => {
  try {
    const user = await User.findById(req.params.id );
    user.isOnline=false
    user.lastAccess=new Date()
    const savedUser= await user.save()
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};