var express = require('express');
var router = express.Router();
const Favourite = require('../models/favourites');

router.get('/', function (req, res) {
  res.render('favourites');
});

module.exports = router;
