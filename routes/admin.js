var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('admin');
  //   res.render('admin');

  //   if (req.session.role) {
  //     console.log('Wywołałem się');
  //     res.render('admin', { role: req.session.role });
  //   } else {
  //     res.render('admin');
  //   }
});

module.exports = router;
