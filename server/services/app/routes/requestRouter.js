const RequestController = require('../controllers/requestController');

const router = require('express').Router();
router.get('/sendMail/:id', RequestController.requestEmail);
module.exports = router;
