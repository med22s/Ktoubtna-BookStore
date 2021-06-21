const asyncHandler  = require('express-async-handler');

/*
* Models
*/
const BookModel = require('../../Models/book');

const foundBook = asyncHandler(async (req,res,next)=>{
    const id = req.params.id;
    let book = await BookModel.getBookById(id);
    req.book = book;
    next();
});
module.exports = foundBook