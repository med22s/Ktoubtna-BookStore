const express = require('express');
const router = express.Router();

/*
* Config
*/
const { role }            = require('../../config/config');

/*
* middlewares
*/
const { isAuth }            = require('../../middlewares/auth/auth');
const { inputValidation }   = require('../../middlewares/inputValidation');



/*
* user validators
*/
const userSchema = require('./userValidation');

/*
* user Controller
*/
const {getUsers,getUserById,deleteUser,deleteLoggedInUser,updateUser,updateProfile} = require('./userController');
const foundUser             = require('../../middlewares/user/foundUser');


/*
* user routes
*/


/*
* GET : /api/users
* @private
* get users
*/
router.get('/',isAuth(role.admin),getUsers);


/*
* GET : /api/users/:id
* @private
* get one users by Id
*/
router.get('/:id',isAuth(role.admin),getUserById);


/*
* DELETE : /api/users/:id
* @private
* delete one user by if is not admin
*/
router.delete('/:id',isAuth(role.admin),deleteUser);


/*
* DELETE : /api/users/
* @private
* delete loggedIn user
*/
router.delete('/',isAuth(role.user),deleteLoggedInUser);

/*
* PATCH : /api/users/:id
* @private
* update  user if user Not admin 
*/
router.patch('/:id',isAuth(role.admin),foundUser,userSchema.updateUser,inputValidation.validateInput,updateUser);


/*
* PATCH : /api/users/
* @private
* update Profile  loggedIn user 
*/
router.patch('/',isAuth(role.user),userSchema.updateProfile,inputValidation.validateInput,updateProfile);

module.exports = router