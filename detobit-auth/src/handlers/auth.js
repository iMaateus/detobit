const middy = require('detobit-core/node_modules/@middy/core')
const parser = require('detobit-core/node_modules/@middy/http-json-body-parser')
const doNotWaitForEmptyEventLoop = require('detobit-core/node_modules/@middy/do-not-wait-for-empty-event-loop')

const token = require('detobit-core/src/utils/token');
const requestHandler = require('detobit-core/src/middlewares/requestHandler');
const httpError = require('detobit-core/node_modules/http-errors');

const customResponse = require('detobit-core/src/utils/customResponse');
const userService = require('../services/user.service.js');

module.exports.auth = middy(async (event, context, callback) => {
    return await userService.generateToken(event.body.login);
}).use(parser())
    .use(doNotWaitForEmptyEventLoop({ runOnError: true }))
    .use(requestHandler())

module.exports.validate = async (event, context, callback) => {
    try {
        if (!event.authorizationToken) {
            return customResponse.createResponse("Unauthorized", 401);
        }

        const claims = token.validateToken(event.authorizationToken);
        const policy = token.generatePolicy(claims.id, event.methodArn);

        return {
            ...policy,
            context: claims
        };
    }
    catch (err) {
        callback('Unauthorized');
    }
};