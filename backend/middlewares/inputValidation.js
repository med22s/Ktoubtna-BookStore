const {validationResult}        = require('express-validator');
const httpStatus = require('http-status');

const inputValidation = (req,res,next) => {
    let errorsObject = validationResult(req);
    if(!errorsObject.isEmpty())
    {
        let errors = errorsObject.errors;
        errors = errors.map(error => ({ param: error.param, msg: error.msg }));
        return res.status(httpStatus.BAD_REQUEST).json({
            errors 
        });
    }
    next();
}

module.exports = {
    inputValidation
}