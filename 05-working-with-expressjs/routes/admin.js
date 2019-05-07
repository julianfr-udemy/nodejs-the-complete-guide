const path = require('path');
const root = require('../util/path');

const router = require('express').Router();

router.get('/add-product', (req, res, next) => {
  console.log('In another middleware');
  res.sendFile(path.join(root, 'views', 'add-product.html'));
});

router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;