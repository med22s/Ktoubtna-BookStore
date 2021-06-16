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



const deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id)
  
    if (book) {
      await book.remove()
      res.json({ message: 'book removed' })
    } else {
      res.status(404)
      throw new Error('book not found')
    }
  })


  const createBook = asyncHandler(async (req, res) => {
    const book = new Book({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      genre: 'Sample genre',
      author: 'Sample author',
      numberInStock: 0,
      numReviews: 0,
      description: 'Sample description',
    })
  
    const createdbook = await book.save()
    res.status(201).json(createdbook)
  })



  const updateBook = asyncHandler(async (req, res) => {
    const {
      name,
      price,
      description,
      image,
      genre,
      author,
      numberInStock,
    } = req.body
  
    const book = await Book.findById(req.params.id)
  
    if (book) {
      book.name = name
      book.price = price
      book.description = description
      book.image = image
      book.genre = genre
      book.author = author
      book.numberInStock = numberInStock
  
      const updatedbook = await book.save()
      res.json(updatedbook)
    } else {
      res.status(404)
      throw new Error('book not found')
    }
  })


export {
    getBooks,
    getBookById,
    deleteBook,
    createBook,
    updateBook
}