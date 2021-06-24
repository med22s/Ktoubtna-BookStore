const httpStatus = require('http-status');
const  mongoose = require('mongoose');
const { APIError } = require('../utils/errorHandler');


const resetPasswordSchema=mongoose.Schema({
        resetToken: {
            type: String,
            required: true,
            unique : true,
            index: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        email:{type:String,required:true,trim : true},
        name:{type:String,required:true},
        dateExpiration : { type : Date,required : true } 
    }, {
        timestamps:true
    }
)

resetPasswordSchema.statics = {
    async createResetPasswordToken(resetPasswordObj) {
        const resetPassword = new ResetPassword(resetPasswordObj);
        return await resetPassword.save();
    },

    async getRessetPasswordTokenByToken( token) {
        try {
            let resetToken = await ResetPassword.findOne({resetToken : token })
            if(!resetToken) 
                throw new APIError('this reset Password token Not found ',httpStatus.NOT_FOUND);
            return Promise.resolve(resetToken);
        } catch(error) {
            return Promise.reject(error);
        }
        
    },
    async getRessetTokenByEmail(email) {
        try {
            let resetToken = await ResetPassword.findOne({email : email })
            if(!resetToken) 
                throw new APIError('this reset Password token Not found ',httpStatus.NOT_FOUND);
            return Promise.resolve(resetToken);
        } catch(error) {
            return Promise.reject(error);
        }
    },


    async deleteResetPasswordToken(resetPasswordToken) {
        try {
            const result = await resetPasswordToken.remove();
            if (result.nModified === 0)
                throw new APIError('reset Password Token Not found',httpStatus.NOT_FOUND);
            return Promise.resolve({msg : "deleted seccussfuly"});
        } catch(error) {
            return Promise.reject(error);
        }
    }
}
const ResetPassword = mongoose.model('resetPassword',resetPasswordSchema);

module.exports = ResetPassword;