import Chat from "../models/chatModal.js";

const ChatController = {
  async createChat(req, res, next) {
    const newChat = new Chat({
      members: [req.body.senderId, req.body.receiverId],
    });
    try {
      const result = await newChat.save();
      res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  },

  async userChat(req, res, next) {
    try {
      const userChats = await Chat.find({ $in: [req.params.userId] });

      res.status(200).json(userChats);
    } catch (err) {
      return next(err);
    }
  },

  async findChat(req, res, next) {
    try {
      const findChat = await Chat.findOne({
        members: { $all: [req.params.firstId, req.params.secondId] },
      });

      res.status(200).json(findChat);
    } catch (err) {
      return next(err);
    }
  },
};

export default ChatController;
