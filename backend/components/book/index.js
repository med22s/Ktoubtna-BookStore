const express = require('express');
const router = express.Router()

/*
* Config
*/
const { role }            = require('../../config/config');


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
const {getBooks,getBookById,deleteBook,createBook,updateBook,getTopRatedBooks} = require('./bookController');

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
* GET : /api/books
* @public
* get topBooks
*/
router.get('/top', getTopRatedBooks)



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
router.delete('/:id',isAuth(role.admin),deleteBook);



/*
* POST : /api/books/
* @private
* create  Boook 
*/
router.post('/',isAuth(role.admin),createBook);


/*
* PATCH : /api/books/:id
* @private
* update  Boook 
*/
router.patch('/:id',isAuth(role.admin),foundBook,uploadImage('image'),bookSchema,inputValidation.validateInputWithFiles,updateBook);

module.exports = router