import Message from "../models/Message.js";
import mongoose from "mongoose";
import Conversation from "../models/Conversation.js";


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

    var convID=req.body.conversationID
    const conversation = await Conversation.findById(req.body.conversationID);
    conversation.lastMessage=new Date()
    const savedConv= await conversation.save()
    if(!convID){
      const conversation = await Conversation.findOne({
        members: { $all: [req.user.id, req.body.receiverID] },
      });
      conversation.lastMessage=new Date()
      const savedConv= await conversation.save()
      if(conversation) convID=conversation._id
      if(!conversation){
      const newConversation = new Conversation({
        members: [req.user.id, req.body.receiverID],
        lastMessage: new Date()
      });
      const savedConversation = await newConversation.save();
      convID=savedConversation._id
    }
    }
    const newMessage = new Message({
      senderID: req.user.id,
      conversationID: convID,
      text: req.body.text,
      type: req.body.type
    });

    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const uploadMessageImage = async (req, res) => {
  try {
    console.log(req.file)
    res.status(200).json( req.file.filename);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};
