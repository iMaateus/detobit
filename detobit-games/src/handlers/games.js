const customResponse = require('../untils/customResponse');
const MongoConnection = require('../connections/mongo.connection');
const GameService = require('../services/game.service.js');

module.exports.games = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    
    try {
        await MongoConnection.connect();

        let games = await GameService.findAllGames();

        return customResponse.createResponse(games);
    }
    catch (err) {
        return customResponse.createResponse({ error: err.message }, 500);
    }
};