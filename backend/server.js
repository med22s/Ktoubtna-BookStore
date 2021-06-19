import express from 'express'
import dotenv from 'dotenv'
import books from './routes/books.js'
import users from './routes/users.js'
import orders from './routes/orders.js'
import upload from './routes/upload.js'
import dbConnection from "./config/db.js";
import error from './middlewares/error.js'
import notfound from './middlewares/notfound.js'
import path from 'path'
import morgan from 'morgan'

const app=express();

dotenv.config();
dbConnection();


app.use(express.json())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}


app.use('/api/books',books)
app.use('/api/users',users)
app.use('/api/orders',orders)
app.use('/api/upload',upload)
app.get('/api/config/paypal',(req,res)=>res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notfound)
app.use(error)






const PORT=process.env.PORT || 5000;



app.listen(PORT,()=>{
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})