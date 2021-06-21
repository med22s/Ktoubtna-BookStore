const { body } = require('express-validator');
const bookSchema = [
    body('name').trim().isString().withMessage("Name must be not just Numbers")
    .isLength({min : 4}).withMessage("Name must be greather than 4")
    .isLength({max : 50}).withMessage("Name must be less than 50")
    ,
    body('author').trim().isString().withMessage("author must be not just Numbers")
    .isLength({min : 4}).withMessage("author must be greather than 4")
    .isLength({max : 36}).withMessage("author must be less than 36")
    ,
    body('description').trim().isString().withMessage("description must be not just Numbers")
    .isLength({min : 8}).withMessage("description must be greather than 8")
    .isLength({max : 150}).withMessage("description must be less than 150")
    ,
    body('genre').trim().isString().withMessage("genre must be not just Numbers")
    .isLength({min : 5}).withMessage("genre must be greather than 5")
    .isLength({max : 50}).withMessage("genre must be less than 50")
    ,
    body('price').trim().isDecimal().withMessage("The Book price must be a decimal")
    ,
    body('numberInStock').trim().isNumeric().withMessage("The numberInStock must be Number")
]

module.exports = bookSchema;