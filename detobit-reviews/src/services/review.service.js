const Review = require('detobit-core/src/models/review');
const mongoRepository = require('detobit-core/src/repository/mongo.repository.js');

exports.findReviews = async function (options) {
    let filter = {};

    return await mongoRepository.findMany(Review, filter, options);
}