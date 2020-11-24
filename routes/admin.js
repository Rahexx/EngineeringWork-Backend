var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* GET home page. */
router.get('/', function (req, res, next) {
  const findUser = User.find().sort({
    login: -1,
  });

  findUser.exec((err, data) => {
    console.log(data);

    res.render('admin', { data });
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
      res.json({ isUpdate: true });
    });
  });
});

router.get('/delete/:id', function (req, res, next) {
  const findUser = User.findByIdAndDelete({ _id: req.params.id });

  findUser.exec((err, data) => {
    res.json(data);
  });
});

module.exports = router;
