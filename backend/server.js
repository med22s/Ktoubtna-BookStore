import express from 'express'
import dotenv from 'dotenv'


const app=express();
import dbConnection from "./config/db.js";
dotenv.config();

import books from './sampleBooks.js'

app.get('/api/books',(req,res)=>{
    res.json(books);
})

app.get('/api/books/:id',(req,res)=>{

    res.json(books.find(book=>book._id===req.params.id));
})


const PORT=process.env.PORT || 5000;

dbConnection();

app.listen(PORT,()=>{
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})