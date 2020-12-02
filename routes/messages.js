var express = require('express');
var router = express.Router();
const Message = require('../models/messages');
const User = require('../models/user');

router.all('*', (req, res, next) => {
  if (!req.session.role) {
    res.redirect('/logIn');

    return;
  }

  next();
});

router.get('/', (req, res) => {
  const { page = 1, limit = 1, isJson = false } = req.query;

  const findMessage = Message.find({
    $or: [{ idFrom: req.session.id }, { idTo: req.session.id }],
  });

  findMessage.exec((err, data) => {
    const dataId = [];
    const dataLogin = [];

    data.forEach((item) => {
      if (!dataId.includes(item.idFrom) && item.idFrom !== req.session.id) {
        dataId.push(item.idFrom);
      } else if (!dataId.includes(item.idTo) && item.idTo !== req.session.id) {
        dataId.push(item.idTo);
      }
    });

    if (dataId.length > 0) {
      const findUser = User.find({
        _id: { $in: dataId },
      })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      findUser.exec(async (err, data) => {
        const count = await User.countDocuments({
          _id: { $in: dataId },
        });

        data.forEach((item) => {
          dataLogin.push(item.login);
        });

        if (isJson === false) {
          res.render('messages', {
            role: req.session.role,
            loginUser: req.session.login,
            data,
            logins: dataLogin,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
          });
        } else {
          res.json({
            role: req.session.role,
            loginUser: req.session.login,
            data,
            logins: dataLogin,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
          });
        }
      });
    } else {
      res.render('messages', {
        role: req.session.role,
        loginUser: req.session.login,
        data,
        logins: dataLogin,
      });
    }
  });
});

router.get('/:id', function (req, res) {
  const findMessage = Message.find({
    idFrom: { $in: [req.params.id, req.session.id] },
    idTo: { $in: [req.params.id, req.session.id] },
  });

  findMessage.exec((err, data) => {
    if (data.length === 0) {
      const newChat = new Message({
        idFrom: req.session.id,
        idTo: req.params.id,
      });
      newChat.save();

      res.redirect('/messages');
    } else {
      res.redirect('/messages');
    }
  });
});

router.get('/getConversation/:login', function (req, res) {
  const loginUser = req.session.login;
  const otherUser = req.params.login;
  const idUsers = [];

  const findUser = User.find({ login: { $in: [loginUser, otherUser] } });

  findUser.exec((err, data) => {
    data.forEach((item) => {
      idUsers.push(item._id);
    });

    const findConversation = Message.find({
      $and: [{ idFrom: { $in: idUsers } }, { idTo: { $in: idUsers } }],
    });

    findConversation.exec((err, data) => {
      res.json(data);
    });
  });
});

module.exports = router;
