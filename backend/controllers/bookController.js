import Book from '../Models/book.js'
import asyncHandler from 'express-async-handler'

const getBooks=asyncHandler(async(req,res)=>{

  const pageSize = 4
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}


    const count = await Book.countDocuments({ ...keyword })

  const books = await Book.find({ ...keyword }).limit(pageSize)
  .skip(pageSize * (page - 1))
    res.json({ books, page, pages: Math.ceil(count / pageSize) });
})



const getBookById=asyncHandler(async(req,res)=>{
    const book=await Book.findById(req.params.id)
    if(!book) return res.status(404).json({message:'book not found'})
    return res.json(book);
})


const getTopRatedBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({}).sort({ rating: -1 }).limit(3)
  res.json(books)
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

  const addBookReview = asyncHandler(async (req, res) => {
    const { rating, message } = req.body
  
    const book = await Book.findById(req.params.id)
  
    if (book) {
      const alreadyReviewed = book.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      )
  
      if (alreadyReviewed) {
        res.status(400)
        throw new Error('Book already reviewed')
      }
  
      const review = {
        name: req.user.name,
        rating: Number(rating),
        message,
        user: req.user._id,
      }
  
      book.reviews.push(review)
  
      book.numReviews = book.reviews.length
  
      book.rating =
        book.reviews.reduce((acc, item) => item.rating + acc, 0) /
        book.reviews.length
  
      await book.save()
      res.status(201).json({ message: 'Review added' })
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
    updateBook,
    addBookReview,
    getTopRatedBooks
}