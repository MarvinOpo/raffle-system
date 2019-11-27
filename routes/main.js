var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/draw', function(req, res, next) {
  res.render('raffle');
});

/* GET home page. */
router.get('/entries', function(req, res, next) {
  res.render('entries');
});

module.exports = router;
