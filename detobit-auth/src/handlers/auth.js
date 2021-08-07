const customResponse = require('../untils/customResponse');
const token = require('../untils/token');
const User = require('../models/user');
const MongoConnection = require('../connections/mongo.connection');
const MongoRepository = require('../repository/mongo.repository.js')

module.exports.auth = async (event, context, callback) => {
    try {
        const data = JSON.parse(event.body);

        let query = {
            expression: {
                email: data.email
            },
            projection: 'email'
        }

        await MongoConnection.connect();

        let user = await MongoRepository.findOne(User, query);

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