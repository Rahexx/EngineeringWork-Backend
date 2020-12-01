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
  const findUser = User.find({
    _id: { $nin: [req.session.id] },
  }).sort({
    login: -1,
  });

  findUser.exec((err, data) => {
    res.render('searchUser', { role: req.session.role, data });
  });
});

router.get('/:login', function (req, res, next) {
  const findUser = User.find({
    login: { $regex: `^${req.params.login}`, $options: 'i' },
  }).sort({
    login: -1,
  });

  findUser.exec((err, data) => {
    res.json(data);
  });
});

router.get('/profile/:id', function (req, res, next) {
  const findUser = User.findOne({
    _id: req.params.id,
  });

  findUser.exec((err, data) => {
    res.render('profile', { role: req.session.role, data });
  });
});

module.exports = router;
