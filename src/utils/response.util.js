exports.successResponse = (message, data = null) => ({
    status: 'success',
    message,
    data
});

exports.errorResponse = (message, errors = null) => ({
    status: 'error',
    message,
    errors
});