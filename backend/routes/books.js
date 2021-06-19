import express from 'express'
import {getBooks,getBookById,getTopRatedBooks} from '../controllers/bookController.js'
import {authMiddleware,adminMiddleware} from '../middlewares/auth.js'
import { deleteBook,createBook,updateBook,addBookReview } from '../controllers/bookController.js'



const router=express.Router()


router.route('/').get(getBooks).post(authMiddleware,adminMiddleware,createBook)
router.route('/:id/reviews').post(authMiddleware, addBookReview)
router.get('/top', getTopRatedBooks)
router.route('/:id').get(getBookById).delete(authMiddleware,adminMiddleware,deleteBook)
.put(authMiddleware,adminMiddleware,updateBook)


export default router