
const {refreshTokenExpirationNumberDays}  = require('../config/config')

setRefreshTokenCookie = (res,token) =>{
    let maxAge=refreshTokenExpirationNumberDays*60*60*1000*24;
    res.cookie('refreshToken',token,{
        httpOnly : true, maxAge : maxAge , path : "/api/auth/"
    })
    
}

destroyCookie= async (res,name,path) => {
    res.cookie(name, "", { expires: new Date(0), path : path });    
}

module.exports = {
    setRefreshTokenCookie,
    destroyCookie
}