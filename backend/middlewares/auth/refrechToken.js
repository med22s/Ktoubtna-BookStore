const asyncHandler  = require('express-async-handler');
const httpStatus = require('http-status');
const { APIError } = require('../../utils/errorHandler');
/*
*models
*/
const refrechToken = require('../../Models/refrechToken');

/*
* services
*/
const authServiceClass  = require('../../components/auth/authService');



//check if refreche token valid
const  refrechTokenAuth = asyncHandler(async (req,res,next) =>{
    const refreshtoken     = req.cookies['refreshToken'];
    const refreshTokenObj  = await refrechToken.getByToken(refreshtoken);
    if(refreshTokenObj && new Date().getTime() < new Date(refreshTokenObj.expires).getTime())
    {
        /*
        * check if this refreshToken Already used 
        * if true logout this  user cz we consider that is someone try to get access token
        * otherwise generate new access token & new refreshtoken and increment Number Used for this refreshtoken
        */
        if(refreshTokenObj.used === 1 )
        {
            const authService   = new authServiceClass();
            await authService.logoutUser(refreshTokenObj.userId);
            throw new APIError("Refrech Token Not Valide",httpStatus.UNAUTHORIZED);
        }
        else
        {
            req.userId          = refreshTokenObj.userId;
            req.refreshTokenObj = refreshTokenObj;
            return next();
        } 
    }
    throw new APIError("Refrech Token Not Valide",httpStatus.UNAUTHORIZED);
});
module.exports={
    refrechTokenAuth
}