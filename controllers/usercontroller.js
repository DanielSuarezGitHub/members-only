const { body, validationResult } = require("express-validator")
const User = require('../models/userSchema')
const bcrypt = require('bcryptjs')
const passport = require('passport')
exports.signup_get = (req, res) => {
    res.render('signup')
}

exports.signup_post = [
    body('username').isLength({ min: 3}).withMessage('name is too short'),
    body('password').isLength({ min: 6}).withMessage('password is too short 6+ characters'),
    async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.render('signup', {
                'errors': errors.array()
            })
        } else {
            const username = req.body.username;
            const password = req.body.password;

            // Check if username already exists in the database
            const user = await User.findOne({username: username}).exec();
            if (user) {
                res.render('signup', {
                    errors: [{msg: 'Username already exists'}]
                })
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new User({
                    username: username,
                    password: hashedPassword
                })

                await newUser.save()
                .then(() => {
                    res.redirect('/login')
                })
                .catch((error) => {
                    console.error(error);
                    next(error);
                });
            }
        }
    }
]

exports.login_get = (req, res, next) => {
    res.render('login')
}

