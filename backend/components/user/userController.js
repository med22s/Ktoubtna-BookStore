const httpStatus    = require('http-status');
const asyncHandler  = require('express-async-handler');
/*
* services
*/
const userServiceClass = require('./userService');

/*
* Config
*/
const {role} = require('../../config/config');


/*
* Utils
*/
const {APIError} = require('../../utils/errorHandler');



exports.getUsers = asyncHandler(async (req,res)=>{
    const skip  = Math.abs(parseInt(req.query.skip))  || 1;  // Make sure to parse the skip to number
    const limit = Math.abs(parseInt(req.query.limit)) || 5; // Make sure to parse the limit to number
    //use userService to get users
    const userService   = new userServiceClass();
    const users         = await userService.getUsers(skip,limit,req.user._id);
    res.json({
        users
    });
});


exports.getUserById = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    //use userService to get user
    const userService   = new userServiceClass();
    const user          = await userService.getUserById(id);
    res.json({
        user
    });
});

exports.deleteUser = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    //use userService to delete user
    const userService   = new userServiceClass();
    const user          = await userService.getUserById(id);
    if(user.isAdmin === role.admin )
        throw new APIError("Forbidden!!",httpStatus.FORBIDDEN);
    const result        = await userService.deleteUser(user);
    res.json({
        message : result.message
    });
});

exports.deleteLoggedInUser = asyncHandler(async(req,res)=>{
    //use userService to delete LoggedIn user
    const userService       = new userServiceClass();
    //get  loggedIn user Id
    const loggedInUserId    = req.user._id;
    //get loggedIn user
    const LoggedInUser      = await userService.getUserById(loggedInUserId);
    const result            = await userService.deleteUser(LoggedInUser);
    res.json({
        message : result.message
    });
});

exports.updateUser = asyncHandler(async(req,res)=>{
    //use userService to update user
    const userService   = new userServiceClass();
    let user            = req.foundedUser;
    user                = await userService.updateUser(user,req.body);
    res.status(httpStatus.OK).json({
        user 
    });
});

exports.updateProfile = asyncHandler(async(req,res)=>{
    //use userService to update loggedIn user user
    const userService   = new userServiceClass();
    //get  loggedIn user Id
    const loggedInUserId    = req.user._id;
    //get loggedIn user
    const LoggedInUser      = await userService.getUserById(loggedInUserId);
    user                    = await userService.updateProfile(LoggedInUser,req.body);
    res.status(httpStatus.OK).json({
        user 
    });
});
