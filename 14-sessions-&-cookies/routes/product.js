const router = require('express').Router();
const controller = require('../controllers/product')

router.route('/add')
  .get(controller.getAdd)

router.route('/edit/:id')
  .get(controller.getEdit)

router.route('/delete/:id')
  .post(controller.delete)

router.route('/admin')
  .get(controller.getAdmin);

// router.route('/orders')
//   .get(controller.getOrders);

router.route('/')
  .post(controller.post)
  .get(controller.get);

router.route('/:id')
  .get(controller.getOne)
  .post(controller.put);

module.exports = router;