var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* Security only for admin user */

router.all('*', (req, res, next) => {
  if (!req.session.role && req.session.role !== 'admin') {
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
    res.render('admin', { role: req.session.role, data });
  });
});

router.get('/info/:id', function (req, res, next) {
  const findUser = User.findOne({ _id: req.params.id });

  findUser.exec((err, data) => {
    res.json(data);
  });
});

router.get('/edit/:id', function (req, res, next) {
  const findUser = User.findOne({ _id: req.params.id });

  findUser.exec((err, data) => {
    res.json(data);
  });
});

router.get('/delete/:id', function (req, res, next) {
  const findUser = User.findByIdAndDelete({ _id: req.params.id });

  findUser.exec((err, data) => {
    res.json(data);
  });
});

router.get('/search/:login', function (req, res, next) {
  const findUser = User.find({
    login: { $regex: `^${req.params.login}`, $options: 'i' },
  }).sort({
    login: -1,
  });

  findUser.exec((err, data) => {
    res.json(data);
  });
});

router.post('/update/:id', function (req, res, next) {
  User.findOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.json({ isUpdate: false });
    }

    data.name = req.body.name;
    data.surname = req.body.surname;
    data.email = req.body.email;
    data.phone = req.body.phone;
    data.login = req.body.login;

    data.save((err) => {
      res.json({
        isUpdate: true,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        login: req.body.login,
      });
    });
  });
});

module.exports = router;
