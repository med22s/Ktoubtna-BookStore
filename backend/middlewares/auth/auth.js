const httpStatus    = require('http-status');
/*
* Config
*/

const {role}= require('../../config/config')


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
* params isAdmin = user its mean not otherwise admin
*/
exports.isAuth =  (isAdmin = role.user ) => {
    return  async function (req,res,next) {
        try {
            const authHeader = req.headers.authorization;
            const  unAthourizedError = new APIError('unAuthorized',httpStatus.UNAUTHORIZED);
            if (authHeader) {
                const token = authHeader.split(' ')[1];
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
                //check if this user have role to access this action
                if( user.isAdmin < isAdmin )
                {
                    throw new APIError('Token Not Valid',httpStatus.FORBIDDEN);
                }
                //check if this access token in blackList Tokens
                if( isTokenInBlackList === true )
                {
                    throw unAthourizedError;
                }
                req.user  = user;
                req.token = token;
                return next();
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