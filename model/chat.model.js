import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    room: String,
    sender:String,
    receiver:String,
    senderName:String,
    message:String,
    link:String
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message
