var express = require('express');
var router = express.Router();
const Room = require('../models/room');

router.get('/', function (req, res, next) {
  const findRoom = Room.find().sort({
    dateAdd: -1,
  });

  findRoom.exec((err, data) => {
    res.render('listRooms', { role: req.session.role, data });
  });
});

router.get('/:id', function (req, res, next) {
  const findRoom = Room.findOne({ _id: req.params.id });

  findRoom.exec((err, data) => {
    res.render('room', { role: req.session.role, data });
  });
});

module.exports = router;
