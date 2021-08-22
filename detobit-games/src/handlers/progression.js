const middy = require('detobit-core/node_modules/@middy/core')
const parser = require('detobit-core/node_modules/@middy/http-json-body-parser')
const doNotWaitForEmptyEventLoop = require('detobit-core/node_modules/@middy/do-not-wait-for-empty-event-loop')

const token = require('detobit-core/src/utils/token');
const requestHandler = require('detobit-core/src/middlewares/requestHandler');

const progressionService = require('../services/progression.service');

module.exports.create = middy(async (event, context) => {
    return await progressionService.createProgression(token.identity(event.headers.Authorization), event.body);
}).use(parser())
    .use(doNotWaitForEmptyEventLoop({ runOnError: true }))
    .use(requestHandler())