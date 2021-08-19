const customResponse = require('../untils/customResponse');
const token = require('../untils/token');
const User = require('../models/user');
const mongoConnection = require('../connections/mongo.connection');
const mongoRepository = require('../repository/mongo.repository.js');
const userService = require('../services/user.service.js');

module.exports.singup = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

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

        await mongoConnection.connect();

        if (await userService.findUserByEmail(data.email)) {
            return customResponse.createResponse("Email já cadastrado", 409);
        }

        await mongoRepository.insertOne(user);

        return customResponse.createResponse(token.createToken(user));
    }
    catch (err) {
        return customResponse.createResponse(err.message, 500);
    }
};