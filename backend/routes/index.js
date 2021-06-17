const express = require('express');
//routes
const authRoute     = require('../components/auth/index');
const bookRoute     = require('./books');
const userRoute     = require('./users');
//const reviewRoute   = require('../components/review/index');
const orderRoute    = require('./orders');


const router = express.Router()

//auth routes
router.use('/auth', authRoute);

//book routes
router.use('/books', bookRoute);

//user routes
router.use('/users', userRoute);

//review routes

// router.use('/books/:bookId/reviews', reviewRoute);


//order routes
router.use('/orders', orderRoute);

//payemant Config
router.get('/config/paypal',(req,res)=>res.send(process.env.PAYPAL_CLIENT_ID))


module.exports = router;