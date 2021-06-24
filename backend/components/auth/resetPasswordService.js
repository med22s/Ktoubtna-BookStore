const crypto = require('crypto');
const httpStatus = require('http-status');
const moment= require('moment-timezone');
const {emailConfig,Contents,resetTokenExpiration} =require('../../config/config');
const {passwordReset} =Contents;

const User              = require('../../Models/user');

const MailService = require('./mail.service');

const ResetPasswordModel = require('../../Models/resetPassword');
const { APIError } = require('../../utils/errorHandler');
module.exports = class ResetPasswordService {
    constructor() {}

    getDateExpiration()
    {
        let dateExpiration = moment().add(resetTokenExpiration,'hours').toDate();
        return dateExpiration;
    };
    /*
    * generate reset token 
    */
    async generate(userId)
    {
        const resetToken = `${userId}.${crypto.randomBytes(40).toString('hex')}`;
        return resetToken;
    }
    
    static async isValidToken (resetToken)
    {
        return new Promise(async (resolve, reject) => {
            try {
                let PassResetObject = await ResetPasswordModel.getRessetPasswordTokenByToken(resetToken);
                //check if this token is expired
                let actuelDate = new Date();
                let tokenExpirationDate = new Date(PassResetObject.dateExpiration);
                if(actuelDate.getTime() > tokenExpirationDate.getTime())
                {
                    throw new APIError("this reset token is expired please try to send new reset password email",httpStatus.BAD_REQUEST)
                }
                return resolve(PassResetObject);
            } catch (error) {
                return reject (error);
            } 
        });
    }
    async  forgotPassword(email)
    {
        try {
                    //get user if exist
        let user =  await User.findOne({email : email});
        if(!user)
            return Promise.reject(new APIError('user Not found',httpStatus.NOT_FOUND))
        let userId=user._id;
        let name=user.name;
        let resetToken = await this.generate(name);
        let dateExpiration = this.getDateExpiration();
        const passwordResetPayload = {
            resetToken,
            userId,
            email,
            name,
            dateExpiration
        };


        await ResetPasswordModel.createResetPasswordToken(passwordResetPayload);
        
        //send mail
        let mailService = new MailService();
        let emailtransporter = mailService.createTransporter();
        await mailService.sendMail(
            emailtransporter,
            emailConfig.mailUserName,
            email,
            passwordReset.subject,
            passwordReset.contentText,
            passwordReset.contentHtml(
                name,
                passwordReset.link(resetToken)
            )
        );
        return Promise.resolve({
            message:
                "email sent successfully, please check your email"
        });
        } catch(error ) {
            return Promise.reject(error);
        }
    }
}