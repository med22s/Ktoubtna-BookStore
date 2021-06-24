class APIError extends Error {
    constructor(message,statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
const handleError = (err, res) => {
    const { statusCode , message } = err;
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    });
};

module.exports = {
    handleError,
    APIError
}