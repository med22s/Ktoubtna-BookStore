const jwt =require( 'jsonwebtoken')


const generateAuthToken=(id)=>{
    return jwt.sign({id},process.env.JWT_PRIVATE_KEY,{expiresIn:'30d'})
}
module.exports= generateAuthToken