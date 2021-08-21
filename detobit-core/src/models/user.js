const mongoose = require('mongoose');

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
            required: true
        },
        photo: {
            type: String,
            required: false
        },
        password: String,
        biography: String
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('users', userSchema)