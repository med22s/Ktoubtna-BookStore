const jwt=require('jsonwebtoken');
const httpStatus    = require('http-status');

const {accessTokenSecret}            = require('../../config/config')

//check if refreche token valid
/*
* params isAdmin 0 its mean not etherwise admin
*/
/*
*Models
*/
const blackListToken = require('../../Models/blackListToken');
const { APIError } = require('../../utils/errorHandler');

exports.isAuth =  (isAdmin = 0 ) => {
    return  async function (req,res,next) {
        try {
            const authHeader = req.headers.authorization;
            if (authHeader) {
                const token = authHeader.split(' ')[1];
                if(!token)
                {
                    throw new APIError('unAuthorized',httpStatus.UNAUTHORIZED);
                }
                
                //check of acces token valid and not exist in blackListToken
                const promiseResults = await Promise.all([
                    jwt.verify(token, accessTokenSecret),
                    blackListToken.isTokenInBlackList(token)
                ]);
                let user                = promiseResults[0].user;
                let isTokenInBlackList  = promiseResults[1];
                console.log(user);
                console.log(isTokenInBlackList);
                if( user.isAdmin >= isAdmin && isTokenInBlackList === false )
                {
                    req.user  = user;
                    req.token = token;
                    next();
                }
                throw new APIError('Token Not Valid',httpStatus.FORBIDDEN);
            }
            throw new APIError('unAuthorized',httpStatus.UNAUTHORIZED);
    
        } catch(error) {
            next(error);
        }
    }
}