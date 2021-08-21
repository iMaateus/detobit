const Game = require('detobit-core/src/models/game');
const mongoRepository = require('detobit-core/src/repository/mongo.repository');

exports.findGames = async function (options) {
    let filter = {};

    if (options.search != null) {
        filter = { popularNames: { '$regex': options.search, '$options': 'i' } }
    }

    return await mongoRepository.findMany(Game, filter, options);
}

exports.findHighlightGames = async function (options) {
    let filter = {
        'highlight': true
    }

    return await mongoRepository.findMany(Game, filter, options);
}

exports.findGameBySlug = async function (slug, options) {
    let filter = {
        'slug': slug
    }

    return await mongoRepository.findOne(Game, filter, options);
}