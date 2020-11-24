var express = require('express');
var router = express.Router();
const Room = require('../models/room');

router.get('/', function (req, res, next) {
  const { location } = req.query;
  const { priceFrom } = req.query;
  const { priceTo } = req.query;

  if (
    location !== undefined ||
    priceFrom !== undefined ||
    priceTo !== undefined
  ) {
    const findRoom = Room.find({
      location: { $regex: `^${location ? location : '[a-z]'}`, $options: 'i' },
      price: {
        $gte: priceFrom ? priceFrom : 0,
        $lte: priceTo ? priceTo : 10000,
      },
    }).sort({
      dateAdd: -1,
    });

    findRoom.exec((err, data) => {
      console.log(data);
      res.json(data);
    });
  } else {
    const findRoom = Room.find().sort({
      dateAdd: -1,
    });

    findRoom.exec((err, data) => {
      res.render('listRooms', { role: req.session.role, data });
    });
  }
});

router.get('/:id', function (req, res, next) {
  const findRoom = Room.findOne({ _id: req.params.id });

  findRoom.exec((err, data) => {
    res.render('room', { role: req.session.role, data });
  });
});

module.exports = router;
