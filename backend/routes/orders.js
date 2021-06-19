import express from 'express'
import {addOrder,getSingleOrderById,updateOrderAsPaid,getMyOrders,getAllOrders,
    updateOrderOnDeliver} from '../controllers/orderController.js'
import {authMiddleware,adminMiddleware} from '../middlewares/auth.js'

const router=express.Router()



router.route('/').post(authMiddleware,addOrder).get(authMiddleware,adminMiddleware,getAllOrders)
router.route('/myorders').get(authMiddleware, getMyOrders)

router.route('/:id').get(authMiddleware,getSingleOrderById)

router.route('/:id/payment').put(authMiddleware,updateOrderAsPaid)
router.route('/:id/deliver').put(authMiddleware,updateOrderOnDeliver)


export default router