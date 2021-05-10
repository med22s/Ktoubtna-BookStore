import express from 'express'
import Book from '../Models/book.js'
import asyncHandler from 'express-async-handler'


const router=express.Router()


router.get('/',asyncHandler(async (req,res)=>{
    const books=await Book.find()
    res.json(books);
}))

router.get('/:id',asyncHandler(async(req,res)=>{
    const book=await Book.findById(req.params.id)
    if(!book) return res.status(404).json({message:'book not found'})
    return res.json(book);
})) 


export default router