const express = require('express');
const { register, login, getToken, logout } = require('./authController');

/*
* middlewares
*/
const { isAuth } = require('../../middlewares/auth/auth')
const { refrechTokenAuth } = require('../../middlewares/auth/refrechToken');
const { inputValidation } = require('../../middlewares/inputValidation');

/*
* authSchema
*/
const { schema } = require('./authValidation')


const router = express.Router()

/*
******************* auth routes *******************
*/


/*
* POST : /api/auth/register
* @public
* register new User
*/
router.post('/register', schema.register, inputValidation, register);

/*
* POST : /api/auth/login
* @public
* login user 
*/
router.post('/login', schema.login, inputValidation, login);

/*
* GET : /api/auth/token
* @public
* get accessToken using valide refreshToken
*/
router.get('/token', refrechTokenAuth, getToken);

/*
* POST : /api/auth/logout
* @private
* logout user
*/
router.post('/logout', isAuth(0), logout)

module.exports = router