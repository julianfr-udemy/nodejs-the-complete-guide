const router = require('express').Router();
const controller = require('../controllers/product');
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
  .post(isAuth, controller.put);

module.exports = router;