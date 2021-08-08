'use strict'

const User = require('../models/user');
const MongoRepository = require('../repository/mongo.repository.js');

exports.findUserByEmail = async function (email) {
    let query = {
        expression: {
            email: email
        },
        projection: 'email'
    }

    return await MongoRepository.findOne(User, query);
}