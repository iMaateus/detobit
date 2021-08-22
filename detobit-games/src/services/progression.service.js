const mongoose = require('detobit-core/node_modules/mongoose');
const Progression = require('detobit-core/src/models/progression');
const mongoRepository = require('detobit-core/src/repository/mongo.repository');
const shemasValidation = require('../validations/shemas.validation');

exports.createProgression = async function (identity, body) {
    shemasValidation.validateProgression(body);
    
    let filter = {
        user: {
            _id: mongoose.mongo.ObjectId(identity.id)
        },
        game: {
            _id: mongoose.mongo.ObjectId(body.game._id)
        }
    };

    if(body.remove){
        return await mongoRepository.deleteOne(Progression, filter);
    }

    let update = {
        status: body.status
    };

    return await mongoRepository.updateOne(Progression, filter, update, true);
}