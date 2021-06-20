const express = require('express');
//routes
const authRoute     = require('../components/auth/index');
const bookRoute     = require('../components/book/index');
const userRoute     = require('../components/user/index');
const reviewRoute   = require('../components/review/index');
const orderRoute    = require('../components/order/index');

/*
* config
*/

const {paypalClientId} = require('../config/config');




const router = express.Router()

//auth routes
router.use('/auth', authRoute);

//book routes
router.use('/books', bookRoute);

//user routes
router.use('/users', userRoute);

//review routes
router.use('/books/:bookId/reviews', reviewRoute);


//order routes
router.use('/orders', orderRoute);

//payment Config
router.get('/config/paypal',(req,res)=>res.send(paypalClientId))


module.exports = router;