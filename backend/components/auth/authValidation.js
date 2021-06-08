const { body } = require('express-validator');

const schema = {
    register : [
        body('name').trim().isString().withMessage("Name must be not just Numbers")
        .isLength({min : 6}).withMessage("Name must be greather than 6")
        .isLength({max : 30}).withMessage("Name must be less than 25")
        ,
        body('email').trim()
        .normalizeEmail().isEmail().withMessage("must be Valide Email")            ,
        body('password').trim()
        .isLength({min : 6}).withMessage("password must be greather than 6")
        .isLength({max : 50}).withMessage("password must be less than 50")
    ],
    login : [
        body('email').trim()
        .normalizeEmail().isEmail().withMessage("must be Valide Email")            ,
        body('password').trim().isString().withMessage("Name must be not just Numbers")
        .isLength({min : 6}).withMessage("password must be greather than 6")
        .isLength({max : 50}).withMessage("password must be less than 50")
    ]
};
module.exports= {
    schema
};