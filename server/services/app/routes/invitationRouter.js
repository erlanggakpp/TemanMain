const InvitationController = require('../controllers/invitationController');

const router = require('express').Router();

router.get('/sendMail/:id', InvitationController.sendMailInvitation);
module.exports = router;
