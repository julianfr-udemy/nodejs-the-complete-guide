const fs = require('fs');
const dirpath = require('../util/path');
const path = require('path');

const PRODUCTS_FILE_PATH = path.join(dirpath, 'data', 'products.json');

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    const products = Product.fetchAll();

    products.push(this);

    fs.writeFileSync(PRODUCTS_FILE_PATH, JSON.stringify(products), (error) => console.log(error));
  }

  static fetchAll() {
    let products = fs.readFileSync(PRODUCTS_FILE_PATH)

    return products.length ? JSON.parse(products) : [];
  }
};