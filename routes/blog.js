var express = require('express');
var router = express.Router();
const blogController = require("../controllers/blogcontroller")

function isAuthy(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}

router.get('/posts/:id', [isAuthy, blogController.readPost_get])
router.get('/createpost', [isAuthy, blogController.createPost_get])
router.post('/createpost', blogController.createPost_post)
module.exports = router;
