import Message from "../models/messageModel.js";

const MessageController = {
  async addMessage(req, res, next) {
    const { chatId, senderId, text } = req.body;

    const newMessage = new Message({ chatId, senderId, text });
    try {
      const result = await newMessage.save();
      res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  },

  async getMessage(req, res, next) {
    const { chatId } = req.params;

    try {
      const result = await Message.find({ chatId });
      res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  },
};

export default MessageController;
