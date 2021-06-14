const mongoose = require('mongoose');

const User = require('./Models/user')
const Book = require('./Models/book.js')
const users = require('./data/users.js');
const books = require('./data/sampleBooks.js');
const { dbConnection } = require('./config/db');

dbConnection();


const importData = async () => {


    try {
        await User.deleteMany()
        await Book.deleteMany()

        const insertedUsers = await User.insertMany(users)
        const userId = insertedUsers[0]._id
        let i = 0;
        await Book.insertMany(books.map(book => {
            return { ...book, user: userId, reviews: { user: insertedUsers[(i++) % 4]._id, rating: 4.5, message: "nice Book" } }
        }))
        console.log('database seeded !!');
        process.exit(0)

    } catch (error) {
        console.error(`Error : ${error}`)
        process.exit(1)
    }

}


const destroyData = async () => {

    try {
        await User.deleteMany()
        await Book.deleteMany()


        console.log('database data destroyed !!');
        process.exit(0)

    } catch (error) {
        console.error(`Error : ${error}`)
        process.exit(1)
    }

}


if (process.argv[2] === '-d') {
    destroyData()
} else
    importData()