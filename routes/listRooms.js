var express = require('express');
var router = express.Router();
const Room = require('../models/room');

router.get('/', function (req, res, next) {
  //   const findRoom = Room.find()
  //     .sort({
  //       dateAdd: -1,
  //     })
  //     .limit(4);

  //   findRoom.exec((err, data) => {
  //     res.render('index', { role: req.session.role, data });
  //   });
  res.render('listRooms');
});

module.exports = router;
