const { body } = require('express-validator');

module.exports.post = [
  body("title")
    .isAlphanumeric()
    .isLength({ min: 3 })
    .trim(),

  body("price")
    .isFloat(),

  body("description")
    .trim()
    .isLength({ min: 5, max: 400 }),
];

module.exports.put = [
  body("title")
    .isAlphanumeric()
    .isLength({ min: 3 })
    .trim(),

  body("price")
    .isFloat(),

  body("description")
    .trim()
    .isLength({ min: 5, max: 400 }),
];