import express from 'express'
import {addOrder,getSingleOrderById,updateOrderAsPaid,getMyOrders} from '../controllers/orderController.js'
import {authMiddleware} from '../middlewares/auth.js'

const router=express.Router()



router.route('/').post(authMiddleware,addOrder)
router.route('/myorders').get(authMiddleware, getMyOrders)

router.route('/:id').get(authMiddleware,getSingleOrderById)

router.route('/:id/payment').put(authMiddleware,updateOrderAsPaid)


export default router