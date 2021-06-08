const httpStatus = require("http-status");
const { APIError } = require("../utils/errorHandler");

const notfound=(req,res,next)=>{
    next(new APIError(`Error: ${req.originalUrl} not found`,httpStatus.NOT_FOUND));
}
module.exports = notfound