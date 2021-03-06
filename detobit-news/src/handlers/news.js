const middy = require('detobit-core/node_modules/@middy/core')
const parser = require('detobit-core/node_modules/@middy/http-json-body-parser')
const doNotWaitForEmptyEventLoop = require('detobit-core/node_modules/@middy/do-not-wait-for-empty-event-loop')

const requestHandler = require('detobit-core/src/middlewares/requestHandler');

const newsService = require('../services/news.service');

module.exports.search = middy(async (event, context, callback) => {
    return await newsService.findNews(event.queryStringParameters);
}).use(parser())
    .use(doNotWaitForEmptyEventLoop({ runOnError: true }))
    .use(requestHandler())