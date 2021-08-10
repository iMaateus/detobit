const Game = require('../models/game');
const MongoRepository = require('../repository/mongo.repository.js');

exports.findAllGames = async function () {
    let query = {
        projection: 'name'
    }

    return await MongoRepository.findMany(Game, query);
}