const middy = require('detobit-core/node_modules/@middy/core')
const parser = require('detobit-core/node_modules/@middy/http-json-body-parser')
const doNotWaitForEmptyEventLoop = require('detobit-core/node_modules/@middy/do-not-wait-for-empty-event-loop')

const requestHandler = require('detobit-core/src/middlewares/requestHandler');

const reviewService = require('../services/review.service');

module.exports.search = middy(async (event, context, callback) => {
    return await reviewService.findReviews(event.queryStringParameters);
}).use(parser())
    .use(doNotWaitForEmptyEventLoop({ runOnError: true }))
    .use(requestHandler())