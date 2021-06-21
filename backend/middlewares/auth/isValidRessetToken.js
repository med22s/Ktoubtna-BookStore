const httpStatus = require('http-status');
//services
const ResetPasswordService  = require('../../components/auth/resetPasswordService');

const isValidRessetToken = async (req,res,next) => {
    try {
        const resetToken    =   req.params.resetToken || req.body.resetToken;
        let passResetModel  = await ResetPasswordService.isValidToken(resetToken);
        req.userId          = passResetModel.userId;
        req.resetPassword   = passResetModel;
        req.resetToken      = resetToken;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = isValidRessetToken;