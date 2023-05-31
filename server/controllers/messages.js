import Message from "../models/Message.js";
import mongoose from "mongoose";


/* READ */
export const getConversationMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationID: req.params.conversationID,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const sendMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
