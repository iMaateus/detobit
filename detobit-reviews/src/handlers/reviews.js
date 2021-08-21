const customResponse = require('detobit-core/src/utils/customResponse');
const mongoConnection = require('detobit-core/src/connections/mongo.connection');
const reviewService = require('../services/review.service.js');

module.exports.search = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    
    try {
        await mongoConnection.connect();

        let reviews = await reviewService.findReviews(event.queryStringParameters);

        callback(null, customResponse.createResponse(reviews));
    }
    catch (err) {
        callback(null, customResponse.createResponse(err.message, 500));
    }
};