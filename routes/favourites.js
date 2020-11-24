var express = require('express');
var router = express.Router();
const Room = require('../models/room');

router.get('/', function (req, res) {
  const findRoom = Room.find().sort({
    dateAdd: -1,
  });

  findRoom.exec((err, data) => {
    res.render('favourites', { role: req.session.role, data });
  });
});

module.exports = router;
