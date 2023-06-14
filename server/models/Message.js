import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    conversationID: {
      type: String,
    },
    senderID: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    text: {
      type: String,
    },
    isImage: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);
export default Message;