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
    constructor() {}
    /*
    * @params page  : which page we want
    * @params limit : how many item we want 
    * @return       : Promise<Books>
    * @description  : get books
    */
    async getBooks(page = 1,limit) {
        const MAX_PAGE_SIZE = 20;
        //if limit more than MAX_PAGE_SIZE just set limit to MAX_PAGE_SIZE       
        limit = Math.min(limit,MAX_PAGE_SIZE);              
        const skip = (page - 1) * limit;    
        return  await BookModel.getBooks(skip,limit);
    };
    /*
    * @params       : id
    * @return       : Promise<Book,APIError>
    * @description  : get book by id
    */
    async getBookById(id) {
        try {
            let book = await BookModel.getBookById(id);
            book     = book.transform(book.user);
            return Promise.resolve(book);
        } catch(error) {
            return Promise.reject(error);
        }
    };

    /*
    * @params       :id
    * @return       : Promise<success Message,APIError>
    * @description  : delete book by id
    */
    async deleteBook(id) {
        try { 
            const book              = await BookModel.getBookById(id);
            const imagePath         = path.join(__dirname,'..','..','public',book.image);
            const PromiseResults    = await Promise.all([book.remove(),deleteFile(imagePath)]);
            //delete boook promise result
            if(PromiseResults[0])
                return Promise.resolve({message : "deleted successfully"});
            return Promise.reject(error);
            
        } catch(error) {
            return Promise.reject(error);
        }
    }
    /*
    * @params       : request
    * @return       : Promise<book,APIError>
    * @description  : create new Book 
    */
    async createBook(request) {
        if (!request.file) {
            return Promise.reject(new APIError('No image provided.',httpStatus.UNPROCESSABLE_ENTITY));
        }
        const imagePath         = path.join('images',request.file.filename);
        const registerPayload   = ['name','author','description','genre','price','numberInStock'];
        const bookBody          = setUpObjectFields(request.body,registerPayload);
        bookBody.user           = request.user._id;
        bookBody.image          = imagePath;
        let book                = await new BookModel(bookBody).save();
        book                    = book.transform(request.user);
        return Promise.resolve(book);
    }

    /*
    * @params      : request
    * @return      : Promise<book,APIError>
    * @description : create new Book 
    */
    async updateBook(request) {
        try {
            if (!request.file) {
                return Promise.reject(new APIError('No image provided.',httpStatus.UNPROCESSABLE_ENTITY));
            }
            const id                = request.params.id;
            //get book
            let book                = await BookModel.getBookById(id);
            const oldImagePath      = path.join(__dirname,'..','..','public',book.image);
            //delete old Image
            deleteFile(oldImagePath);
            // setting new Image path
            const newImagePath      = path.join('images',request.file.filename);
            request.body.imagePath  = newImagePath;
            //update this book
            book                    = await book.updateBook(request.body);
            //transform book data 
            book                    = book.transform(request.user);
            return Promise.resolve(book);
        } catch(error) {
            return Promise.reject(error);
        }       
    }
}