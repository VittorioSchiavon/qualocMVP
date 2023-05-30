import Conversation from "../models/Conversation.js";
import mongoose from "mongoose";


/* READ */
export const getUserConversations = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.user.id] },
    });
    console.log(conversation)
    res.status(200).json(conversation);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserID, req.params.secondUserID] },
    });
    console.log(conversation)
    res.status(200).json(conversation);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createConversation = async (req, res) => {
  try {
    if(req.user.id == req.body.receiverID) return
    const newConversation = new Conversation({
      members: [req.user.id, req.body.receiverID],
    });
    const savedConversation = await newConversation.save();
    console.log(savedConversation)
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
