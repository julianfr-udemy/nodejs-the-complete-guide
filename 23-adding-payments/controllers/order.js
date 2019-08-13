const fs = require('fs');
const path = require('path');
const PDF = require('pdfkit');

const Order = require('../models/order');

exports.get = async (req, res, next) => {
  try {
    const orders = await Order.find({ 'user._id': req.user._id });

    res.render('order/orders.pug', { title: 'My Cart', path: '/order', orders });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    next(error);
  }
}

exports.getInvoice = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) throw new Error("Order not found!");

    if (!order.user._id.equals(req.user._id)) throw new Error("Unauthorized");

    const fileName = new Date().valueOf() + ".pdf";
    const filePath = path.join('data', 'invoices', fileName);
    const pdf = new PDF();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline;filename=${fileName}`);

    pdf.pipe(fs.createWriteStream(filePath));
    pdf.pipe(res);

    pdf.fontSize(26).text("Invoice", { underline: true });
    pdf.text("-----------------------");
    pdf.fontSize(14);

    let total = 0;
    for (p of order.products) {
      total += p.quantity * p.product.price;
      pdf.text(`${p.product.title} x ${p.quantity} $${p.product.price}`);
    }
    pdf.fontSize(26).text("-----------------------");
    pdf.text(`Total Price $${total}`);

    pdf.end()
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    next(error);
  }
}

exports.post = async (req, res, next) => {
  try {
    await req.user.addOrder();

    res.redirect('/order');
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    next(error);
  }
}