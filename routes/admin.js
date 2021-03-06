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

router.get('/', (req, res) => {
  const { page = 1, limit = 2, isJson = false } = req.query;

  const findUser = User.find({
    isArchived: false,
  })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({
      login: -1,
    });

  findUser.exec(async (err, data) => {
    const count = await User.countDocuments();

    if (isJson === false) {
      res.render('admin', {
        role: req.session.role,
        data,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } else {
      res.json({
        data,
        totalPages: Math.ceil(count / limit),
      });
    }
  });
});

router.get('/info/:id', function (req, res) {
  const findUser = User.findOne({ _id: req.params.id });

  findUser.exec((err, data) => {
    res.json(data);
  });
});

router.get('/edit/:id', function (req, res) {
  const findUser = User.findOne({ _id: req.params.id });

  findUser.exec((err, data) => {
    res.json(data);
  });
});

router.get('/delete/:id', function (req, res) {
  const findUser = User.findOneAndUpdate(
    { _id: req.params.id },
    {
      isArchived: true,
    },
  );

  findUser.exec((err, data) => {
    res.json(data);
  });
});

router.get('/searchUser', function (req, res) {
  const { page = 1, limit = 2, login } = req.query;

  const findUser = User.find({
    login: { $regex: `^${login}`, $options: 'i' },
    isArchived: false,
  })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({
      login: -1,
    });

  findUser.exec(async (err, data) => {
    const count = await User.countDocuments({
      login: { $regex: `^${login}`, $options: 'i' },
    });

    res.json({ data, totalPages: Math.ceil(count / limit) });
  });
});

router.post('/update/:id', function (req, res) {
  User.findOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.json({ isUpdate: false });
    }
    console.log(req.body);
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
