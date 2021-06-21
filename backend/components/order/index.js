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


/*
* order Controller
*/
const {getOrders,getMyOrders,getSingleOrderById,addOrder,updateOrderAsPaid,updateDeliveredOrder} = require('./orderController');


/*
* order routes
*/

/*
* GET : /api/orders/myorders
* @private
* get orders LoggedIn User
*/
router.get('/myorders',isAuth(role.user), getMyOrders);

/*
* GET : /api/orders
* @private
* get  order  By Id
*/
router.get('/:id',isAuth(role.user),getSingleOrderById);

/*
* POST : /api/orders
* @private
* create New Order
*/

router.post('/',isAuth(role.user),addOrder)

/*
* PATCH : /api/orders/:id/payment
* @private
* update some field In order when user pay
*/

router.patch('/:id/payment',isAuth(role.user),updateOrderAsPaid);


//*********************** admin Route ****************************
/*
* GET : /api/orders
* @private
* get orders
*/


router.get('/',isAuth(role.admin), getOrders);
/*
* PATCH : /api/orders/:id
* @private
* update delivered Order By admin
*/

router.patch('/:id/deliver',isAuth(role.admin),updateDeliveredOrder);


module.exports = router