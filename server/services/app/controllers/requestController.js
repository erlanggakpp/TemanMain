const { Request, User } = require('../models');
const nodemailer = require('nodemailer');
class RequestController {
  static async requestEmail(req, res, next) {
    try {
      const { id } = req.params;
      const user = await Request.findOne({
        include: User,
        where: {
          MagnetId: id,
        },
      });
      const mailUser = user.User.email;

      const transporter = nodemailer.createTransport({
        service: 'yopmail',
        auth: {
          user: 'goteifijeco-1184@yopmail.com',
          pass: '',
        },
      });
      const options = {
        from: 'goteifijeco-1184@yopmail.com',
        to: mailUser,
        subject: `Hello Guys`,
        text: `Kamu mendapatkan undangan untuk bergabung dalam event kami`,
      };

      transporter.sendMail(options, function (err, info) {
        if (err) {
          console.log(err);
          return;
        } else {
          console.log('sent: ' + info.response);
        }
      });
      res
        .status(200)
        .json({ message: `success send maiil to ${mailUser}`, mailUser });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RequestController;
