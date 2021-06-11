import express from 'express'
import {addOrder,getSingleOrderById} from '../controllers/orderController.js'
import {authMiddleware} from '../middlewares/auth.js'

const router=express.Router()



router.route('/').post(authMiddleware,addOrder)

router.route('/:id').get(authMiddleware,getSingleOrderById)



export default router