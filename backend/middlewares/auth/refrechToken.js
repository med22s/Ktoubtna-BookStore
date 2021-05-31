const asyncHandler  = require('express-async-handler');
const { APIError } = require('../../utils/errorHandler');

/*
*models
*/
const refrechToken = require('../../Models/refrechToken');
const httpStatus = require('http-status');

//check if refreche token valid
const  refrechTokenAuth= asyncHandler( async (req,res,next) =>{
    const token = req.cookies['refreshToken'];
    const refToken  = await refrechToken.getByToken(token);
    if(refToken && new Date().getTime() < new Date(refToken.expires).getTime())
    {
        req.userId=refToken.userId;
        await refrechToken.removeByToken(token);
        return next();
    }
    throw new APIError("Refrech Token Not Valide",httpStatus.UNAUTHORIZED)
});
module.exports={
    refrechTokenAuth
}