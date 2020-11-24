var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.role) {
    console.log('Wywołałem się');
    res.render('index', { role: req.session.role });
  } else {
    res.render('index');
  }
});

router.get('/logOut', function (req, res, next) {
  req.session = null;
  res.redirect('/');
});

module.exports = router;
