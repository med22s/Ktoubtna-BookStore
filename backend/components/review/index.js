const express = require('express');
const router = express.Router({ mergeParams: true });

/*
* Config
*/
const { role } = require('../../config/config');



/*
* middlewares
*/
const { isAuth } = require('../../middlewares/auth/auth');
const { inputValidation } = require('../../middlewares/inputValidation');
const foundReviewsBook = require('../../middlewares/reviews/foundReviewsBook');


/*
* review validators
*/
const reviewSchema = require('./reviewValidation');

/*
* review Controller
*/
const { getReviews, getReviewById, deleteReview, deleteReviewLoggedInUser, AddReview, updateRview, UpdateReviewLoggedInUser } = require('./reviewController');

/*
* review routes
*/


/*
* GET : /api/books/:idBook/reviews/
* @public
* get reviews 
*/
router.get('/', getReviews);


/*
* GET : /api/books/:idBook/reviews/:reviewId
* @public
* get one review by reviewId
*/
router.get('/:reviewId', getReviewById);


/*
* DELETE : /api/books/:idBook/reviews/:reviewId
* @private
* delete  review by reviewId
*/
router.delete('/:reviewId', isAuth(role.admin), deleteReview);


/*
* DELETE : /api/books/:idBook/reviews/
* @private
* delete  review loggedIn user for this book
*/
router.delete('/', isAuth(role.user), deleteReviewLoggedInUser);

/*
* POST : /api/books/:idBook/reviews/
* @private
* create  new review   
*/
router.post('/', isAuth(role.user), reviewSchema, inputValidation.validateInput, AddReview);


/*
* PATCH : /api/books/:idBook/reviews/:reviewId
* @private
* update   review by reviewId
*/
router.patch('/:reviewId', isAuth(role.admin), reviewSchema, inputValidation.validateInput, updateRview);


/*
* PATCH : /api/books/:id/reviews/
* @private
* update review   loggedIn user for this Book
*/
router.patch('/', isAuth(role.user),  reviewSchema, inputValidation.validateInput, UpdateReviewLoggedInUser);

module.exports = router