const router = require('express').Router();
const controller = require('../controllers/cart');
const isAuth = require('../middleware/is-auth');

router.route('/').get(isAuth, controller.get);

router.route('/:product').post(isAuth, controller.post);

router.route('/delete/:product')
  .delete(isAuth, controller.delete)
  .post(isAuth, controller.delete);

module.exports = router;