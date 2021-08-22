const mongoose = require('mongoose');

const progressionSchema = new mongoose.Schema(
    {
        user:
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            }
        },
        game:
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            }
        },
        status: {
            type: String,
            enum: ['wantPlay', 'playing', 'closed', 'abandoned'],
            required: true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('progressions', progressionSchema)