const httpStatus = require('http-status');
const multer        = require('multer');
const path          = require('path');
const { APIError } = require('../utils/errorHandler');
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,path.join('backend','public','images'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
        
    }
});

const imageFilter = function(req, file, cb) {
     // Accept images only
    if ( file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'video/*') {
        return cb(null, true);
    }
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new APIError('Only image files are allowed!',httpStatus.UNPROCESSABLE_ENTITY), false);
};
 //config Multer
const uploadImageConfig =  multer({ 
    storage    : fileStorage, 
    fileFilter : imageFilter,
    limits : {
        fileSize : 1024 * 1024 * 3 //3MB
    } 
});
module.exports = {
    uploadImageConfig
};