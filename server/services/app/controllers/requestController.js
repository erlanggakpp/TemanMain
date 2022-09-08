const { Request, User, Magnet } = require('../models');
// const nodemailer = require('nodemailer');
const fetch = require('node-fetch');

class RequestController {
  static async requestEmail(req, res, next) {
    try {
      const { id } = req.params;
      const { requestDescription } = req.body;
      const magnet = await Magnet.findOne({
        include: {
          model: User,
          attributes: {
            exclude: ['password'],
          },
        },
        where: {
          id: id,
        },
      });
      const mailUser = magnet.User.email;
      const EventId = magnet.EventId;
      const UserId = magnet.UserId;

      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer pk_prod_R6NNEYEZ5QMY2CNTVK56Z4DFCNJ4',
        },
        body: JSON.stringify({
          message: {
            to: {
              email: mailUser,
            },
            content: {
              title: 'Hellow',
              body: 'Test',
            },
          },
        }),
      };

      fetch('https://api.courier.com/send', options)
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));

      const createRequest = await Request.create({
        UserId,
        EventId,
        MagnetId: id,
        requestDescription,
        status: false,
      });

      res
        .status(200)
        .json({ message: `success send mail to ${mailUser}`, createRequest });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = RequestController;
