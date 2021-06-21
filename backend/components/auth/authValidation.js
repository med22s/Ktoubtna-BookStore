const { body } = require('express-validator');

const schema = {
    register : [
        body('name').trim().isString().withMessage("Name must be not just Numbers")
        .isLength({min : 6}).withMessage("Name must be greather than 6 characters")
        .isLength({max : 30}).withMessage("Name must be less than 25 characters")
        ,
        body('email').trim()
        .normalizeEmail().isEmail().withMessage("Email must be valid")            ,
        body('password').trim().isString().withMessage("password must be not just Numbers")
        .isLength({min : 6}).withMessage("password must be greather than 6 characters")
        .isLength({max : 50}).withMessage("password must be less than 50 characters")
    ],
    login : [
        body('email').trim()
        .normalizeEmail().isEmail().withMessage("Email must be valid")            ,
        body('password').trim().isString().withMessage("password must be not just Numbers")
        .isLength({min : 6}).withMessage("password must be greather than 6 characters")
        .isLength({max : 50}).withMessage("password must be less than 50 characters")
    ]
};
module.exports= {
    schema
};