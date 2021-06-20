const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
const httpStatus = require('http-status');

/*
* config
*/
const { serverHost, serverPort } = require('../config/config');

/*
* utils
*/
const { APIError } = require('../utils/errorHandler');

/*
* schema
*/

const reviewSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    rating: { type: Number, required: true },
    message: { type: String, required: true }
},
    {
        timestamps: true
    }
);

const bookSchema = mongoose.Schema({
    id: false,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    numberInStock: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 }
},
    {
        toJSON: { virtuals: true },
    },
    { timestamps: true },
)


/*
* virtual  Proporitie
*/

bookSchema.virtual('imageUrl').get(function () {
    if (this.image)
        return `http://${serverHost}:${serverPort}${this.image}`;
});

/**
 * Methods
 */
bookSchema.method({
    //extract data that we show
    transform(user) {
        const transformed = {};
        const fields = ['_id', 'name', 'author', 'description', 'genre', 'price', 'numberInStock', 'rating', 'numReviews', 'reviews', 'createdAt', 'updatedAt'];
        fields.forEach((field) => {
            transformed[field] = this[field];
        });
        transformed['imageUrl'] = `http://${serverHost}:${serverPort}/${this['image']}`
        transformed['user'] = user;
        return transformed;
    },

    async updateBook(payload) {
        try {
            const bookPayload = ['name', 'author', 'description', 'genre', 'price', 'numberInStock'];
            bookPayload.map((field) => {
                this[field] = payload[field];
            });
            if(payload.imagePath)
                this.image = payload.imagePath;
            return Promise.resolve(await this.save());
        } catch (error) {
            return Promise.reject(error);
        }
    },

});



/**
 * Statics
 */
bookSchema.statics = {
    /**
    * Get Books
    * @param pageNumber  : how many item to skip 
    * @param limit : number of item to get 
    * @returns Promise<Books, error>
    */
    async getBooks(pageNumber, limit,keyword) {
        const count = await Book.countDocuments({ ...keyword })

        const books = await Book.find({ ...keyword }).select('-__v -reviews')
            .skip(pageNumber)
            .limit(limit);
        return Promise.resolve({ books, pageNumber, pages: Math.ceil(count / limit) })
    },
    /*
    * @params id
    * @return : Promise<Book,APIError>
    * @description : get book by id
    */
    async getBookById(id) {
        const error = new APIError('book Not Found', httpStatus.NOT_FOUND);
        if (ObjectId.isValid(id)) {
            let book = await Book.findById(id).populate({
                path: 'user',
                select: '-password -__v  -createdAt -updatedAt'
            }).select('-__v -reviews -id');
            if (!book)
                return Promise.reject(error);
            return Promise.resolve(book);
        }
        return Promise.reject(error);
    },
    async getBookWithReviews(id){
        const error = new APIError('book Not Found', httpStatus.NOT_FOUND);
        if (ObjectId.isValid(id)) {
            let book = await Book.findById(id);
            if (!book)
                return Promise.reject(error);
            return Promise.resolve(book);
        }
        return Promise.reject(error);
    },

    //************************** static Method For Reviews ************************************
    /*
    * @params id
    * @return : Promise<Reviews,APIError>
    * @description : get reviews boook 
    */
    async getReviews(id) {
        const error = new APIError('book Not Found', httpStatus.NOT_FOUND);
        if (ObjectId.isValid(id)) {
            let reviews = await Book.findById(id)
                .populate({
                    path: 'reviews.user',
                    select: '-password   -__v  -createdAt -updatedAt'
                })
                .select('reviews -_id');
            if (!reviews)
                return Promise.reject(error);
            return Promise.resolve(reviews);
        }
        return Promise.reject(error);
    },

    /*
    * @params idBook   : bookId
    * @params idReview : reviewId
    * @return : Promise<review,APIError>
    * @description : get one reviews book  by Id
    */
    async getReviewById(bookId, reviewId) {
        const error = new APIError('Not Found!', httpStatus.NOT_FOUND);
        if (ObjectId.isValid(bookId) && ObjectId.isValid(reviewId)) {
            let review = await Book.findOne({ _id : bookId , 'reviews._id' : reviewId }).populate({
                    path: 'reviews.user',
                    select: '-password   -__v  -createdAt -updatedAt'
                })
                .select('reviews.$ -_id');
            if (!review || review.length === 0)
                return Promise.reject(error);
            return Promise.resolve(review);
        }
        return Promise.reject(error);
    },
    /*
  * @params idBook    : bookId
  * @params userId    : reviewId
  * @return : Promise<review,APIError>
  * @description : get one reviews book  by userId
  */
    async getUserReview(bookId, userId) {
        const error = new APIError('Not Found!', httpStatus.NOT_FOUND);
        if (ObjectId.isValid(bookId)) {
            let review = await Book.findOne({ _id: bookId, 'reviews.user': userId })
            return Promise.resolve(review);
        }
        return Promise.reject(error);
    },

    /*
    * @params idBook   : bookId
    * @params idReview : reviewId
    * @return : Promise<review,APIError>
    * @description : remove one reviews book  by Id
    */
    async removeReviewById(bookId, reviewId) {
        const error = new APIError('Not Found!', httpStatus.NOT_FOUND);
        if (ObjectId.isValid(bookId) && ObjectId.isValid(reviewId)) {
            const result = await Book.updateOne({ _id: bookId }, { $pull: { reviews: { _id: reviewId } } });
            if (result.nModified != 0)
                return Promise.resolve({ message: "deleted successfully" });
        }
        return Promise.reject(error);
    },
    /*
    * @params bookId   : bookId
    * @params userId   : userId
    * @return : Promise<review,APIError>
    * @description : remove review user for Book
    */
    async removeReviewUser(bookId, userId) {
        const error = new APIError('Not Found!', httpStatus.NOT_FOUND);
        if (ObjectId.isValid(bookId)) {
            const result = await Book.updateOne({ _id: bookId }, { $pull: { reviews: { user: userId } } });
            if (result.nModified != 0)
                return Promise.resolve({ message: "deleted successfully" });
        }
        return Promise.reject(error);
    },
    /*
    * @params reviewObj : review Object
    * @params bookId    : book Id
    * @return           : Promise<review,APIError>
    * @description      : add new  Review to this Book
    */
    async AddReview(bookId, reviewObj) {
        return await Book.findOneAndUpdate(
            { _id: bookId },
            { $push: { reviews: reviewObj },
        },
        );
    },
    /*
    * @params bookId    : book Id
    * @params reviewId  : review Id
    * @params reviewObj : review Object
    * @return           : Promise<message,APIError>
    * @description      : update   Review By ReviewId
    */
    async updateReview(bookId,reviewId ,reviewObj) {
        const error = new APIError('update review Failed!', httpStatus.NOT_FOUND);
        if (ObjectId.isValid(bookId) && ObjectId.isValid(reviewId)) {
            let updateReviewResult = await Book.updateOne(
                { _id : bookId , 'reviews._id' : reviewId }, 
                {
                    $set: {
                        'reviews.$.rating' : reviewObj.rating,
                        'reviews.$.message' : reviewObj.message,
                    }
                }
            );
            if(updateReviewResult.nModified !== 0)
                return Promise.resolve({message: "review updated successfully!"});
        }
        return Promise.reject(error);
    }, 
    /*
    * @params bookId    : book Id
    * @params userId    : user Id
    * @params reviewObj : review Object
    * @return           : Promise<message,APIError>
    * @description      : update  Review by User Id
    */
    async updateReviewUser(bookId,userId ,reviewObj) {
        const error = new APIError('update review Failed!', httpStatus.NOT_FOUND);
        if (ObjectId.isValid(bookId) && ObjectId.isValid(userId)) {
            let updateReviewResult = await Book.updateOne(
                { _id : bookId , 'reviews.user' : userId }, 
                {
                    $set: {
                        'reviews.$.rating' : reviewObj.rating,
                        'reviews.$.message' : reviewObj.message,
                    }
                }
            );
            if(updateReviewResult.nModified !== 0)
                return Promise.resolve({message: "review updated successfully!"});
        }
        return Promise.reject(error);
    }, 

}

const Book = mongoose.model('book', bookSchema);

module.exports = Book;