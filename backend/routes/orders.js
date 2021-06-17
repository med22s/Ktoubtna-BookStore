const express =require('express')
const {addOrder,getSingleOrderById,updateOrderAsPaid,getMyOrders} =require( '../controllers/orderController.js')
const {isAuth} = require('../middlewares/auth/auth') 

const router=express.Router()



router.route('/').post(isAuth(0),addOrder)
router.route('/myorders').get(isAuth(0), getMyOrders)

router.route('/:id').get(isAuth(0),getSingleOrderById)

router.route('/:id/payment').put(isAuth(0),updateOrderAsPaid)


module.exports= router