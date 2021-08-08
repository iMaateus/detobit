const customResponse = require('../untils/customResponse');
const token = require('../untils/token');
const User = require('../models/user');
const MongoConnection = require('../connections/mongo.connection');
const MongoRepository = require('../repository/mongo.repository.js');
const UserService = require('../services/user.service.js');

module.exports.singup = async (event, context, callback) => {
    try {
        const data = JSON.parse(event.body);

        let user = new User({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            photo: data.photo,
        });

        if (user.validateSync()) {
            return customResponse.createResponse("Usuário inválido", 400);
        }

        await MongoConnection.connect();

        if (await UserService.findUserByEmail(data.email)) {
            return customResponse.createResponse("Email já cadastrado", 409);
        }

        await MongoRepository.insertOne(user);

        await MongoConnection.disconnect();

        return customResponse.createResponse(token.createToken(user));
    }
    catch (err) {
        return customResponse.createResponse(err.message, 500);
    }
};