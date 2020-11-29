var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Fault = require('../models/faults');
const Room = require('../models/room');

router.all('*', (req, res, next) => {
  if (!req.session.role) {
    res.redirect('/logIn');

    return;
  }

  next();
});

router.get('/', function (req, res) {
  const findUser = User.findOne({
    _id: req.session.id,
  });

  findUser.exec((err, data) => {
    const newDate = new Date(data.date);
    const formatDate = newDate.toLocaleDateString('en-US');
    res.render('account', { data, formatDate });
  });
});

router.get('/fault', function (req, res) {
  const findRoom = Room.find({
    $or: [{ tenantId: req.session.id }, { ownerId: req.session.id }],
  });

  findRoom.exec((err, data) => {
    if (data.length > 0) {
      const roomIds = [];

      data.forEach((item) => {
        roomIds.push(item._id);
      });

      const findFault = Fault.find({
        roomId: { $in: roomIds },
      });

      findFault.exec((err, data) => {
        res.json(data);
      });
    } else {
      res.json(data);
    }
  });
});

router.post('/fault/:id', function (req, res) {
  const findFault = Fault.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: { status: req.body.status } },
    (err, data) => {
      if (err) {
        console.log('Sth wrong');
      }
    },
  );
});

module.exports = router;
