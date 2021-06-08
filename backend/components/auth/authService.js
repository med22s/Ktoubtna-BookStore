/*
* Models
*/
const httpStatus = require("http-status");
const User = require("../../Models/user");
const refreshTokenModel = require('../../Models/refrechToken');
const blackListToken = require('../../Models/blackListToken');


/*
* utils
*/
const { APIError } = require('../../utils/errorHandler');
const {setUpObjectFields}       = require('../../utils/field');
const {isVerified}              = require('../../utils/checkPassword');
const {destroyCookie}   = require('../../utils/helper');
/*
* services
*/
const {generateToken}   = require('../token/tokenService');
const tokenServiceClass = require('../token/tokenService');


module.exports = class authService {
    constructor() {}
    /*
    *  Sign Up : 1 - set up register payload
    *            2 - crypte password.
    *            3 - create user Model.
    *            4 - return user created
    */
    async signup(payload) {
        try {
            let registerPayload = ['name','email','password'];
            const userBody      = setUpObjectFields(payload,registerPayload);
            let user            = await new User(userBody).save();
            let transformedUser = user.transform();
            return Promise.resolve(transformedUser);
        } catch(error) {
            return Promise.reject(error);
        }
    }
    /*
    *  @params email,password,response for put coookie
    *  login  :  1 - find user with this email
    *            2 - compare password
    *            3 - resolve userObj otherwise ApiError
    */
    async login(email,password) {
        try {
            const user = await User.findOne({'email': email })
            if(user)
            {
                const isMatch = await isVerified(password,user.password)
                if(isMatch)
                {
                    const userObj = {
                        id      : user._id,
                        name    : user.name,
                        emai    : user.email,
                        isAdmin : user.isAdmin
                    };
                    return Promise.resolve(userObj);
                }   
            }
            throw new APIError("password or email incorrect",httpStatus.BAD_REQUEST);
        } catch(error) {
            return Promise.reject(error);
        }
    };
    /*
    * @params userId,response for put refreshToken in coookies
    *  getToken  : 1 - find user with userId
    *              2 - generate accessToken & refreshToken
    *              3 - add RefreshToken to db & remove oldRefToken
    *              4 - return new AccessToken
    */
    async getToken(userId,refreshTokenObj,response) {
        try {
            const user = await User.findOne({'_id': userId }).select('-password -createdAt -updatedAt -__v')
            if(user)
            {
                const  tokenService     = new tokenServiceClass();
                let newAccessToken      = await tokenService.getAccessTokenByRefreshToken(user,refreshTokenObj,response);
                return Promise.resolve({user,newAccessToken});
            }
            throw new APIError("Token Not valide",httpStatus.UNAUTHORIZED);
        } catch(error) {
            return Promise.reject(error);
        }
    }

    /*
    * @params refreshToken,accessToken for add him to blackList Table,response for destroy refreshToken cookies
    *  getToken  : 1 - find user with userId
    *              2 - generate accessToken & refreshToken
    *              3 - add RefreshToken to db & remove oldRefToken
    *              4 - return new AccessToken
    */
    async logout(refreshToken,accessToken,response) {
        try {
            if(!refreshToken)
                throw new APIError('invalide Token',httpStatus.FORBIDDEN);
            //insert accessToken to blacklist  &  remove refrechToken from db 
            await Promise.all([
                blackListToken.addToken(accessToken),
                refreshTokenModel.removeByToken(refreshToken)
            ]);
            //destroy refreshtoken cookie 
            destroyCookie(response,'refreshToken','/api/auth/');
            return Promise.resolve(true);
        } catch(error) {
            return Promise.reject(error);
        }
    }
    /*
    * @params userID
    * @description delete all refreshToken for this user, so after access token expired ,will logout
    */
    async logoutUser(userId) {
        try {
            await refreshTokenModel.deleteMany({'userId' : userId});
            return Promise.resolve({message :" logouted user done Successfully"});
        } catch(error) {
            return Promise.reject(error);
        }
    }
}