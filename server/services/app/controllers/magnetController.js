const { Magnet, Request, Invitation, Event } = require("../models");

class MagnetController {
  // static async getAllMagnets(req, res, next) {
  //   try {
  //     const magnets = await Magnet.findAll();
  //     res.status(200).json(magnets);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  static async createMagnet(req, res, next) {
    try {
      const {
        UserId,
        EventId,
        confirmationDate,
        ageRequirement,
        specialRequirement,
        magnetDescription,
        participant,
        vacantParticipant,
      } = req.body;
      const createdMagnet = await Magnet.create({
        UserId,
        EventId,
        confirmationDate,
        status: true,
        ageRequirement,
        specialRequirement,
        magnetDescription,
        participant,
        vacantParticipant,
      });
      res.status(201).json({
        message: "Successfully created new magnet",
        magnet: createdMagnet,
      });
    } catch (error) {
      //   console.log(error);
      next(error);
    }
  }

  static async editMagnet(req, res, next) {
    try {
      const { magnetId } = req.params;
      const {
        confirmationDate,
        ageRequirement,
        specialRequirement,
        magnetDescription,
        participant,
        vacantParticipant,
        status,
      } = req.body;
      // console.log(S, "INI BODYYY");
      if (!confirmationDate) {
        throw { name: "emptyMagDate" };
      }
      if (!ageRequirement) {
        throw { name: "emptyMagAge" };
      }
      if (!magnetDescription) {
        throw { name: "emptyMagDes" };
      }
      if (!specialRequirement) {
        throw { name: "emptyMagSpe" };
      }
      if (!participant) {
        throw { name: "emptyMagPart" };
      }
      if (!vacantParticipant) {
        throw { name: "emptyMagVac" };
      }
      if (status === undefined || status === null || status === "") {
        throw { name: "emptyMagStatus" };
      }
      const createdMagnet = await Magnet.update(
        {
          confirmationDate,
          status: status,
          ageRequirement,
          specialRequirement,
          magnetDescription,
          participant,
          vacantParticipant,
        },
        {
          where: {
            id: magnetId,
          },
        }
      );
      res.status(200).json({ message: "Successfully edited magnet" });
    } catch (error) {
      //   console.log(error);
      next(error);
    }
  }

  static async deleteMagnet(req, res, body) {
    try {
      const { magnetId } = req.params;

      const deleteMagnet = await Magnet.destroy({
        where: {
          id: magnetId,
        },
      });
      res.status(200).json({ message: "Successfully deleted magnet" });
    } catch (error) {
      next(error);
    }
  }
  static async getMagnetByUserId(req, res, next) {
    try {
      const { user_id } = req.headers;
      const magnetList = await Magnet.findAll({
        where: {
          UserId: +user_id,
        },
        include: {
          model: Event,
        },
      });

      if (!magnetList.length) {
        throw { name: "magnetsNotExist" };
      }
      res.status(200).json(magnetList);
    } catch (error) {
      next(error);
    }
  }
  static async findOneMagnet(req, res, next) {
    try {
      const { magnetId } = req.params;
      const magnet = await Magnet.findOne({
        where: {
          id: +magnetId,
        },
      });
      const targetRequests = await Request.findAll({
        where: {
          status: "Accepted",
          MagnetId: +magnetId,
        },
      });
      const targetInvitations = await Invitation.findAll({
        where: {
          status: "Accepted",
          MagnetId: +magnetId,
        },
      });
      magnet.dataValues.Participant = [];
      targetRequests.forEach((el) => {
        magnet.dataValues.Participant.push(el);
      });
      targetInvitations.forEach((el) => {
        magnet.dataValues.Participant.push(el);
      });

      res.status(200).json(magnet);
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
}

module.exports = MagnetController;
