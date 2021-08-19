const News = require('../models/news');
const mongoRepository = require('../repository/mongo.repository.js');

exports.findNews = async function (options) {
    let filter = {};

    return await mongoRepository.findMany(News, filter, options);
}