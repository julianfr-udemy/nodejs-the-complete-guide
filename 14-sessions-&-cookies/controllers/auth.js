const User = require('../models/user');

module.exports.loginView = (req, res, next) => {
  try {
    res.render('login', { title: 'Login', path: '/auth/login', isLoggedIn: req.user });
  } catch (error) {
    console.log(error);
  }
};

module.exports.loginPost = async (req, res, next) => {
  try {
    req.session.user = await User.findById("5cfeb4f2a5507435207fa2b0");

    await req.session.save();

    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
};

module.exports.logoutPost = async (req, res, next) => {
  try {
    await req.session.destroy();

    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
};