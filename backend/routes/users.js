import express from 'express'
const router=express.Router()
import {authUser,getLoggedUser,registerUser,updateUser,getAllUsers} from '../controllers/userController.js'
import {authMiddleware,adminMiddleware} from '../middlewares/auth.js'



// @desc    auth user and get token
// @route   GET /api/users/login
// @access  Public
router.route('/login').post(authUser)

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.route('/profile').get(authMiddleware,getLoggedUser).put(authMiddleware,updateUser)

// @desc    register  new user
// @route   POST /api/users
// @access  Public
router.route('/').post(registerUser).get(authMiddleware,adminMiddleware,getAllUsers)



export default router