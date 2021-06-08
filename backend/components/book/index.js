const express = require('express');
const router = express.Router()



/*
* middlewares
*/
const { isAuth }            = require('../../middlewares/auth/auth');
const { inputValidation }   = require('../../middlewares/inputValidation');
const {uploadImage}         = require('../../middlewares/uploadImage');
const foundBook             = require('../../middlewares/book/foundBook');


/*
* Book validators
*/
const bookSchema = require('./bookValidation');

/*
* Book Controller
*/
const {getBooks,getBookById,deleteBook,createBook,updateBook} = require('./bookController');

/*
* book routes
*/


/*
* GET : /api/books
* @public
* get Books
*/
router.get('/',getBooks);


/*
* GET : /api/books/:id
* @public
* get one Boook by Id
*/
router.get('/:id',getBookById);


/*
* DELETE : /api/books/:id
* @private
* delete one Boook by Id
*/
router.delete('/:id',isAuth(1),deleteBook);



/*
* POST : /api/books/
* @private
* create  Boook 
*/
router.post('/',isAuth(1),uploadImage('image'),bookSchema,inputValidation.validateInputWithFiles,createBook);


/*
* PATCH : /api/books/:id
* @private
* create  Boook 
*/
router.patch('/:id',isAuth(1),foundBook,uploadImage('image'),bookSchema,inputValidation.validateInputWithFiles,updateBook);

module.exports = router