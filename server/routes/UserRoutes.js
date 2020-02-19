const userController = require('../controllers/userController.js');
const express = require('express');
const router = express.Router();

router.route('/').get(userController.hello);

module.exports = router;
