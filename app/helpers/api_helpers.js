function getSuccessApiResponse(data) {
    return {
        data: data || {},
        status: 'success'
    };
}
exports.getSuccessApiResponse = getSuccessApiResponse;

function getErrorApiResponse(message, code) {
    code = code || 500;
    return {
        data: {},
        status: 'error',
        message: message,
        code: code
    };
}
exports.getErrorApiResponse = getErrorApiResponse;
