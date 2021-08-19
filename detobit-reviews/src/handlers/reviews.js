const customResponse = require('../untils/customResponse');
const mongoConnection = require('../connections/mongo.connection');
const reviewService = require('../services/review.service.js');

module.exports.search = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    
    try {
        await mongoConnection.connect();

        let reviews = await reviewService.findReviews(event.queryStringParameters);

        return customResponse.createResponse(reviews);
    }
    catch (err) {
        return customResponse.createResponse(err.message, 500);
    }
};