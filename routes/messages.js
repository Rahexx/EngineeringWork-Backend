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

router.get('/', function (req, res, next) {
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
      });

      findUser.exec((err, data) => {
        data.forEach((item) => {
          dataLogin.push(item.login);
        });

        res.render('messages', {
          role: req.session.role,
          loginUser: req.session.login,
          data,
          logins: dataLogin,
        });
      });
    }
  });
});

router.get('/:id', function (req, res, next) {
  console.log(req.params.id);

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

module.exports = router;
