var express = require('express');
var router = express.Router();
const post = require('../models/postSchema')
/* GET home page. */
router.get('/', async function(req, res, next) {
  let posts = await post.find()
  res.render('index', { title: 'Members Blog', user: req.user, posts: posts });
});



module.exports = router;
