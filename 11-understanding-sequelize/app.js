const path = require('path');
const express = require('express');

const db = require('./services/database');

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

(async function () {
  app.set('view engine', 'pug');
  app.set('views', 'views');

  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(async (req, res, next) => {
    try {
      const user = await User.findByPk(1);

      req.user = user;

      next();
    } catch (error) {
      console.log(error);
    }
  })

  app.use('/products', require('./routes/product'));
  app.use('/cart', require('./routes/cart'));
  app.use('/order', require('./routes/order'));

  app.get('/', (req, res, next) => res.redirect('/products/'));

  app.use(require('./controllers/404'));

  Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
  User.hasMany(Product);
  User.hasOne(Cart);
  Cart.belongsTo(User);
  Cart.belongsToMany(Product, { through: CartItem });
  Product.belongsToMany(Cart, { through: CartItem });
  Order.belongsToMany(Product, { through: OrderItem });
  OrderItem.belongsToMany(Product, { through: OrderItem });
  Order.belongsTo(User);
  User.hasMany(Order);

  try {
    await db.sync({ force: false });

    let user = await User.findByPk(1);

    if (!user) {
      user = await User.create({ name: 'Max', email: 'test@test.com' });
      await user.createCart();
    }

    app.listen(3000);
  } catch (error) {
    console.log(error);
  }
}());