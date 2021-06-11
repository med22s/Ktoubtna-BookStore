const  mongoose  = require('mongoose');
const ObjectId      = require('mongoose').Types.ObjectId;
const httpStatus = require('http-status');

/*
* config
*/
const {serverHost,serverPort} = require('../config/config');

/*
* utils
*/
const { APIError }            = require('../utils/errorHandler');

/*
* schema
*/

const reviewSchema = mongoose.Schema({
        userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true, index: true, unique: true},
        rating:{type:Number,required:true},
        message:{type:String,required:true}
    },
    {
        timestamps:true
    }
);

const bookSchema   = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    name:{type:String,required:true},
    author:{type:String,required:true},
    image:{type:String,required:true},
    description:{type:String,required:true},
    genre:{type:String,required:true},
    reviews:[reviewSchema],
    rating:{type:Number,required:true,default:0},
    price:{type:Number,required:true,default:0},
    numberInStock:{type:Number,required:true,default:0},
    numReviews:{type:Number,required:true,default:0}
},
{
    toJSON: { virtuals: true },
},
{timestamps:true})


/*
* virtual  Proporitie
*/

bookSchema.virtual('imageUrl').get(function() {
    return `http://${serverHost}:${serverPort}/${this.image}`;
});

/**
 * Methods
 */
bookSchema.method({
    //extract data that we show
    transform(user) {
        const transformed = {};
        const fields = ['id', 'name', 'author','description','genre','price','numberInStock','rating','numReviews','reviews','createdAt','updatedAt'];
        fields.forEach((field) => {
            transformed[field] = this[field];
        });
        transformed['imageUrl'] = `http://${serverHost}:${serverPort}/${this['image']}`
        transformed['user'] = user;
        return transformed;
    },

    async updateBook(payload)
    {
        try 
        {
            const bookPayload   = ['name','author','description','genre','price','numberInStock'];
            bookPayload.map((field) => {
                this[field] = payload[field];
            });
            this.image      = payload.imagePath;
            return Promise.resolve(await this.save());
        } catch (error){
            return Promise.reject(error);
        }
    }
});



/**
 * Statics
 */
bookSchema.statics = {
    /**
    * Get Books
    * @param skip  : how many item to skip 
    * @param limit : number of item to get 
    * @returns Promise<Books, error>
    */
    async getBooks(skip,limit) {
        return await Book.find({}).populate({
                                            path: 'user',
                                            select : '-password   -__v  -createdAt -updatedAt'
                                        }).select('-__v')
                                        .skip(skip)
                                        .limit(limit);
    },

    /*
    * @params id
    * @return : Promise<Book,APIError>
    * @description : get book by id
    */
    async getBookById(id) {
        const error = new APIError('book Not Found',httpStatus.NOT_FOUND);
        if(ObjectId.isValid(id))
        {
            let book    = await Book.findById(id).populate({
                            path: 'user',
                            select : '-password -__v  -createdAt -updatedAt'
                        }).select('-__v');
            if(!book)
                return Promise.reject(error);
            return Promise.resolve(book);
        }
        return Promise.reject(error);
    },

}

const Book = mongoose.model('book',bookSchema);

module.exports = Book;