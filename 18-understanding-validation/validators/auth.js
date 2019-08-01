const { body } = require('express-validator');
const User = require('../models/user');

const invalidLoginMessage = "Invalid email or password."

module.exports.signUpPost = [
  body("email")
    .isEmail().withMessage('Please enter a valid email.').normalizeEmail()
    .custom((email, { req }) => { if (email === 'test@test.com') throw new Error('This email address is forbidden.'); else return true; })
    .custom(async (email, { req }) => { if (await User.findOne({ email })) throw new Error("Email already used."); else return true; }),

  body('password', 'Please enter a password with only numbers and letters and at least 5 characters.')
    .isLength({ min: 5 })
    .isAlphanumeric(),

  body("confirmPassword")
    .custom((value, { req }) => { if (value !== req.body.password) throw new Error('Passwords have to match!'); else return true; }),
];

module.exports.loginPost = [
  body("email", invalidLoginMessage)
    .isEmail().withMessage().normalizeEmail()
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email: email });

      if (user) {
        req.loggingUser = user;
        return true;
      } else throw new Error;
    }),

  body('password', invalidLoginMessage)
    .isAlphanumeric(),
];
