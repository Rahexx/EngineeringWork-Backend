var express = require('express');
var router = express.Router();
const Message = require('../models/messages');

router.all('*', (req, res, next) => {
  if (!req.session.role) {
    res.redirect('/logIn');

    return;
  }

  next();
});

router.get('/', function (req, res, next) {
  res.render('messages', { role: req.session.role });
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
