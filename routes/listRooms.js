var express = require('express');
var router = express.Router();
const Room = require('../models/room');
const Favourite = require('../models/favourites');

router.get('/', function (req, res) {
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

router.get('/:id', function (req, res) {
  const findRoom = Room.findOne({ _id: req.params.id });

  findRoom.exec((err, data) => {
    res.render('room', { role: req.session.role, data });
  });
});

router.get('/addFavourite/:id', function (req, res) {
  const newFavourite = new Favourite({
    roomId: req.params.id,
    userId: req.session.id,
  });
  newFavourite.save();
  res.json({ isAdd: true });
});

router.get('/deleteFavourite/:id', function (req, res) {
  console.log(req.params.id);
  console.log(req.session.id);

  const findFavourite = Favourite.deleteOne(
    {
      roomId: req.params.id,
      userId: req.session.id,
    },
    function (err) {
      if (err) return handleError(err);
    },
  );

  res.json({ isDelete: true });
});

router.get('/showAll/:json', function (req, res) {
  const findFavourites = Favourite.find({
    userId: req.session.id,
  });

  findFavourites.exec((err, data) => {
    res.json(data);
  });
});

module.exports = router;
