const customResponse = require('../untils/customResponse');
const mongoConnection = require('../connections/mongo.connection');
const newsService = require('../services/news.service.js');

module.exports.search = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    
    try {
        await mongoConnection.connect();

        let games = await newsService.findNews(event.queryStringParameters);

        return customResponse.createResponse(games);
    }
    catch (err) {
        return customResponse.createResponse(err.message, 500);
    }
};