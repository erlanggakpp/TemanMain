const { Magnet } = require("../models");

class MagnetController {
  static async getAllMagnets(req, res, next) {
    try {
      const magnets = await Magnet.findAll();
      res.status(200).json(magnets);
    } catch (error) {
      next(error);
    }
  }
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
      res.status(201).json({ message: "Successfully created new magnet" });
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
}

module.exports = MagnetController;
