const { usuarios } = require('../model/usuarios');

const router = require('express').Router();

router.get('/users', (req, res, next) => {
  res.render('users', { usuarios });
});

router.post('/users', (req, res, next) => {
  usuarios.push(req.body.name);
  res.redirect('/users')
});

module.exports = router;