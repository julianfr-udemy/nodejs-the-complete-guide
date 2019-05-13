const fs = require('fs');
const dirpath = require('../util/path');
const path = require('path');

const CART_FILE_PATH = path.join(dirpath, 'data', 'cart.json');

function readCartFile() {
  const cart = fs.readFileSync(CART_FILE_PATH);

  return cart.length ? JSON.parse(cart) : { products: [], price: 0 };
}

function update(operation) {
  const cart = readCartFile();

  operation(cart);

  fs.writeFileSync(CART_FILE_PATH, JSON.stringify(cart));
}

function add(product) {
  if (product) update(cart => {
    let productInCart = cart.products.find(p => p.id === product.id);

    if (productInCart) productInCart.quantity += 1;
    else cart.products.push({ id: product.id, quantity: 1, price: +product.price });

    cart.price += +product.price;
  });
}

function del(id) {
  update(cart => {
    const products = cart.products;

    if (!products.length) return;

    const index = products.findIndex(p => p.id === id);
    const product = products[index];
    const price = product.price * product.quantity;

    products.splice(index, 1);
    cart.price -= price;
  });
}

module.exports = { add, delete: del, get: readCartFile };