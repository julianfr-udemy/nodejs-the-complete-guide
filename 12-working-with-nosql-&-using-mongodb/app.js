const path = require('path');
const express = require('express');

const database = require('./services/database');
const User = require('./models/user');

const app = express();

let user;

(async function () {
  app.set('view engine', 'pug');
  app.set('views', 'views');

  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(async (req, res, next) => {
    req.user = new User({ ...user });
    next();
  });

  app.use('/products', require('./routes/product'));
  app.use('/cart', require('./routes/cart'));
  app.use('/order', require('./routes/order'));

  app.get('/', (req, res, next) => res.redirect('/products/'));

  app.use(require('./controllers/404'));

  await database.connect();

  user = await User.findById("5cf97b32c86dae1de8a9f860");

  app.listen(3000);

}());