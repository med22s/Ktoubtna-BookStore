const asyncHandler  = require('express-async-handler');
const httpStatus = require('http-status');

/*
* Models
*/
const userModel = require('../../Models/user');

/*
* Config
*/
const {role} = require('../../config/config');


/*
* Utils
*/
const {APIError} = require('../../utils/errorHandler');

const foundUser = asyncHandler(async (req,res,next)=>{
    const id = req.params.id;
    let user = await userModel.getUserById(id);
    //set user in request
    req.foundedUser = user;
    next();
});

module.exports = foundUser