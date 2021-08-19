const Review = require('../models/review');
const mongoRepository = require('../repository/mongo.repository.js');

exports.findReviews = async function (options) {
    let filter = {};

    return await mongoRepository.findMany(Review, filter, options);
}