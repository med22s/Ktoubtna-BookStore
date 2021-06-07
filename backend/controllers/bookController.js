import Book from '../Models/book.js'
import asyncHandler from 'express-async-handler'

const getBooks=asyncHandler(async(req,res)=>{
    const books=await Book.find()
    res.json(books);
})



const getBookById=asyncHandler(async(req,res)=>{
    const book=await Book.findById(req.params.id)
    if(!book) return res.status(404).json({message:'book not found'})
    return res.json(book);
})


export {
    getBooks,
    getBookById
}