var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const message = "hello";
  res.send(message);
});

router.get('/login', function(req, res, next) { 
  const message = "Login or Sign up"
  res.send(message);
});

module.exports = router;
