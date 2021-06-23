const mongoose =require('mongoose') 
const User =require('./Models/user.js') 
const Book =require('./Models/book.js') 
const RefreshToken =require('./Models/refrechToken') 
const Order =require('./Models/order') 
const BlacklistToken =require('./Models/blackListToken') 


const users =require('./data/users.js') 
const books =require('./data/sampleBooks.js') 
const dotenv =require('dotenv') 
const dbConnection =require('./config/db.js') 


dotenv.config();
dbConnection();


const importData = async ()=>{
    try {
        await User.deleteMany()
        await Book.deleteMany()

        const insertedUsers=await User.insertMany(users)
        const userId=insertedUsers[0]._id

        await Book.insertMany(books.map(book=>{
            return {...book,user:userId}
        }))
        console.log('database seeded !!');
        process.exit(0)

    } catch (error) {
        console.error(`Error : ${error.message}`)
        process.exit(1)
    }

}


const destroyData=async ()=>{
    
    try {
        await Promise.all([RefreshToken.deleteMany(),BlacklistToken.deleteMany()]) 
        
        console.log('database data destroyed !!');
        process.exit(0)

    } catch (error) {
        console.error(`Error : ${error.message}`)
        process.exit(1)
    }

}


if(process.argv[2]==='-d'){
    destroyData()
}else
    importData()