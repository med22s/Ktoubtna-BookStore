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
* auth routes
*/

router.post('/register', schema.register, inputValidation, register);
router.post('/login', schema.login, inputValidation, login);
router.get('/token', refrechTokenAuth, getToken);
router.post('/logout', isAuth(0), logout)

module.exports = router