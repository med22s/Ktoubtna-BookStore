
const httpStatus = require('http-status');
const {validationResult}        = require('express-validator');
const asyncHandler  = require('express-async-handler');


/*
* models
*/
const User              = require('../../Models/user');
const refreshTokenModel = require('../../Models/refrechToken');

/*
* utils
*/
const {setUpObjectFields}       = require('../../utils/field');
const {isVerified}              = require('../../utils/checkPassword');
const {setRefreshTokenCookie}   = require('../../utils/helper');
/*
* services
*/
const {generateToken}=require('../token/tokenService');


/*
* config
*/


exports.register = async (req, res, next) => {
    try {
        let registerPayload = ['name','email','password'];
        const userBody = setUpObjectFields(req.body,registerPayload)
        let user = await new User(userBody).save();
        let transformedUser = user.transform();
        return res.status(httpStatus.CREATED).json({
            user: transformedUser
        });
    } catch (error) {
        return next(User.checkDuplicateEmail(error));
    }
};


exports.login = asyncHandler (async (req, res, next) => {
    const {email,password} = req.body;
    const user = await User.findOne({'email': email })
    if(user)
    {
        const isMatch = await isVerified(password,user.password)
        if(isMatch)
        {
            let userId = user._id;
            const userObj = {
                id      : userId,
                name    : user.name,
                emai    : user.email,
                isAdmin : user.isAdmin
            };
            const accesToken  =  generateToken({user : userObj});
            const refreshToken = refreshTokenModel.generate(userId);
            //Add this refresh token to db
            await refreshTokenModel.addRefreshToken(userId,refreshToken);
            // set max age for cookie
            setRefreshTokenCookie(res,refreshToken);
            res.status(httpStatus.CREATED);
            return res.json({token: accesToken});
        }   
    }
    throw new APIError("password or email incorrect",httpStatus.BAD_REQUEST);
});

exports.getToken = asyncHandler ( async (req, res, next) => {
    const userId = req.userId;
    const userObj = {
        id      : userId,
        name    : user.name,
        emai    : user.email,
        isAdmin : user.isAdmin
    };
    const accesToken   = generateToken({user: userObj});
    const refreshToken = refreshTokenModel.generate(userId);
    //Add this token to db
    await refreshTokenModel.addRefreshToken(userId,refreshToken);
    setRefreshTokenCookie(res,refreshToken);
    res.status(httpStatus.CREATED);
    return res.json({
        newToken : accesToken,
        userId: userId 
    });
});


exports.logout = asyncHandler ( async (req, res, next) => {
    //insert token to blacklist 
    //remove refrech token from db
    res.status(httpStatus.CREATED);
    return res.json({
        userId: 'userId' 
    });
});