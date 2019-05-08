const router = require('express').Router();
const productController = require('../controllers/products')

router.route('/add-product')
  .get(productController.getAddProduct)
  .post(productController.postAddProduct);

module.exports = router;