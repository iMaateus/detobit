'use strict'

const jwt = require('jsonwebtoken')

exports.createToken = function (user) {
    return jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: '7d'
        })
}