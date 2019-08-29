const feed = require('../controllers/feed');

const router = require("express").Router();

router.route("/posts")
  .get(feed.get)
  .post(feed.post);

module.exports = router;

