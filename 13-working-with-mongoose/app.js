const path = require('path');
const express = require('express');

const mongoose = require('mongoose');

const User = require('./models/user');

const app = express();

let user;

(async function () {
  app.set('view engine', 'pug');
  app.set('views', 'views');

  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(async (req, res, next) => {
    req.user = await User.findById("5cfeb4f2a5507435207fa2b0");

    next();
  });

  app.use('/products', require('./routes/product'));
  app.use('/cart', require('./routes/cart'));
  app.use('/order', require('./routes/order'));

  app.get('/', (req, res, next) => res.redirect('/products/'));

  app.use(require('./controllers/404'));

  connection = await mongoose.connect('mongodb+srv://admin:admin@m0-large.mongodb.net/nodejs-the-complete-guide?retryWrites=true&w=majority', { useNewUrlParser: true });

  //await new User({ name: 'Max', email: 'max@test.com', cart: { products: [] } }).save();

  app.listen(3000);

}());