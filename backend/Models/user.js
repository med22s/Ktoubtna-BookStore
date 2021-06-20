const  mongoose = require('mongoose');
const ObjectId      = require('mongoose').Types.ObjectId;
const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const {APIError} = require('../utils/errorHandler');
const {hashRounds} = require('../config/config');

/*
* Models
*/
const BookModel  = require('./book');


const userSchema = mongoose.Schema({
    name:{type:String,required:true,trim : true},
    email:{type:String,required:true,trim : true,unique:true},
    password:{type:String,required:true,trim : true},
    isAdmin:{type:Number,required:true,default : 0}
    },
    {
        timestamps:true
    }
)

//for hash password
userSchema.pre('save', async function save(next) {
    try {
        // only hash the password if it has been modified (or is new)
        if (!this.isModified('password')) 
            return next();
        const rounds = hashRounds;
        const hash = await bcrypt.hash(this.password, rounds);
        this.password = hash;
        return next();
    } catch (error) {
        return next(error);
    }
});

//for remove book this user
userSchema.pre('remove', async function save(next) {
    try {
        await BookModel.remove({user : this._id});
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
    },

    /**
    * Get Users
    * @param skip  : how many item to skip 
    * @param limit : number of item to get 
    * @returns Promise<Users, error>
    */
    async getUsers(skip,limit,currentUserId) {
        return await User.find({_id : {$ne : currentUserId}}).select('-password -__v')
                                        .skip(skip)
                                        .limit(limit);
    },

    /*
    * @params id
    * @return : Promise<user,APIError>
    * @description : get user by id
    */
    async getUserById(id) {
        const error = new APIError('user Not Found',httpStatus.NOT_FOUND);
        if(ObjectId.isValid(id))
        {
            let user    = await User.findById(id).select('-password -__v');
            if(!user)
                return Promise.reject(error);
            return Promise.resolve(user);
        }
        return Promise.reject(error);
    },
};


const User=mongoose.model('User',userSchema);

module.exports = User;