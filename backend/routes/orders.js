const express =require('express')
const {addOrder,getSingleOrderById,updateOrderAsPaid,getMyOrders} =require( '../controllers/orderController.js')
const {isAuth} = require('../middlewares/auth/auth') ;

/*
* config
*/

const {role} = require('../config/config')
const router=express.Router()



router.route('/').post(isAuth(role.user),addOrder)
router.route('/myorders').get(isAuth(role.user), getMyOrders)

router.route('/:id').get(isAuth(role.user),getSingleOrderById)

router.route('/:id/payment').put(isAuth(role.user),updateOrderAsPaid)


module.exports= router