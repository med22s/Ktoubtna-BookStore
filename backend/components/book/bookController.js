const httpStatus    = require('http-status');
const asyncHandler  = require('express-async-handler');
/*
* services
*/
const bookServiceClass = require('./bookService');


exports.getBooks = asyncHandler(async (req,res)=>{
    const pageNumber  = Math.abs(parseInt(req.query.pageNumber))  || 1;  // Make sure to parse the pageNumber to number
    const limit = Math.abs(parseInt(req.query.limit)) || 5; // Make sure to parse the limit to number
    const keyword = req.query.keyword
    ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i',
        },
    }
    : {}
    //use BookService to get Books
    const bookService   = new bookServiceClass();
    const books         = await bookService.getBooks(pageNumber,limit,keyword);
    res.json(books);
});

exports.getTopRatedBooks =  asyncHandler(async(req,res)=>{
    const NUMBER_BOOKS = 5;
    const bookService   = new bookServiceClass();
    const books         = await bookService.getTopRatedBooks(NUMBER_BOOKS);
    res.json(books);
});

exports.getBookById = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    //use BookService to get Book
    const bookService   = new bookServiceClass();
    const book          = await bookService.getBookWithReviews(id);
    res.json(book);
});

exports.deleteBook = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    //use BookService to get Book
    const bookService   = new bookServiceClass();
    const result        = await bookService.deleteBook(id);
    res.json({
        message : result.message
    });
});

exports.createBook = asyncHandler(async(req,res)=>{
    const userId = req.user._id;
    //use BookService to get Book
    const bookService   = new bookServiceClass();
    const createdBook   = await bookService.createBook(userId);
    res.status(httpStatus.CREATED).json(createdBook);
});

exports.updateBook = asyncHandler(async(req,res)=>{
    //use BookService to get Book
    const bookService   = new bookServiceClass();
    const book          = await bookService.updateBook(req);
    res.status(httpStatus.CREATED).json({
        book 
    });
});