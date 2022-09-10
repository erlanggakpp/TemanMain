const { Invitation, Magnet } = require("../models");
const { sequelize } = require("../models");

class InvitationController {
  static async createInvitation(req, res, next) {
    try {
      const { eventId, magnetId, userId } = req.params;
      const { invitationDescription } = req.body;
      const createdInvitation = await Invitation.create({
        EventId: eventId,
        MagnetId: magnetId,
        UserId: userId,
        invitationDescription,
        status: "Not Accepted",
      });
      res.status(201).json({ message: "Successfully created invitation" });
    } catch (error) {
      next(error);
    }
  }
  static async editInvitationDescription(req, res, next) {
    try {
      const { invitationId } = req.params;
      const { invitationDescription } = req.body;
      if (!invitationDescription) {
        throw { name: "invDesRequired" };
      }
      const editedInvitation = await Invitation.update(
        {
          invitationDescription,
        },
        {
          where: {
            id: invitationId,
          },
        }
      );
      res.status(200).json({ message: "Successfully edited invitation" });
    } catch (error) {
      next(error);
    }
  }
  static async deleteInvitation(req, res, next) {
    try {
      const { invitationId } = req.params;
      const deleteInvitation = await Invitation.destroy({
        where: {
          id: invitationId,
        },
      });
      res.status(200).json({ message: "Successfully deleted invitation" });
    } catch (error) {
      next(error);
    }
  }
  static async acceptInvitation(req, res, next) {
    const t = await sequelize.transaction();
    // console.log(req);
    // console.log(targetMagnetId, "<<<<<<<<<<<<<<<<<<<");
    try {
      const { invitationId } = req.params;

      const acceptedInvitation = await Invitation.update(
        {
          status: "Accepted",
        },
        {
          where: {
            id: invitationId,
          },
          transaction: t,
        }
      );
      const targetMagnet = await Magnet.findByPk(req.targetMagnetId);
      //   console.log(targetMagnet);
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
      res.status(200).json({ message: "Accepted invitation" });
    } catch (error) {
      await t.rollback();

      next(error);
    }
  }
  static async removeInvitedParticipant(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { invitationId } = req.params;
      const editedInvitation = await Invitation.update(
        {
          status: "Cancelled",
        },
        {
          where: {
            id: invitationId,
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
  static async getInvitationByUserId(req, res, next) {
    try {
      const { user_id } = req.headers;
      const invitations = await Invitation.findAll({
        where: {
          UserId: user_id,
        },
      });
      res.status(200).json(invitations);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = InvitationController;
