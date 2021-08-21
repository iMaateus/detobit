const customResponse = require('detobit-core/src/utils/customResponse');
const mongoConnection = require('detobit-core/src/connections/mongo.connection');
const gameService = require('../services/game.service.js');

module.exports.search = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    
    try {
        await mongoConnection.connect();

        let games = await gameService.findGames(event.queryStringParameters);

        callback(null, customResponse.createResponse(games));
    }
    catch (err) {
        callback(null, customResponse.createResponse(err.message, 500));
    }
};

module.exports.highlights = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    
    try {
        await mongoConnection.connect();

        let games = await gameService.findHighlightGames(event.queryStringParameters);

        callback(null, customResponse.createResponse(games));
    }
    catch (err) {
        callback(null, customResponse.createResponse(err.message, 500));
    }
};

module.exports.slug = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    
    try {
        await mongoConnection.connect();

        let game = await gameService.findGameBySlug(event.pathParameters.slug, event.queryStringParameters);

        callback(null, customResponse.createResponse(game));
    }
    catch (err) {
        callback(null, customResponse.createResponse(err.message, 500));
    }
};