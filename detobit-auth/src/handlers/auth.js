const customResponse = require('../untils/customResponse');
const token = require('../untils/token');
const MongoConnection = require('../connections/mongo.connection');
const UserService = require('../services/user.service.js');

module.exports.auth = async (event, context, callback) => {
    try {
        const data = JSON.parse(event.body);

        await MongoConnection.connect();

        let user = await UserService.findUserByEmail(data.email);

        await MongoConnection.disconnect();

        if (!user) {
            return customResponse.createResponse("Credenciais inválidas", 401);
        }

        return customResponse.createResponse(token.createToken(user));
    }
    catch (err) {
        return customResponse.createResponse({ error: err.message }, 500);
    }
};