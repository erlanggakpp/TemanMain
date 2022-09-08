const { Invitation, User } = require('../models');

const nodemailer = require('nodemailer');

class InvitationController {
  static async sendMailInvitation(req, res, next) {
    const { id } = req.params;
    try {
      const user = await Invitation.findOne({
        include: User,
        where: {
          id: id,
        },
      });

      const transporter = nodemailer.createTransport({
        service: 'yopmail',
        auth: {
          user: 'goteifijeco-1184@yopmail.com',
        },
      });
      const options = {
        from: 'goteifijeco-1184@yopmail.com',
        to: 'tes@tes.com',
        subject: `Hello Guys`,
        text: `Kamu mendapatkan undangan untuk bergabung dalam event kami`,
      };

      // transporter.sendMail(options, function (err, info) {
      //   if (err) {
      //     console.log(err);
      //     return;
      //   } else {
      //     console.log('sent: ' + info.response);
      //   }
      // });
      res.status(200).json({ message: 'success send maiil', user });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = InvitationController;
