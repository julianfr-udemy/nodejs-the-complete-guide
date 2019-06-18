const router = require('express').Router();
const controller = require('../controllers/order');
const isAuth = require('../middleware/is-auth');

router.route('/')
  .get(isAuth, controller.get)
  .post(isAuth, controller.post);



module.exports = router;