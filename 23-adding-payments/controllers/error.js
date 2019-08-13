module.exports.view404 = (req, res, next) => {
  res.status(404).render('404', { title: "Page Not Found!", isLoggedIn: req.session.user });
};

module.exports.view500 = (req, res, next) => {
  res.status(500).render('500', { title: "Error!", isLoggedIn: req.session.user });
};