const router = require('express').Router();
const controller = require('../controllers/product')

router.route('/')
  .get(controller.get);

router.route('/add')
  .get(controller.getAdd)
  .post(controller.postAdd);

router.route('/list')
  .get(controller.getList);

router.route('/admin')
  .get(controller.getAdmin);

router.route('/cart')
  .get(controller.getCart);

router.route('/orders')
  .get(controller.getOrders);

module.exports = router;