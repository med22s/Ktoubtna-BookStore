const  express  = require ('express');
const  books    = require ('./books');
const  authRoute    = require ('../components/auth/index');


const router=express.Router()


//auth routes
router.use('/auth',authRoute);


//book routes
router.use('/books',books);

module.exports = router;