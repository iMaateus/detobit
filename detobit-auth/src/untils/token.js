const jwt = require('jsonwebtoken');

exports.createToken = function (user) {
    return jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: '7d'
        })
}

exports.validateToken = function (token) {
    return jwt.verify(token.replace('Bearer ', ''), process.env.TOKEN_SECRET);
}

exports.generatePolicy = function (principalId, methodArn) {
    const apiGatewayWildcard = methodArn.split('/', 2).join('/') + '/*';

    return {
        principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: 'Allow',
                    Resource: apiGatewayWildcard,
                },
            ],
        },
    };
};