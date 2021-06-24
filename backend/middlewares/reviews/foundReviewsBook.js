const asyncHandler = require('express-async-handler');

/*
* Models
*/
const BookModel = require('../../Models/book');

const foundReviewsBook = asyncHandler(async (req, res, next) => {
    const idBook = req.params.idBook;
    let reviewsBook = await BookModel.getReviewsBook(idBook);
    req.reviews = reviewsBook;
    next();
});
module.exports = foundReviewsBook