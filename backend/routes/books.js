const express =require('express') 
const {getBooks,getBookById} =require('../controllers/bookController.js') 
const {isAuth} =require( '../middlewares/auth/auth')
const { deleteBook,createBook,updateBook } =require('../controllers/bookController.js') 

/*
* role
*/
const {role} = require('../config/config') 



const router=express.Router()


router.route('/').get(getBooks).post(isAuth(role.admin),createBook)

router.route('/:id').get(getBookById).delete(isAuth(role.admin),deleteBook)
.patch(isAuth(role.admin),updateBook)


module.exports= router