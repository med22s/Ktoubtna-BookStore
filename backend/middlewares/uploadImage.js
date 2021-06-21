const multer = require('multer');
/*
* utils
*/
const { APIError } = require('../utils/errorHandler');
/*
* config
*/
const {uploadImageConfig} = require('../config/uploadImage');

exports.uploadImage = (paramName) => {
    return function (req, res, next) {
        //give name picture parameter to multer
        uploadImageConfig.single(paramName)(req, res, function (err) {
            if(err)
            {
                if (err instanceof multer.MulterError || err instanceof APIError) {
                    // A Multer error occurred when uploading || or Expected Error
                    return next(err);
                } else {
                    // An unknown error occurred when uploading.
                    return next(new APIError('something happend wrong!',httpStatus.INTERNAL_SERVER_ERROR));
                }
            }
            // Everything went fine. 
            next()
        });
    }
}
