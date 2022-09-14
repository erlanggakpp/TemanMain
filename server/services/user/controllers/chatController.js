const { Chat, User } = require("../models");

class ChatController {
  static async saveChat(req, res, next) {
    try {
      const { MagnetId, chat } = req.body;
      const { id } = req.user;
      const savedChat = await Chat.create({
        UserId: id,
        MagnetId: MagnetId,
        chat: chat,
      });
      res.status(201).json(savedChat);
    } catch (error) {
      next(error);
    }
  }
  static async getChatsByMagnetId(req, res, next) {
    try {
      const { magnetId } = req.params;
      const chatList = await Chat.findAll({
        where: {
          MagnetId: magnetId,
        },
        order: [["id", "ASC"]],
        include: {
          model: User,
          attributes: ["firstName", "lastName", "email", "profilePict"],
        },
      });
      chatList.forEach((el) => {
        el.dataValues.author =
          el.dataValues.User.firstName + " " + el.dataValues.User.lastName;
      });
      res.status(201).json(chatList);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ChatController;
