var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* Security only for admin user */

router.all('*', (req, res, next) => {
  if (!req.session.role) {
    res.redirect('/logIn');

    return;
  }

  next();
});

router.get('/', function (req, res, next) {
  const findUser = User.find().sort({
    login: -1,
  });

  findUser.exec((err, data) => {
    res.render('searchUser', { role: req.session.role, data });
  });
});

module.exports = router;
