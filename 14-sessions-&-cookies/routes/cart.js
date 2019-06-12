const router = require('express').Router();
const controller = require('../controllers/cart')

router.route('/').get(controller.get);

router.route('/:product').post(controller.post);

router.route('/delete/:product')
  .delete(controller.delete)
  .post(controller.delete);

module.exports = router;