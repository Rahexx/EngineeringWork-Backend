var express = require('express');
var router = express.Router();
const Room = require('../models/room');

router.get('/', function (req, res) {
  const findRoom = Room.find()
    .sort({
      dateAdd: -1,
    })
    .limit(4);

  findRoom.exec((err, data) => {
    res.render('index', { role: req.session.role, data });
  });
});

router.get('/logOut', function (req, res) {
  req.session = null;
  res.redirect('/');
});

module.exports = router;
