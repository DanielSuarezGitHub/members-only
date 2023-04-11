const { body, validationResult } = require("express-validator")
const Post = require('../models/postSchema')

exports.createPost_get = (req, res, next) => {
    res.render('createpost')
}

exports.createPost_post = [
    body('title').isString(),
    body('content').isString(),
    async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.render('createpost', {
                'errors': errors.array()
            })
        } else {
            const author = res.locals.currentUser.username
            const date = new Date()
            const title = req.body.title
            const content = req.body.content

            const newPost = new Post({
               author: author,
               dateCreated: date,
               title: title,
               content: content, 
            })
            await newPost.save()
            .then(() => {res.redirect('/')})
            .catch((error) => {
                console.error(error)
                next(error)
            })
        }
    }
]

exports.readPost_get = async (req, res, next) => {
    const post = await Post.findById(req.params.id)
    res.render('postview', {post: post})
}