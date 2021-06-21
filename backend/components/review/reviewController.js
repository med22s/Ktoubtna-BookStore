const httpStatus = require('http-status');
const asyncHandler = require('express-async-handler');
/*
* services
*/
const reviewServiceClass = require('./reviewService');

/*
* Config
*/
const { role } = require('../../config/config');


/*
* Utils
*/
const { APIError } = require('../../utils/errorHandler');



exports.getReviews = asyncHandler(async (req, res) => {
    const bookId = req.params.bookId;
    //use reviewService to get Reviews Book
    const reviewService = new reviewServiceClass();
    const reviews = await reviewService.getReviews(bookId);
    res.json(reviews)
});


exports.getReviewById = asyncHandler(async (req, res) => {
    const bookId = req.params.bookId;
    const reviewId = req.params.reviewId;
    //use reviewService to get one Review Book By id
    const reviewService = new reviewServiceClass();
    const review = await reviewService.getReviewById(bookId, reviewId);
    res.json(review)
});

exports.deleteReview = asyncHandler(async (req, res) => {
    const bookId = req.params.bookId;
    const reviewId = req.params.reviewId;
    //use reviewService to delete  one Review Book By id
    const reviewService = new reviewServiceClass();
    const result = await reviewService.deleteReview(bookId, reviewId);
    res.json({
        message: result.message
    });
});

exports.deleteReviewLoggedInUser = asyncHandler(async (req, res) => {
    const bookId = req.params.bookId;
    //get  loggedIn user Id
    const loggedInUserId = req.user._id;
    //use reviewService to delete   Review loggedInUser for this  Book 
    const reviewService = new reviewServiceClass();
    const result = await reviewService.deleteReviewLoggedInUser(bookId, loggedInUserId);
    res.json({
        message: result.message
    });
});

exports.AddReview = asyncHandler(async (req, res) => {
    const bookId = req.params.bookId;
    //get  loggedIn user Id
    const loggedInUser = req.user;
    //use reviewService to delete   Review loggedInUser for this  Book 
    const reviewService = new reviewServiceClass();
    const result        = await reviewService.AddReview(bookId, loggedInUser, req.body);
    res.status(httpStatus.CREATED).json({
        message:result.message
    });
});


exports.updateRview = asyncHandler(async (req, res) => {
    const bookId = req.params.bookId;
    const reviewId = req.params.reviewId;
    //use reviewService to Update  one Review By id
    const reviewService = new reviewServiceClass();
    const result = await reviewService.updateReview(bookId, reviewId,req.body);
    res.json({
        message: result.message
    });
});

exports.UpdateReviewLoggedInUser = asyncHandler(async (req, res) => {
    const bookId = req.params.bookId;
    //get  loggedIn user Id
    const loggedInUserId = req.user._id;
    //use reviewService to Update   Review LoggedinUser
    const reviewService = new reviewServiceClass();
    const result = await reviewService.updateReviewLoggedInUser(bookId, loggedInUserId,req.body);
    res.json({
        message: result.message
    });
});
