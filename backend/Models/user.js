const  mongoose = require('mongoose');
const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const {APIError} = require('../utils/errorHandler');
const {hashRounds} = require('../config/config');


const userSchema=mongoose.Schema({
    name:{type:String,required:true,trim : true},
    email:{type:String,required:true,trim : true,unique:true},
    password:{type:String,required:true,trim : true},
    isAdmin:{type:Number,required:true,default : 0}
    },
    {
        timestamps:true
    }
)


userSchema.pre('save', async function save(next) {
    try {
        const rounds = hashRounds;
        const hash = await bcrypt.hash(this.password, rounds);
        this.password = hash;
        return next();
    } catch (error) {
        return next(error);
    }
});

/**
 * Methods
 */
userSchema.method({
    //extract data that we show
    transform() {
        const transformed = {};
        const fields = ['id', 'name', 'email','createdAt'];
        fields.forEach((field) => {
            transformed[field] = this[field];
        });
        return transformed;
    },
});


/**
 * Statics
 */
userSchema.statics = {
    /**
   * Get user
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
    async get(id) {
    try {
        let user;

        if (mongoose.Types.ObjectId.isValid(id)) {
            user = await this.findById(id).exec();
        }
        if (user) {
            return user;
        }

        throw new APIError({
            message: 'User does not exist',
            statusCode: httpStatus.NOT_FOUND,
        });
    }catch (error) {
        throw error;
    }
},
    checkDuplicateEmail(error) {
        if (error.name === 'MongoError' && error.code === 11000) {
            return new APIError("email already exists",httpStatus.BAD_REQUEST);
        }
        return error;
    }
};

const User=mongoose.model('User',userSchema);

module.exports = User;