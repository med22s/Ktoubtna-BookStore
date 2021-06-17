const express =require('express') 
const {getBooks,getBookById} =require('../controllers/bookController.js') 
const {authMiddleware,adminMiddleware} =require( '../middlewares/auth.js')
const { deleteBook,createBook,updateBook } =require('../controllers/bookController.js') 



const router=express.Router()


router.route('/').get(getBooks).post(authMiddleware,adminMiddleware,createBook)

router.route('/:id').get(getBookById).delete(authMiddleware,adminMiddleware,deleteBook)
.put(authMiddleware,adminMiddleware,updateBook)


module.exports= router