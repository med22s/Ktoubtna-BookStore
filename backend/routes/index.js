const  express  = require ('express');
//routes
const  bookRoute    = require ('../components/book/index');
const  authRoute    = require ('../components/auth/index');


const router=express.Router()


//auth routes
router.use('/auth',authRoute);


//book routes
router.use('/books',bookRoute);

module.exports = router;