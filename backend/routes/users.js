import express from 'express'
const router=express.Router()
import {authUser,getLoggedUser,registerUser} from '../controllers/userController.js'
import {authMiddleware} from '../middlewares/auth.js'



// @desc    auth user and get token
// @route   GET /api/users/login
// @access  Public
router.route('/login').post(authUser)

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.route('/profile').get(authMiddleware,getLoggedUser)

// @desc    register  new user
// @route   POST /api/users
// @access  Public
router.route('/').post(registerUser)



export default router