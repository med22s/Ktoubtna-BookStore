const jwt=require('jsonwebtoken');


/*
* config
*/
const  {accessTokenSecret,accessTokenExpiration}  = require('../../config/config')
const generateToken= (payload) =>{
    return  jwt.sign(payload, accessTokenSecret, {
        expiresIn: accessTokenExpiration
    })
};

module.exports={
    generateToken
}