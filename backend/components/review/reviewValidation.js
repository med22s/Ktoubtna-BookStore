const { body } = require('express-validator');
const reviewSchema = [
    body('rating').trim().default(0).isFloat({ min: 0, max: 5 }).withMessage('Rating must be a number between 0 and 5')
    ,
    body('message').trim().isString().withMessage("Name must be not just Numbers")
        .isLength({ min: 2 }).withMessage("Name must be greather than 2 ")
        .isLength({ max: 100 }).withMessage("Name must be less than 100")

]

module.exports = reviewSchema;