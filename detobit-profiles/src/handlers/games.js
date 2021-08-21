const customResponse = require('detobit-core/utils/customResponse');
const MongoConnection = require('../connections/mongo.connection');
const GameService = require('../services/game.service.js');

module.exports.search = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    
    try {
        await MongoConnection.connect();

        let games = await GameService.findGames(event.queryStringParameters);

        return customResponse.createResponse(games);
    }
    catch (err) {
        return customResponse.createResponse(err.message, 500);
    }
};

module.exports.highlights = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    
    try {
        await MongoConnection.connect();

        let games = await GameService.findHighlightGames(event.queryStringParameters);

        return customResponse.createResponse(games);
    }
    catch (err) {
        return customResponse.createResponse(err.message, 500);
    }
};