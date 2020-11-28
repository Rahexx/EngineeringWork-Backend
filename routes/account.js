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
  const findUser = User.find({
    _id: req.session.id,
  });

  findUser.exec((err, data) => {
    console.log(data);
    res.render('account', { data });
  });
});

module.exports = router;
