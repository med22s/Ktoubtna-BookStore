import mongoose from 'mongoose'
import User from './Models/user.js'
import Book from './Models/book.js'
import users from './data/users.js'
import books from './data/sampleBooks.js'
import dotenv from 'dotenv'
import dbConnection from './config/db.js'


dotenv.config();
dbConnection();


const importData=async ()=>{
    

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
        await User.deleteMany()
        await Book.deleteMany()

        
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