const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const User = require('../models/user');

const transporter = require('nodemailer').createTransport(require('nodemailer-sendgrid-transport')({
  auth: { api_key: process.env.sendgridApiKey }
}));

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

module.exports.resetView = (req, res, next) => {
  res.render("auth/reset", { title: 'Signup', path: '/auth/reset', error: req.flash('error') });
};

module.exports.resetPost = async (req, res, next) => {
  try {
    const token = crypto.randomBytes(32).toString('hex');

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      user.reset = { token, expiration: Date.now() + 3600000 };

      await user.save();

      res.redirect('/');

      await transporter.sendMail({
        to: user.email,
        from: 'shop@node-complete.com',
        subject: 'Password reset',
        html: `
      <h1>Password Reset</h1>
      <p>You requested a password reset</p>
      <p>Click this <a href="http://127.0.0.1:3000/auth/reset/${token}">link</a> to set a new password.</p>`
      });
    } else {
      req.flash('error', 'Email not found');

      res.redirect('/auth/reset');
    }
  } catch (error) {
    console.error(error);
  }
}

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

      await transporter.sendMail({
        to: email,
        from: 'shop@node-complete.com',
        subject: 'Signup succeded!',
        html: '<h1>You successfully signed up!</h1>'
      });
    }

    return res.redirect('/');
  } catch (error) {
    console.log(error);
  }
};

module.exports.changePasswordView = async (req, res, next) => {
  const token = req.params.token;

  const user = await User.findOne({ "reset.token": token });

  if (!user || user.reset.expiration < Date.now()) return res.redirect('/auth/signup');

  res.render("auth/change-password", { title: 'Change Password', path: '/auth/change-password', error: req.flash('error'), user: user._id.toString(), token });
}

module.exports.changePasswordPost = async (req, res, next) => {
  try {
    const password = req.body.password;
    const id = req.body.user;
    const token = req.body.token;

    const user = await User.findOne({ _id: id, "reset.token": token });

    if (!user || user.reset.expiration < Date.now()) return res.redirect('/auth/signup');

    user.password = bcrypt.hashSync(password, 12);
    user.reset = { token: undefined, expiration: undefined };

    await user.save();

    return res.redirect('/auth/signup')
  } catch (error) {
    console.error(error);
  }
}