const customResponse = require('detobit-core/src/utils/customResponse');
const mongoConnection = require('detobit-core/src/connections/mongo.connection');
const newsService = require('../services/news.service.js');

module.exports.search = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    
    try {
        await mongoConnection.connect();

        let news = await newsService.findNews(event.queryStringParameters);

        callback(null, customResponse.createResponse(news));
    }
    catch (err) {
        callback(null, customResponse.createResponse(err.message, 500));
    }
};