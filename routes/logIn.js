var express = require('express');
var router = express.Router();
const User = require('../models/user');

router.get('/', function (req, res) {
  res.render('logIn');
});

router.get('/checkLogin/:login', (req, res) => {
  const findUser = User.findOne({
    login: req.params.login,
  });

  findUser.exec((err, data) => {
    console.log(data);
    res.json(data);
  });
});

router.post('/', function (req, res) {
  const loginForm = req.body.login;
  const passwordForm = req.body.password;

  if (loginForm.length > 0) {
    const findUser = User.findOne({ login: loginForm });

    findUser.exec((err, data) => {
      if (data.login == loginForm && data.password == passwordForm) {
        req.session.role = data.role;
        req.session.id = data._id;
        req.session.login = data.login;
        res.json({ isLog: true });
      } else {
        res.json({ isLog: false });
      }
    });
  } else {
    res.json({ isLog: false });
  }
});

module.exports = router;
