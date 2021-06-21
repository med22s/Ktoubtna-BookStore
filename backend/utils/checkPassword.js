const bcryptjs=require('bcryptjs');
const httpStatus = require('http-status');
const { APIError } = require('./errorHandler');

exports.isVerified = async (password,passwordHash) =>{
    const isMatch = await bcryptjs.compare(password,passwordHash);
    if(!isMatch)
    {
        throw new APIError("password or email incorrect",httpStatus.BAD_REQUEST);
    }
    return true;
    
}
