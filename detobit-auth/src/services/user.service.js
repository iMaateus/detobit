const User = require('../models/user');
const mongoRepository = require('../repository/mongo.repository.js');

exports.findUserByEmail = async function (email) {
    let query = {
        expression: {
            email: email
        },
        projection: 'email'
    }

    return await mongoRepository.findOne(User, query);
}