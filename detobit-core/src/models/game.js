const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        gameId: {
            type: Number,
            required: true
        },
        popularNames: {
            type: [String]
        },
        slug: {
            type: String,
            required: true
        },
        cover: {
            type: String,
            required: true
        },
        released: {
            type: Date,
            required: true
        },
        summary: {
            type: String,
            required: true
        },
        storyline: {
            type: String
        },
        rating: {
            type: Number,
            required: true
        },
        genres: [
            {
                name: {
                    type: String,
                    required: true
                },
                slug: {
                    type: String,
                    required: true
                },
            }
        ],
        platforms: [
            {
                name: {
                    type: String,
                    required: true
                },
                slug: {
                    type: String,
                    required: true
                },
            }
        ],
        screenshots: [
            {
                animated: {
                    type: Boolean,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                },
            }
        ],
        videos: {
            type: [String]
        },
        stats: 
        {
            wantPlay: {
                type: Number,
            },
            playing: {
                type: Number,
            },
            closed: {
                type: Number,
            },
            abandoned: {
                type: Number,
            }
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('games', gameSchema)