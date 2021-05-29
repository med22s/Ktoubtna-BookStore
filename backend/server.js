import express from 'express'
import dotenv from 'dotenv'
import books from './routes/books.js'
import dbConnection from "./config/db.js";
import error from './middlewares/error.js'
import notfound from './middlewares/notfound.js'

const app=express();

dotenv.config();
dbConnection();


app.use('/api/books',books)

app.use(notfound)
app.use(error)


const PORT=process.env.PORT || 5000;



app.listen(PORT,()=>{
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})