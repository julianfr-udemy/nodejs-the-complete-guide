const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoSession = require('connect-mongodb-session')(session);
const errorController = require('./controllers/error');

const MONGO_URI = 'mongodb+srv://admin:admin@m0-large.mongodb.net/nodejs-the-complete-guide?w=majority'

const User = require('./models/user');

const app = express();
const store = new MongoSession({ uri: MONGO_URI, collection: 'sessions' });

(async function () {
  app.set('view engine', 'pug');
  app.set('views', 'views');

  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(session({ secret: 'shh', resave: false, saveUninitialized: false, store }));
  app.use(require('csurf')());
  app.use(require('connect-flash')());

  app.use(async (req, res, next) => {
    try {
      if (req.session.user) {
        const user = await User.findById(req.session.user._id);

        if (user) req.user = user;
      }
      next();
    } catch (error) {
      throw new Error(error);
    }
  });

  app.use((req, res, next) => {
    res.locals.csrf = req.csrfToken();
    res.locals.isLoggedIn = req.user != null;
    next();
  });

  app.use('/products', require('./routes/product'));
  app.use('/cart', require('./routes/cart'));
  app.use('/order', require('./routes/order'));
  app.use('/auth', require('./routes/auth'));
  app.use('/500', errorController.view500);

  app.get('/', (req, res, next) => res.redirect('/products/'));

  app.use(errorController.view404);

  app.use((error, req, res, next) => {
    res.redirect("/500");
  })

  connection = await mongoose.connect(MONGO_URI, { useNewUrlParser: true });

  app.listen(3000);
}());