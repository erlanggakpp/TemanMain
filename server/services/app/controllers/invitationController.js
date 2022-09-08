const { Invitation, User, Event, Magnet } = require('../models');
const fetch = require('node-fetch');

// const nodemailer = require('nodemailer');

class InvitationController {
  static async sendMailInvitation(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findAll();

      const allMailUser = user.map((el) => {
        return {
          email: el.email,
        };
      });
      const userStr = allMailUser.map(function (mail) {
        return mail['email'];
      });

      for (let i = 0; i < userStr.length; i++) {
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
                email: userStr[i],
              },
              content: {
                title: 'Hellow',
                body: 'Test',
              },
            },
          }),
        };
        // const successSendInvitation = await Invitation.create({});

        fetch('https://api.courier.com/send', options)
          .then((response) => response.json())
          .then((response) => console.log(response))
          .catch((err) => console.error(err));
      }

      res.status(200).json({
        message: `success send mail to ${userStr}`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = InvitationController;
