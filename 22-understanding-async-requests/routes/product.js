const router = require('express').Router();
const controller = require('../controllers/product');
const validator = require('../validators/product');
const isAuth = require('../middleware/is-auth');

router.route('/add').get(isAuth, controller.getAdd);

router.route('/edit/:id').get(isAuth, controller.getEdit)

router.route('/delete/:id').post(isAuth, controller.delete)

router.route('/admin').get(isAuth, controller.getAdmin);

// router.route('/orders')
//   .get(controller.getOrders);

router.route('/')
  .post(isAuth, controller.post)
  .get(controller.get);

router.route('/:id')
  .get(controller.getOne)
  .delete(isAuth, controller.delete)
  .post(isAuth, validator.put, controller.put);

module.exports = router;