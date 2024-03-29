
const httpStatus = require('http-status');
const asyncHandler  = require('express-async-handler');

/*
* models
*/
const User              = require('../../Models/user');
/*
* services
*/
const tokenServiceClass = require('../token/tokenService');
const authServiceClass  = require('./authService');
const resetPasswordService  = require('./resetPasswordService');

const { APIError } = require('../../utils/errorHandler');



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
    const  authService  = new authServiceClass ();
    const  tokenService = new tokenServiceClass();
    // check if email and password correct and resolve userObj
    let user            = await authService.login(email,password);
    //get access token 
    const accessToken   = await tokenService.getAccessToken(user,res);
    user.token = accessToken;
    res.status(httpStatus.OK).json(user);
});

exports.getToken = asyncHandler ( async (req, res, next) => {
    const userId        = req.userId;
    //get oLd token Model
    const oldRefTokenModel  = req.refreshTokenObj;
    const authService       = new authServiceClass();
    // find userBy id and generate new accesToken & increment number used for old RefreshToken
    let {user,token}  = await authService.getToken(userId,oldRefTokenModel,res); 
    const userObj = {
        _id : user._id,
        isAdmin : user.isAdmin,
        name : user.name,
        email : user.email,
        token 
    }
    res.status(httpStatus.CREATED)
    return res.json(
        userObj
    );
});


exports.logout = asyncHandler ( async (req, res, next) => {
    const refreshToken      = req.cookies['refreshToken'];
    const accessToken       = req.token;
    const authService       = new authServiceClass();
    await authService.logout(refreshToken,accessToken,res);
    res.status(httpStatus.OK);
    return res.json({
        msg : "logout successfully"
    });
});



//post forget password
exports.forgetPassword = asyncHandler( async (req, res, next) => {
    const {email} = req.body;
    const resetPassword = new resetPasswordService();
    const result = await resetPassword.forgotPassword(email);
    res.json( {
        msg : result.message,
    })
})

//GET reset password
exports.getResetPasswordToken =asyncHandler(async (req, res, next) => {
    const resetPassword = req.resetPassword;
    res.json(resetPassword);
});
//POST reset password
exports.postResetPassword = asyncHandler(  async (req, res, next) => {
        let payload = {
            userId      : req.userId,
            newPassword : req.body.newPassword,
            resetToken  : req.body.resetToken
        };
        const resetPasswordModel = req.resetPassword;
        const  authService  = new authServiceClass ();
        await authService.resetPassword(payload,resetPasswordModel);
        res.json({
            message : "password Updated successfully!"
        });
})
