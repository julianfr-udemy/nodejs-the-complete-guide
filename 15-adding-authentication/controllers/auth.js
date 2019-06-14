const bcrypt = require('bcryptjs');

const User = require('../models/user');

module.exports.loginView = (req, res, next) => {
  try {
    res.render('auth/login', { title: 'Login', path: '/auth/login', error: req.flash('error') });
  } catch (error) {
    console.log(error);
  }
};

module.exports.signupView = (req, res, next) => {
  try {
    res.render('auth/signup', { title: 'Signup', path: '/auth/signup', error: req.flash('error') });
  } catch (error) {
    console.log(error);
  }
};

module.exports.loginPost = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const match = await bcrypt.compare(req.body.password, user.password);

      if (match) {
        req.session.user = user;

        await req.session.save();

        return res.redirect('/');
      }
    }
    req.flash("error", "Invalid email or password.");

    return res.redirect('/auth/login');
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

module.exports.signupPost = async (req, res, next) => {
  try {
    const { email, confirmPassword } = { ...req.body };

    const user = await User.findOne({ email });

    if (user) {
      req.flash("error", "Email already used.");

      return res.redirect('/auth/signup');
    } else {
      const password = await bcrypt.hash(req.body.password, 12);

      await new User({ email, password, cart: { items: [] } }).save();
    }
    return res.redirect('/');
  } catch (error) {
    console.log(error);
  }
};