exports.createResponse = function (message, code) {
    code = code || 200;
    return {
        statusCode: code,
        body: JSON.stringify({
            success: code < 400 ? true : false,
            data: message,
        })
    }
};