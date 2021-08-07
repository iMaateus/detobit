const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        firstname: String,
        lastname: String,
        email: String,
        password: String,
        photo: String,
        biography: String,
        createdAt: Date,
        updatedAt: Date
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('users', userSchema)