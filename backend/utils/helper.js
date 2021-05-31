
const {refreshTokenExpirationNumberDays}  = require('../config/config')

setRefreshTokenCookie = async (res,token) =>{
    let maxAge=refreshTokenExpirationNumberDays*60*60*1000*24;
    res.cookie('refreshToken',token,{
        httpOnly : true, maxAge : maxAge , path : "/api/auth/token"
    })
    
}


module.exports = {
    setRefreshTokenCookie
}