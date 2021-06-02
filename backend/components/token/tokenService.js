const jwt=require('jsonwebtoken');
const httpStatus = require('http-status');

/*
* Models
*/
const refreshTokenModel = require('../../Models/refrechToken');
/*
* utils
*/
const { APIError } = require('../../utils/errorHandler');
const {setRefreshTokenCookie,destroyCookie}   = require('../../utils/helper');

/*
* config
*/
const  {accessTokenSecret,accessTokenExpiration}  = require('../../config/config');

module.exports = class tokenService {
    constructor() {}
    generateToken(payload){
        return  jwt.sign(payload, accessTokenSecret, {
            expiresIn: accessTokenExpiration
        })
    };
    async getAccessToken(user,response)
    {
        try {
            //generate accessToken
            const accessToken  =  this.generateToken({user});
            //generate refreshToken
            const refreshToken = refreshTokenModel.generate(user.id);
            //Add this refresh token to db
            await refreshTokenModel.addRefreshToken(user.id,refreshToken);
            // set new refreshToken in Cookies
            setRefreshTokenCookie(response,refreshToken);
            return Promise.resolve(accessToken);
        } catch(error) {
            return Promise.reject(error);
        }    
    }

    async getAccessTokenByRefreshToken(user,oldRefreshTokenObj,response)
    {
        try {
            //generate accessToken
            const accessToken  =  this.generateToken({user});
            //generate refreshToken
            const refreshToken = refreshTokenModel.generate(user.id);
            // Add new one  && update number Used For the old  RefereshToken 
            await Promise.all([ 
                oldRefreshTokenObj.updateTokenNumberUsed(),
                refreshTokenModel.addRefreshToken(user.id,refreshToken)])
            // set new refreshToken in Cookies
            setRefreshTokenCookie(response,refreshToken);
            return Promise.resolve(accessToken);
        } catch(error) {
            return Promise.reject(error);
        }    
    }
    
    async verifyAccessToken(req)
    {
        try {
            const authHeader = req.headers.authorization;
            if (authHeader) {
                const token = authHeader.split(' ')[1];
                const  unAthourizedError = new APIError('unAuthorized',httpStatus.UNAUTHORIZED);
                if(!token)
                {
                    throw unAthourizedError;
                }
                return Promise.resolve(jwt.verify(token, accessTokenSecret));
            }
            throw unAthourizedError;
        } catch(error){
            return Promise.reject(error);
        }
        
    }
}