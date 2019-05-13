const fs = require('fs');
const dirpath = require('../util/path');
const path = require('path');
const Cart = require('./cart');

const PRODUCTS_FILE_PATH = path.join(dirpath, 'data', 'products.json');

function readProductsFromFile() {
  const products = fs.readFileSync(PRODUCTS_FILE_PATH);

  return products.length ? JSON.parse(products) : [];
}

function updateProducts(update) {
  const products = readProductsFromFile();

  update(products);

  fs.writeFileSync(PRODUCTS_FILE_PATH, JSON.stringify(products), (error) => console.log(error));
}

module.exports = class Product {
  constructor({ id, title, image, description, price }) {
    Object.assign(this, { id, title, image, description, price: +price });
  }

  save() {
    updateProducts(products => {
      if (this.id) {
        const product = products.find(product => product.id === this.id);

        Object.assign(product, this);
      } else {
        this.id = Math.random().toString();

        products.push(this);
      }
    });
  }

  static delete(id) {
    updateProducts(products => products.splice(products.findIndex(product => product.id === id), 1));
    Cart.delete(id);
  }

  static fetchAll() {
    return readProductsFromFile();
  }

  static findById(id) {
    return readProductsFromFile().find(product => product.id === id);
  }
};