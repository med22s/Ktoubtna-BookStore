const httpStatus    = require('http-status');
const asyncHandler  = require('express-async-handler');
/*
* services
*/
const bookServiceClass = require('./bookService');


exports.getBooks = asyncHandler(async (req,res)=>{
    const skip  = Math.abs(parseInt(req.query.skip))  || 1;  // Make sure to parse the skip to number
    const limit = Math.abs(parseInt(req.query.limit)) || 5; // Make sure to parse the limit to number
    //use BookService to get Books
    const bookService   = new bookServiceClass();
    const books         = await bookService.getBooks(skip,limit);
    res.json({
        books
    });
});

exports.getBookById = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    //use BookService to get Book
    const bookService   = new bookServiceClass();
    const book          = await bookService.getBookById(id);
    res.json({
        book
    });
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
    //use BookService to get Book
    const bookService   = new bookServiceClass();
    const book          = await bookService.createBook(req);
    res.status(httpStatus.CREATED).json({
        book 
    });
});

exports.updateBook = asyncHandler(async(req,res)=>{
    //use BookService to get Book
    const bookService   = new bookServiceClass();
    const book          = await bookService.updateBook(req);
    res.status(httpStatus.CREATED).json({
        book 
    });
});