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
    paypalClientId : process.env.PAYPAL_CLIENT_ID
};