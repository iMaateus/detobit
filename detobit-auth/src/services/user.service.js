const User = require('detobit-core/src/models/user');
const mongoRepository = require('detobit-core/src/repository/mongo.repository');

exports.findUserByEmail = async function (email, options) {
    let filter = {
        'email': email
    }

    return await mongoRepository.findOne(User, filter, options);
}