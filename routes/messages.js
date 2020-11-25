var express = require('express');
var router = express.Router();

router.all('*', (req, res, next) => {
  if (!req.session.role) {
    res.redirect('/logIn');

    return;
  }

  next();
});

router.get('/', function (req, res, next) {
  res.render('messages', { role: req.session.role });
});

module.exports = router;
