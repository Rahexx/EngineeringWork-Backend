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
  const { page = 1, limit = 3, isJson = false } = req.query;

  const findUser = User.find({
    _id: { $nin: [req.session.id] },
  })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({
      login: -1,
    });

  findUser.exec(async (err, data) => {
    const count = await User.countDocuments();

    if (isJson === false) {
      res.render('searchUser', {
        role: req.session.role,
        data,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } else {
      res.json({
        role: req.session.role,
        data,
        totalPages: Math.ceil(count / limit),
      });
    }
  });
});

router.get('/searchLogin', function (req, res) {
  const { page = 1, limit = 3, isJson = false, login } = req.query;

  const findUser = User.find({
    _id: { $nin: [req.session.id] },
    login: { $regex: `^${login}`, $options: 'i' },
  })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({
      login: -1,
    });

  findUser.exec(async (err, data) => {
    const count = await User.countDocuments({
      _id: { $nin: [req.session.id] },
      login: { $regex: `^${login}`, $options: 'i' },
    });

    res.json({ data, totalPages: Math.ceil(count / limit) });
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
