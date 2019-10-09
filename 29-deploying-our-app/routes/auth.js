const express = require('express');

const router = express.Router();

const controller = require('../controllers/auth');
const validator = require('../validators/auth');

router.route('/login')
  .get(controller.loginView)
  .post(validator.loginPost, controller.loginPost);

router.route('/logout')
  .post(controller.logoutPost);

router.route('/signup')
  .get(controller.signupView)
  .post(validator.signUpPost, controller.signupPost);

router.route('/reset')
  .get(controller.resetView)
  .post(controller.resetPost);

router.route('/reset/:token').get(controller.changePasswordView);

router.route('/change-password').post(controller.changePasswordPost);

module.exports = router;