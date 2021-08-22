const User = require('detobit-core/src/models/user');
const mongoRepository = require('detobit-core/src/repository/mongo.repository');
const httpError = require('detobit-core/node_modules/http-errors');
const token = require('detobit-core/src/utils/token');

findUserByEmailOrNickname = async function (login, options) {
    let filter = {
        $or: [
            { email: { '$regex': '^' + login + '$', $options: 'i' } },
            { nickname: { '$regex': '^' + login + '$', $options: 'i' } }
        ]
    }

    return await mongoRepository.findOne(User, filter, options);
}

module.exports.generateToken = async function (login, options) {
    let user = await findUserByEmailOrNickname(login, options);

    if (!user) {
        throw new httpError(401, "Invalid credentials");
    }

    return token.createToken(user);
}