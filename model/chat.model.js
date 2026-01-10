import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    room: String,
    sender:String,
    message:String,
  },
  {
    Timestamp: true,
  }
);

const Message = mongoose.model("Message", messageSchema);
export default Message
