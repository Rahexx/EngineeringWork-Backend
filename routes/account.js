var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Fault = require('../models/faults');
const Room = require('../models/room');
const Settlement = require('../models/settlement');

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

router.post('/addFault/', function (req, res) {
  const findUser = User.findOne({
    login: req.body.login,
  });

  findUser.exec((err, data) => {
    const idUser = data._id;
    const findRoom = Room.findOne({
      $and: [
        { tenantId: { $in: [req.session.id, idUser] } },
        { ownerId: { $in: [req.session.id, idUser] } },
      ],
    });

    findRoom.exec((err, data) => {
      const searchRoomId = data._id;
      const newFault = new Fault({
        roomId: searchRoomId,
        description: req.body.description,
      });

      newFault.save();
    });
  });
});

router.get('/settlement', function (req, res) {
  const findSettlement = Settlement.find({
    $or: [
      { tenantLogin: req.session.login },
      { ownerLogin: req.session.login },
    ],
  });

  findSettlement.exec((err, data) => {
    res.json(data);
  });
});

router.get('/settlement/delete/:id', function (req, res) {
  const idSettlement = req.params.id;

  const findSettlement = Settlement.findByIdAndDelete(idSettlement, (err) => {
    if (err) {
      console.log(err);
    }
  });
});

router.post('/addSettlement/', function (req, res) {
  const newSettlement = new Settlement({
    price: req.body.cost,
    date: req.body.date,
    tenantLogin: req.body.login,
    ownerLogin: req.session.login,
  });

  newSettlement.save();
});

module.exports = router;
