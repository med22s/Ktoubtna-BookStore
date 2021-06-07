import User from '../Models/user.js'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'


const authMiddleware=asyncHandler(async(req,res,next)=>{
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){



        const token=req.headers.authorization.split(' ')[1]

        try {
            const decoded=jwt.verify(token,process.env.JWT_PRIVATE_KEY)
            req.user=await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.error(error.message)
            res.status(401)
            throw new Error('Unauthorized,No valid token')
        }
    }else{
        res.status(401)
        throw new Error('Unauthorized,no token')
    }
})



export {authMiddleware}