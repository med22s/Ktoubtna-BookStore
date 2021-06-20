const express = require('express');
/*
* Config
*/
const { role } = require('../../config/config');

/*
* middlewares
*/
const { isAuth } = require('../../middlewares/auth/auth')
const { refrechTokenAuth } = require('../../middlewares/auth/refrechToken');
const { inputValidation } = require('../../middlewares/inputValidation');

/*
* authSchema
*/
const { schema } = require('./authValidation');

/*
* controllers
*/
const { register, login, getToken, logout } = require('./authController');



const router = express.Router()

/*
******************* auth routes *******************
*/


/*
* POST : /api/auth/register
* @public
* register new User
*/
router.post('/register', schema.register, inputValidation.validateInput, register);

/*
* POST : /api/auth/login
* @public
* login user 
*/
router.post('/login', schema.login, inputValidation.validateInput, login);

/*
* GET : /api/auth/token
* @public
* get accessToken using valid refreshToken
*/
router.get('/token', refrechTokenAuth, getToken);

/*
* POST : /api/auth/logout
* @private
* logout user
*/
router.post('/logout', isAuth(role.user), logout)

module.exports = router