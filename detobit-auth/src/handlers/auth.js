const customResponse = require('detobit-core/src/utils/customResponse');
const token = require('detobit-core/src/utils/token');
const mongoConnection = require('detobit-core/src/connections/mongo.connection');
const userService = require('../services/user.service.js');

module.exports.auth = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        const data = JSON.parse(event.body);

        await mongoConnection.connect();

        let user = await userService.findUserByEmail(data.email);

        if (!user) {
            callback(null, customResponse.createResponse("Credenciais inválidas", 401));
            return;
        }

        callback(null, customResponse.createResponse(token.createToken(user)));
    }
    catch (err) {
        callback(null, customResponse.createResponse(err.message, 500));
    }
};

module.exports.validate = async (event, context, callback) => {
    try {
        if (!event.authorizationToken) {
            callback(null, customResponse.createResponse("Unauthorized", 401));
            return;
        }

        const claims = token.validateToken(event.authorizationToken);
        const policy = token.generatePolicy(claims.id, event.methodArn);

        return {
            ...policy,
            context: claims
        };
    }
    catch (err) {
        callback(null, customResponse.createResponse(err.message, 500));
    }
};