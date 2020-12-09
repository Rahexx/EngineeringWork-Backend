var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.get('/', function (req, res) {
  res.render('logIn');
});

router.get('/checkLogin/:login', (req, res) => {
  const findUser = User.findOne({
    login: req.params.login,
    isArchived: false,
  });

  findUser.exec((err, data) => {
    res.json(data);
  });
});

router.post('/', function (req, res) {
  const loginForm = req.body.login;
  const passwordForm = req.body.password;

  if (loginForm.length > 0) {
    const findUser = User.findOne({ login: loginForm, isArchived: false });

    findUser.exec((err, data) => {
      if (data === null) {
        res.json({ isLog: false });
      } else {
        bcrypt.compare(passwordForm, data.password, function (err, match) {
          if (match) {
            if (data.login == loginForm) {
              req.session.role = data.role;
              req.session.id = data._id;
              req.session.login = data.login;
              res.json({ isLog: true });
            } else {
              res.json({ isLog: false });
            }
          } else {
            console.log(err);
          }
        });
      }
    });
  } else {
    res.json({ isLog: false });
  }
});

module.exports = router;
