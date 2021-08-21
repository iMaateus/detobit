const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        user: 
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            nickname: {
                type: String,
                required: true
            },
            photo: {
                type: String,
                required: true
            },
            streamer: {
                type: Boolean
            }
        },
        game: 
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            slug: {
                type: String,
                required: true
            }
        },
        opinion: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        likes: {
            type: Number,
            required: true
        },
        deslikes: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('reviews', reviewSchema)