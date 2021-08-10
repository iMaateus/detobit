const customResponse = require('../untils/customResponse');
const token = require('../untils/token');
const MongoConnection = require('../connections/mongo.connection');
const UserService = require('../services/user.service.js');

module.exports.auth = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        const data = JSON.parse(event.body);

        await MongoConnection.connect();

        let user = await UserService.findUserByEmail(data.email);

        if (!user) {
            return customResponse.createResponse("Credenciais inválidas", 401);
        }

        return customResponse.createResponse(token.createToken(user));
    }
    catch (err) {
        return customResponse.createResponse(err.message, 500);
    }
};

module.exports.validate = async (event, context) => {
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
        return customResponse.createResponse(err.message, 500);
    }
};