// const customResponse = require('detobit-core/src/utils/customResponse');
// const token = require('../untils/token');
// const User = require('../models/user');
// const mongoConnection = require('detobit-core/src/connections/mongo.connection');
// const mongoRepository = require('detobit-core/src/repository/mongo.repository');
// const userService = require('../services/user.service.js');

// module.exports.singup = async (event, context, callback) => {
//     context.callbackWaitsForEmptyEventLoop = false;

//     try {
//         const data = JSON.parse(event.body);

//         let user = new User({
//             firstname: data.firstname,
//             lastname: data.lastname,
//             email: data.email,
//             photo: data.photo,
//         });

//         if (user.validateSync()) {
//             callback(null, customResponse.createResponse("Usuário inválido", 400));
//         }

//         await mongoConnection.connect();

//         if (await userService.findUserByEmail(data.email)) {
//             callback(null, customResponse.createResponse("Email já cadastrado", 409));
//         }

//         await mongoRepository.insertOne(user);

//         callback(null, customResponse.createResponse(token.createToken(user)));
//     }
//     catch (err) {
//         callback(null, customResponse.createResponse(err.message, 500));
//         return customResponse.createResponse(err.message, 500);
//     }
// };