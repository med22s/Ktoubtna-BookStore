const { body } = require('express-validator');
const userSchema ={ 
    updateUser : [
        body('name').trim().isString().withMessage("Name must be not just Numbers")
            .isLength({min : 6}).withMessage("Name must be greather than 6")
            .isLength({max : 30}).withMessage("Name must be less than 30")
        ,
        body('email').trim().isEmail().withMessage("must be Valide Email"),
        body('isAdmin').trim().custom((value) => {
            if(value)
            {
                if(value > 1)
                    throw new Error('isAdmin value Not Valide!');
            }
            return true;
        }),
    ],
    updateProfile : [
        body('name').trim().isString().withMessage("Name must be not just Numbers")
            .isLength({min : 6}).withMessage("Name must be greather than 6")
            .isLength({max : 30}).withMessage("Name must be less than 30")
        ,
        body('email').trim().isEmail().withMessage("must be Valide Email"),
        body('password').custom((value) => {
            if(value)
            {
                let isnum = /^\d+$/.test(value);
                if(isnum)
                    throw new Error('password must be not just Numbers');
                if (value.length < 6) 
                    throw new Error('password must be greather than 6');
                else if(value.length > 50) 
                    throw new Error('password must be less than 50');
            }
            return true;
        }),
        body('confirmPassword').custom((value, { req }) => {
            if (req.body.password && value !== req.body.password) {
                throw new Error(' confirm Password  does not match password');
            }
            return true;
        })
    ],
}

module.exports = userSchema;