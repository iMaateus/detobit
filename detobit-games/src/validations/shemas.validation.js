const validator = require('detobit-core/node_modules/fluent-validator');
const httpError = require('detobit-core/node_modules/http-errors');

exports.validateProgression = function (body) {
    var validation = validator()
        .validate(body.game._id).isMongoObjectId()
        .validate(body.status).isIn(['wantPlay', 'playing', 'closed', 'abandoned'])

    if (validation.hasErrors()) {
        throw new httpError(400, "Invalid payload");
    }
}