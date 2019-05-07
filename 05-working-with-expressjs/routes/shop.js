const path = require('path');
const root = require('../util/path');
const router = require('express').Router();

router.get('/', (req, res, next) => {
  console.log('In another middleware');
  res.sendFile(path.join(root, 'views', 'shop.html'));
});

module.exports = router;

