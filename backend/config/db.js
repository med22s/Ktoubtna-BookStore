import mongoose from 'mongoose';


const dbConnection=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useCreateIndex:true,
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log('Connected to ktoubtna database');
    } catch (error) {
        console.error(`Error : ${error.messsage}`)
        process.exit(1)
    }
}


export default dbConnection;