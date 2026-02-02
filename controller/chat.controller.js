import Message from "../model/chat.model.js";

export const addMessage = async (req, res) => {
  try {
    const { room, sender, message,link,senderName,receiver } = req.body;
    const data = new Message({
      room,
      sender,
      message,
      senderName,
      receiver,
      link
    });
    console.log("time is => ", data)
    await data.save();
    // if (data) console.log("add success");
    // else console.log("add fail");
    res.status(200).json({ msg: "mas added successfuly" }, data);
  } catch (err) {
    res.status(500).json({ msg: "error in adding message" }, err);
  }
};

export const getMessage = async (req, res) => {
  const { room } = req.body;
  try {
    const messages = await Message.find({room}).sort({ createdAt: 1 });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(422).send({ error: `${error.message}` });
  }
};

export const getNoti = async (req, res) => {
  const { user } = req.body;
  console.log(user)
  try {
    const notification = await Message.find({receiver:user}).sort({createdAt: -1});
    return res.status(200).json(notification);
  } catch (error) {
    return res.status(422).send({ error: `${error.message}` });
  }
};
