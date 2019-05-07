const path = require('path');
const dirpath = require('../util/dirpath');

const router = require('express').Router();

router.get("/", (req, res, next) => {
  console.log("/");
  res.sendFile(path.join(dirpath, 'views', 'home.html'));
});

router.get("/users", (req, res, next) => {
  console.log("/users");
  res.sendFile(path.join(dirpath, 'views', 'users.html'));
});

module.exports = router;