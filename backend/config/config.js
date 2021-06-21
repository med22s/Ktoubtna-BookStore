require("dotenv").config(
    { 
        path: __dirname+'/./../../.env'
    }
);

module.exports = {
    serverPort: process.env.PORT || 3000,
    serverHost: process.env.SERVER_HOST,
    nodeEnv: process.env.NODE_ENV || "developement",

    hashRounds: process.env.NODE_ENV  !== 'production' ? 1 : process.env.HASHROUNDS,

    accessTokenSecret : process.env.ACCESS_Token_SECRET,
    refreshTokenSecret: process.env.REFRESH_Token_SECRET,
    accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION,
    refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION,
    refreshTokenExpirationNumberDays: process.env.REFRESH_TOKEN_EXPIRATION_NUMBER_DAYS || 1,
    mongo: {
        uri: process.env.MONGO_URI
    },
    role : {
        user  : 0, 
        admin : 1
    },
    paypalClientId : process.env.PAYPAL_CLIENT_ID,
    emailConfig: {
        mailHost      : process.env.MAILSERVER_HOST,
        mailPort      : process.env.MAILSERVER_PORT,
        mailUserName  : process.env.MAILSERVER_UserName,
        mailPassword  : process.env.MAILSERVER_PASSWORD,
        smtpEmailFrom : process.env.SMTP_FROM_EMAIL
    },
    Contents: {
        passwordReset: {
            subject: "Password Reset",
            contentText: null,
            contentHtml: (
                userName,
                link
            ) => `<h3>Hello ${userName}</h3>, <p>A Reset password demand was made using your email, please click the following link to reset your password: <a href="${link}">Reset Password Link</a></p>
                <p>If you didn't send any reset request, please ignore this email.</p>`,
            link: (resetCode) => `http://localhost:3000/resetPassword/${resetCode}`,
        },
    },
    resetTokenExpiration: process.env.RESET_TOKEN_EXPIRATION || "0.5",
};