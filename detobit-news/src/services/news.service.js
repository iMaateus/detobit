const News = require('detobit-core/src/models/news');
const mongoRepository = require('detobit-core/src/repository/mongo.repository.js');

exports.findNews = async function (options) {
    let filter = {};

    return await mongoRepository.findMany(News, filter, options);
}