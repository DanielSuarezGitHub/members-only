var express = require('express');
var router = express.Router();
const userController = require('../controllers/usercontroller.js');
const passport = require('passport');

router.get('/signup', userController.signup_get )

router.post('/signup', userController.signup_post)

router.get('/login', userController.login_get)

router.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
module.exports = router;
