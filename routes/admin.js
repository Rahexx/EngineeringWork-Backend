var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* GET home page. */
router.get('/', function (req, res, next) {
  const findUser = User.find().sort({
    login: -1,
  });

  findUser.exec((err, data) => {
    console.log(data);

    res.render('admin', { data });
  });
});

module.exports = router;
