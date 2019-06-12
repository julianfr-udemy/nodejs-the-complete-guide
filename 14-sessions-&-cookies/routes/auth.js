const express = require('express');
const router = express.Router();

const controller = require('../controllers/auth');

router.route('/login')
  .get(controller.loginView)
  .post(controller.loginPost);

router.route('/logout')
  .post(controller.logoutPost);

module.exports = router;