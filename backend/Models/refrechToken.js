const mongoose = require('mongoose');
const crypto = require('crypto');
const { APIError } = require('../utils/errorHandler');
const httpStatus = require('http-status');
const {refreshTokenExpirationNumberDays}= require('../config/config');

/**
 * Refresh Token Schema
 * @private
 */
const refreshTokenSchema = new mongoose.Schema({
    token: {
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
    used : {
        type : Number,
        default : 0
    },
    expires: { type: Date },
});

refreshTokenSchema.methods = {
    async updateTokenNumberUsed()
    {
            this.used +=1; 
            return await this.save();
    }
}

refreshTokenSchema.statics = {
    /*
    *  @param {Userid} 
    * @returns {RefreshToken}
    */
    generate(userId) 
    {
        const token = `${userId}.${crypto.randomBytes(40).toString('hex')}`;
        return token;
    },
    async addRefreshToken (userId,refreshToken){
        try 
        {
            let expires=new Date();
            expires.setDate(expires.getDate() + refreshTokenExpirationNumberDays);
            const tokenObject = new RefreshToken({
                token  : refreshToken, 
                userId : userId,
                expires: expires
            });
            return await tokenObject.save();
        } catch (error){
            return Promise.reject(error);
        }
    
    },
    async getByToken(token)
    {
        try 
        {
            const refToken= await RefreshToken.findOne({token});
            if(refToken)
            {
                return refToken;
            }
            throw new APIError("Refrech Token Not Valide",httpStatus.UNAUTHORIZED)
        } catch (error){
            return  Promise.reject(error);
        }
    },
    async removeByToken(token)
    {
        try 
        {
            const refToken= await RefreshToken.deleteOne({token});
            if(refToken)
            {
                return refToken;
            }
            throw new APIError("Refrech Token Not Valide",httpStatus.UNAUTHORIZED)
        } catch (error){
            return Promise.reject(error);
        }
    }
}

/**
 * @typedef RefreshToken
 */
const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
module.exports = RefreshToken;