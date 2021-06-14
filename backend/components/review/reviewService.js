const httpStatus = require('http-status');
const path = require('path');
/*
* Models
*/
const BookModel = require('../../Models/book');
const { APIError } = require('../../utils/errorHandler');

/*
* utils
*/

module.exports = class bookService {
    constructor() { }

    /*
    * @params bookId: book Id
    * @return       : Promise<Reviews>
    * @description  : get Reviews Book
    */
    async getReviews(bookId) {
        return await BookModel.getReviews(bookId);
    };
    /*
    * @params bookId    : book Id
    * @params reviewId  : id Review
    * @return           : Promise<review,APIError>
    * @description      : get one review By id
    */
    async getReviewById(bookId, reviewId) {
        //get one Review In book By reviewId
        return await BookModel.getReviewById(bookId, reviewId);
    };

    /*
    * @params bookId      : id Book
    * @params reviewId    : id Review
    * @return             : Promise<success Message,APIError>
    * @description        : delete review By reviewId
    */
    async deleteReview(bookId, reviewId) {
        return await BookModel.removeReviewById(bookId, reviewId);
    }

    /*
    * @params id     : id Book
    * @params userId : id LoggedInUser 
    * @return        : Promise<success Message,APIError>
    * @description   : delete review loggedInUser 
    */
    async deleteReviewLoggedInUser(bookId, userId) {
        return await BookModel.removeReviewUser(bookId, userId);
    }
    /*
   * @params bookId    : Book Id
   * @params userId    : user Id
   * @params payload   : request.body
   * @return           : Promise<Review,APIError>
   * @description      : create New Review 
   */
    async AddReview(bookId, userId, payload) {
        try {
            //get review this user in this book
            let review = await BookModel.getUserReview(bookId, userId);
            //check if this user already has been reviews 
            if (review !== null)
                throw new APIError("this user alreadey has been review this book", httpStatus.BAD_REQUEST);
            //set up review Object           
            const { rating, message } = payload;
            const reviewObj = {
                user: userId,
                rating,
                message
            };
            return await BookModel.AddReview(bookId, reviewObj);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /*
   * @params bookId    : Book Id
   * @params reviewId  : review Id
   * @params payload   : request.body
   * @return           : Promise<Message,APIError>
   * @description      : update  Review 
   */
    async updateReview(bookId, reviewId, payload) {
        const { rating, message } = payload;
        const reviewObj = {
            rating,
            message
        };
        return await BookModel.updateReview(bookId,reviewId, reviewObj);
    }
    /*
   * @params bookId     : Book Id
   * @params userId     : loggedIn User id
   * @params payload    : request.body
   * @return            : Promise<Message,APIError>
   * @description       : update  Review LoggedInUser 
   */
    async updateReviewLoggedInUser(bookId, userId, payload) {
        const { rating, message } = payload;
        const reviewObj = {
            rating,
            message
        };
        return await BookModel.updateReviewUser(bookId,userId, reviewObj);
    }

}