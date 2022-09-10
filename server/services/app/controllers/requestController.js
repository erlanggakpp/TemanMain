const { Request, Magnet } = require("../models");
const { sequelize } = require("../models");

class RequestController {
  static async getRequestByUserId(req, res, next) {
    try {
      const { userId } = req.params;
      const requests = await Request.findAll({
        where: {
          UserId: userId,
        },
      });
      res.status(200).json(requests);
    } catch (error) {
      next(error);
    }
  }
  static async createRequest(req, res, next) {
    try {
      // console.log("MASUUK");
      const { eventId, magnetId } = req.params;
      const { user_id } = req.headers;
      const { requestDescription } = req.body;
      //
      const createdRequest = await Request.create({
        EventId: eventId,
        MagnetId: magnetId,
        UserId: user_id,
        requestDescription,
        status: "Not Accepted",
      });
      res.status(201).json({ message: "Successfully created request" });
    } catch (error) {
      next(error);
    }
  }
  static async editRequestDescription(req, res, next) {
    try {
      const { requestId } = req.params;
      const { requestDescription } = req.body;
      if (!requestDescription) {
        throw { name: "reqDesRequired" };
      }
      const editedRequest = await Request.update(
        {
          requestDescription,
        },
        {
          where: {
            id: requestId,
          },
        }
      );
      res.status(200).json({ message: "Successfully edited request" });
    } catch (error) {
      next(error);
    }
  }
  static async deleteRequest(req, res, next) {
    try {
      const { requestId } = req.params;
      const deleteRequest = await Request.destroy({
        where: {
          id: requestId,
        },
      });
      res.status(200).json({ message: "Successfully deleted request" });
    } catch (error) {
      next(error);
    }
  }
  static async acceptRequest(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { requestId } = req.params;

      const acceptedRequest = await Request.update(
        {
          status: "Accepted",
        },
        {
          where: {
            id: requestId,
          },
          transaction: t,
        }
      );
      const targetMagnet = await Magnet.findByPk(req.targetMagnetId);
      // console.log(targetMagnet.vacantParticipant, "target controller");

      const updateMagnet = await Magnet.update(
        {
          vacantParticipant: targetMagnet.vacantParticipant - 1,
        },
        {
          where: {
            id: req.targetMagnetId,
          },
        }
      );
      await t.commit();
      res.status(200).json({ message: "Accepted request" });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
  static async removeRequested(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { requestId } = req.params;
      const editedRequest = await Request.update(
        {
          status: "Cancelled",
        },
        {
          where: {
            id: requestId,
          },
          transaction: t,
        }
      );
      const targetMagnet = await Magnet.findByPk(req.targetMagnetId);
      //   console.log(targetMagnet);
      const updateMagnet = await Magnet.update(
        {
          vacantParticipant: targetMagnet.vacantParticipant + 1,
        },
        {
          where: {
            id: req.targetMagnetId,
          },
        }
      );
      await t.commit();
      res.status(200).json({ message: "Successfully cancelled invitation" });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
}

module.exports = RequestController;
