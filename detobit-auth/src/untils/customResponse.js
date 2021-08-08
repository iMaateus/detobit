exports.createResponse = function (message, code) {
    code = code || 200;
    return {
        statusCode: code,
        body: JSON.stringify(code < 400 ? {
            success: true,
            data: message,
        } : {
            success: false,
            error: message,
        })
    }
};