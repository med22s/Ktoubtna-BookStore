const httpStatus    = require('http-status');
const path          = require('path');
/*
* Models
*/
const BookModel = require('../../Models/book');

/*
* utils
*/
const { APIError }          = require('../../utils/errorHandler');
const { setUpObjectFields } = require('../../utils/field');
const { deleteFile }         =  require('../../utils/helper')

module.exports = class bookService {
    DEFAULT_IMAGE =  "/images/sample.jpg";
    constructor() {}
    /*
    * @params page  : which page we want
    * @params limit : how many item we want 
    * @return       : Promise<Books>
    * @description  : get books
    */
    async getBooks(pageNumber,limit,keyword) {
        const MAX_PAGE_SIZE = 20;
        //if limit more than MAX_PAGE_SIZE just set limit to MAX_PAGE_SIZE 
        limit = Math.min(limit,MAX_PAGE_SIZE);              
        const page = (pageNumber - 1) * limit;    
        return  await BookModel.getBooks(page,limit,keyword);
    };

    async getTopRatedBooks (numberBooks) {
        return await BookModel.find({}).sort({ rating: -1 }).limit(numberBooks)
    }
    /*
    * @params       : id
    * @return       : Promise<Book,APIError>
    * @description  : get book by id
    */
    async getBookById(id) {
        return await BookModel.getBookById(id);
    };
    /*
    * @params       : id
    * @return       : Promise<Book,APIError>
    * @description  : get bookWithReviews by id
    */
    async getBookWithReviews(id) {
        return await BookModel.getBookWithReviews(id);
    };

    /*
    * @params       :id
    * @return       : Promise<success Message,APIError>
    * @description  : delete book by id
    */
    async deleteBook(id) {
        try { 
            const book              = await BookModel.getBookById(id);
            let PromiseResults ;
            if(book.image !== this.DEFAULT_IMAGE)
            {
                const imagePath = path.join(__dirname,'..','..','public',book.image);
                PromiseResults  = await Promise.all([book.remove(),deleteFile(imagePath)]);
            }
            else
            {
                PromiseResults  = await Promise.all([book.remove()]);
            }   
            //delete boook promise result
            if(PromiseResults[0])
                return Promise.resolve({message : "deleted successfully"});
            return Promise.reject(error);
            
        } catch(error) {
            return Promise.reject(error);
        }
    }
    /*
    * @return       : Promise<book,APIError>
    * @description  : create new Book 
    */
    async createBook(userId) {
        const book = new BookModel({
            name: 'Sample name',
            price: 0,
            user: userId,
            image: this.DEFAULT_IMAGE,
            genre: 'Sample genre',
            author: 'Sample author',
            numberInStock: 0,
            numReviews: 0,
            description: 'Sample description',
        })
        
        return await book.save()
    }

    /*
    * @params      : request
    * @return      : Promise<book,APIError>
    * @description : create new Book 
    */
    async updateBook(request) {
        try {
            //get book from request
            let book                = request.book;
            if(request.file)
            {
                //delete old Image if its not default Image
                if(book.image !== this.DEFAULT_IMAGE )
                {
                    let oldImagePath      = path.join(__dirname,'..','..','public');
                    oldImagePath+=book.image;
                    //delete old Image
                    deleteFile(oldImagePath);
                }
                 // setting new Image path
                const newImagePath      = path.join('/images',request.file.filename);
                request.body.imagePath  = newImagePath;
            }
            //update this book
            book                    = await book.updateBook(request.body);
            return Promise.resolve(book);
        } catch(error) {
            return Promise.reject(error);
        }       
    }
}