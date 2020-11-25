var express = require('express');
var router = express.Router();
const Favourite = require('../models/favourites');
const Room = require('../models/room');

router.all('*', (req, res, next) => {
  if (!req.session.role) {
    res.redirect('/logIn');

    return;
  }

  next();
});

router.get('/', function (req, res) {
  const findFavourite = Favourite.find({
    userId: req.session.id,
  });

  findFavourite.exec((err, data) => {
    const idRooms = [];

    for (let i = 0; i < data.length; i++) {
      idRooms.push(data[i].roomId);
    }

    const findRoom = Room.find({
      _id: { $in: idRooms },
    }).sort({
      dateAdd: -1,
    });

    findRoom.exec((err, data) => {
      res.render('favourites', { role: req.session.role, data });
    });
  });
});

router.get('/:id', function (req, res) {
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

module.exports = router;
