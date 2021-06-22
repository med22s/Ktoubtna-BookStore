const httpStatus    = require('http-status');
const asyncHandler  = require('express-async-handler');
/*
* services
*/
const userServiceClass = require('./userService');
const tokenServiceClass = require('../token/tokenService');
/*
* Config
*/
const {role} = require('../../config/config');


/*
* Utils
*/
const {APIError} = require('../../utils/errorHandler');



exports.getUsers = asyncHandler(async (req,res)=>{
    //use userService to get users
    const userService   = new userServiceClass();
    const users         = await userService.getUsers(req.user._id);
    res.json(users);
});


exports.getUserById = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    //use userService to get user
    const userService   = new userServiceClass();
    const user          = await userService.getUserById(id);
    res.json(user);
});

exports.getLoggedInUser = asyncHandler(async(req,res)=>{
    const loggedInUserId = req.user._id;
    const userService   = new userServiceClass();
    const user          = await userService.getUserById(loggedInUserId);
    res.json(user);
});

exports.deleteUser = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    //use userService to delete user
    const userService   = new userServiceClass();
    const user          = await userService.getUserById(id);
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
    res.status(httpStatus.OK).json(user);
});

exports.updateProfile = asyncHandler(async(req,res)=>{
    //use userService to update loggedIn user user
    const userService   = new userServiceClass();
    //get  loggedIn user Id
    const loggedInUserId    = req.user._id;
    //get loggedIn user
    const LoggedInUser      = await userService.getUserById(loggedInUserId);
    user                    = await userService.updateProfile(LoggedInUser,req.body);
     //generate new Token with Updated data using token service
    const tokenService  = new tokenServiceClass();
    const newToken      = tokenService.generateToken({user});
    user.token= newToken;
    
    res.json(user);
});
