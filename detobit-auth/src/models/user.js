const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            validate: {
                validator(email) {
                    return validator.isEmail(email);
                },
            },
        },
        photo: {
            type: String,
            required: false,
            validate: {
                validator(photo) {
                    return validator.isUrl(photo);
                },
            },
        },
        password: String,
        biography: String
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('users', userSchema)