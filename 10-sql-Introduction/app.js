const path = require('path');
const express = require('express');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/products', require('./routes/product'));
app.use('/cart', require('./routes/cart'));

app.get('/', (req, res, next) => res.redirect('/products/list'));

app.use(require('./controllers/404'));

app.listen(3000);