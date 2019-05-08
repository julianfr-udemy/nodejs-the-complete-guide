const productController = require('../controllers/products');
const router = require('express').Router();

router.get('/', productController.getProducts);

module.exports = router;