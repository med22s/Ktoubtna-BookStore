const httpStatus = require('http-status');
const  mongoose = require('mongoose');


const blackListTokenSchema=mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            unique : true,
            index: true,
        }
    },
    {
        timestamps:true
    }
)

blackListTokenSchema.statics = {
    async addToken (token){
        try 
        {
            const blackListTokenObj = new blackListToken({
                token 
            });
            return await blackListTokenObj.save();
        } catch (error){
            return Promise.reject(error);
        }
    },
    /*
    * @params token
    * @return  true if exist otherwise false
    */
    async isTokenInBlackList (token) {
        return new Promise(async (resolve, reject) => {
            try {
                let blackListTokenObj = await blackListToken.findOne({token});
                if(blackListTokenObj)
                    return resolve(true);
                return resolve(false);
            } catch( error ) {
                reject(error);
            }
        });
    }
}
const blackListToken = mongoose.model('blackListToken',blackListTokenSchema);

module.exports = blackListToken;