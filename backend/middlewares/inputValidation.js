const {validationResult}        = require('express-validator');
const httpStatus                = require('http-status');
const path                      = require('path');
/*
* helpers
*/
const {deleteFile} = require('../utils/helper');

const inputValidation = {
    validateInput : (req,res,next) => {
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
    },
    validateInputWithFiles :  (req,res,next) => {
        try {
            let errorsObject = validationResult(req);
            //input not valide
            if(!errorsObject.isEmpty())
            {
                //if image uploaded delete image 
                if(req.file)
                    deleteFile(path.join(__dirname,'..','public','images',req.file.filename));
                //handle Validation Error
                let errors = errorsObject.errors;
                errors = errors.map(error => ({ param: error.param, msg: error.msg }));
                return res.status(httpStatus.BAD_REQUEST).json({
                    errors 
                });
            }
            next();
        } catch(error) {

        }
    }
}
module.exports = {
    inputValidation
}