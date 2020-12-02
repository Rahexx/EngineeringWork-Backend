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
  const { page = 1, limit = 2, isJson = false } = req.query;

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
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({
        dateAdd: -1,
      });

    findRoom.exec(async (err, data) => {
      const count = await Room.countDocuments({
        _id: { $in: idRooms },
      });

      if (isJson) {
        res.json({
          data,
          totalPages: Math.ceil(count / limit),
        });
      } else {
        res.render('favourites', {
          role: req.session.role,
          data,
          totalPages: Math.ceil(count / limit),
          currentPage: page,
        });
      }
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
