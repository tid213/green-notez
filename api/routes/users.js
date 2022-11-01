var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/userController');

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("API is working properly");
});
router.get('/login', user_controller.login);

module.exports = router;
