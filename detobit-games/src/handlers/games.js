const middy = require('detobit-core/node_modules/@middy/core')
const parser = require('detobit-core/node_modules/@middy/http-json-body-parser')
const doNotWaitForEmptyEventLoop = require('detobit-core/node_modules/@middy/do-not-wait-for-empty-event-loop')

const requestHandler = require('detobit-core/src/middlewares/requestHandler');

const gameService = require('../services/game.service');

module.exports.search = middy(async (event, context) => {
    return await gameService.findGames(event.queryStringParameters);
}).use(parser())
    .use(doNotWaitForEmptyEventLoop({ runOnError: true }))
    .use(requestHandler())

module.exports.highlights = middy(async (event, context) => {
    return await gameService.findHighlightGames(event.queryStringParameters);
}).use(parser())
    .use(doNotWaitForEmptyEventLoop({ runOnError: true }))
    .use(requestHandler())

module.exports.slug = middy(async (event, context) => {
    return await gameService.findGameBySlug(event.pathParameters.slug, event.queryStringParameters);
}).use(parser())
    .use(doNotWaitForEmptyEventLoop({ runOnError: true }))
    .use(requestHandler())
