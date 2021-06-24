const express = require('express')
const router=express.Router()
const {authUser,getLoggedUser,registerUser,updateUser,getAllUsers,deleteUser,editUser,getUserById} =require('../controllers/userController.js') 
const {isAuth} = require('../middlewares/auth/auth') 


// @desc    register  new user
// @route   POST /api/users
// @access  Public
router.route('/')
    .post(registerUser)
    .get(isAuth(1),getAllUsers)

// @desc    auth user and get token
// @route   GET /api/users/login
// @access  Public
router.route('/login')
    .post(authUser)

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.route('/profile')
    .get(isAuth(0),getLoggedUser)
    .put(isAuth(0),updateUser)

router.route('/:id')
    .delete(isAuth(1),deleteUser)
    .get(isAuth(1),getUserById)
    .put(isAuth(1),editUser)



module.exports= router