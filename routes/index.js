var express = require('express');
var router = express.Router();

var Order = require('../models/order')

/* GET home page. */
router.get('/', function(req, res, next) {
  Order.find({}).exec(function (err, orders) {
  if (err) return next(err);
  res.render('index', { products: orders });
  });
});

module.exports = router;
