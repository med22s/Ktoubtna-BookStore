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
    async AddReview(bookId, user, payload) {
        try {
            const book = await BookModel.findById(bookId)

            if (book) {
                const alreadyReviewed = book.reviews.find(
                    (r) => r.user.toString() === user._id.toString()
                )
            

                if (alreadyReviewed) {
                    throw new APIError('Book already reviewed',httpStatus.BAD_REQUEST);
                }

                //set up review Object           
                const { rating, message } = payload;
                const review = {
                    name : user.name,
                    user : user._id,
                    rating,
                    message
                };
                book.reviews.push(review);
                book.numReviews = book.reviews.length

                book.rating =
                    book.reviews.reduce((acc, item) => item.rating + acc, 0) /
                    book.reviews.length

                await book.save();
                return Promise.resolve({ message: 'Review added' });
            }
            else {
                throw new APIError('Book Not found',httpStatus.NOT_FOUND);
            }
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