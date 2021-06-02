
const httpStatus = require('http-status');
const asyncHandler  = require('express-async-handler');


/*
* models
*/
const User              = require('../../Models/user');
const refreshTokenModel = require('../../Models/refrechToken');
const blackListToken = require('../../Models/blackListToken');


/*
* utils
*/
const { APIError } = require('../../utils/errorHandler');
const {setUpObjectFields}       = require('../../utils/field');
const {isVerified}              = require('../../utils/checkPassword');
const {setRefreshTokenCookie,destroyCookie}   = require('../../utils/helper');
/*
* services
*/
const tokenServiceClass = require('../token/tokenService');
const authServiceClass  = require('./authService');



/*
* config
*/


exports.register = async (req, res, next) => {
    try {
        const  authService  = new authServiceClass ();
        const  user         = await authService.signup(req.body);
        return res.status(httpStatus.CREATED).json({
            user
        });
    } catch (error) {
        return next(User.checkDuplicateEmail(error));
    }
};

exports.login = asyncHandler (async (req, res, next) => {
    const {email,password} = req.body;
    const  authService = new authServiceClass ();
    const  tokenService = new tokenServiceClass();
    // check if email and password correct and resolve userObj
    let user        = await authService.login(email,password);
    //get access token 
    const accessToken = await tokenService.getAccessToken(user,res);
    res.status(httpStatus.OK).json( {
        user,
        token : accessToken,
    });
});

exports.getToken = asyncHandler ( async (req, res, next) => {
    const userId        = req.userId;
    //get oLd token Model
    const oldRefTokenModel   = req.refreshTokenObj;
    const authService   = new authServiceClass();
    // find userBy id and generate new accesToken & increment number used for old RefreshToken
    const {user,newAccessToken}   = await authService.getToken(userId,oldRefTokenModel,res); 
    res.status(httpStatus.CREATED);
    return res.json({
        user,
        newToken : newAccessToken
    });
});


exports.logout = asyncHandler ( async (req, res, next) => {
    const refreshToken      = req.cookies['refreshToken'];
    const accessToken       = req.token;
    const authService       = new authServiceClass();
    await authService.logout(refreshToken,accessToken,res);
    res.status(httpStatus.OK);
    return res.json({
        message : "logout successfully"
    });
});
