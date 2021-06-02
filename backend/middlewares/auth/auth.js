const jwt=require('jsonwebtoken');
const httpStatus    = require('http-status');
/*
* Config
*/

const {accessTokenSecret}            = require('../../config/config')


/*
* Models
*/
const blackListToken = require('../../Models/blackListToken');
const { APIError } = require('../../utils/errorHandler');

/*
* services
*/
const tokenServiceClass = require('../../components/token/tokenService');

/*
* params isAdmin 0 its mean not etherwise admin
*/
exports.isAuth =  (isAdmin = 0 ) => {
    return  async function (req,res,next) {
        try {
            const authHeader = req.headers.authorization;
            if (authHeader) {
                const token = authHeader.split(' ')[1];
                const  unAthourizedError = new APIError('unAuthorized',httpStatus.UNAUTHORIZED);
                if(!token)
                {
                    throw unAthourizedError;
                }
                const tokenService  =  new tokenServiceClass();
                //check of acces token valid and not exist in blackListToken & have permision to this route
                const promiseResults = await Promise.all([
                    tokenService.verifyAccessToken(token),
                    blackListToken.isTokenInBlackList(token)
                ]);
                let user                = promiseResults[0].user;
                let isTokenInBlackList  = promiseResults[1];
                if( user.isAdmin >= isAdmin && isTokenInBlackList === false )
                {
                    req.user  = user;
                    req.token = token;
                    return next();
                }
                throw new APIError('Token Not Valid',httpStatus.FORBIDDEN);
            }
            throw unAthourizedError;
        } catch(error) {
            if(!(error instanceof APIError))
            {
                error =  new APIError('Token Not Valid',httpStatus.FORBIDDEN);
            }
            next(error);
        }
    }
}