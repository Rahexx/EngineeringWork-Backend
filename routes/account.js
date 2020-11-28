var express = require('express');
var router = express.Router();
const User = require('../models/user');

router.all('*', (req, res, next) => {
  if (!req.session.role) {
    res.redirect('/logIn');

    return;
  }

  next();
});

router.get('/', function (req, res) {
  const findUser = User.findOne({
    _id: req.session.id,
  });

  findUser.exec((err, data) => {
    const newDate = new Date(data.date);
    const formatDate = newDate.toLocaleDateString('en-US');
    res.render('account', { data, formatDate });
  });
});

module.exports = router;
