const mongoose = require('mongoose');
const { mongo} = require('./config');

const dbConnection=async ()=>{
    try {
        await mongoose.connect(mongo.uri,{
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

module.exports = {
    dbConnection
}