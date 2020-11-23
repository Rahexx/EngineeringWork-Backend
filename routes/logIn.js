var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('logIn');
});

router.post('/', function (req, res, next) {
  console.log(req.body);
  const loginForm = req.body.login;
  const passwordForm = req.body.password;

  if (loginForm.length > 0) {
    const findUser = User.findOne({ login: loginForm });

    findUser.exec((err, data) => {
      if (data.login == loginForm && data.password == passwordForm) {
        req.session.role = data.role;
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
