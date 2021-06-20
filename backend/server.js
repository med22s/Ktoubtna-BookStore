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
import cors from 'cors'
import { Server } from 'socket.io';
import { createServer } from 'http';
import { addUser,removeUser,getUser,getUsersInRoom } from './users.js'

const app=express();

app.use(cors());

dotenv.config();
dbConnection();


// init socket instance

const server = createServer(app); 
const io = new Server(server,{
    cors: {
      origin: "http://localhost:3000",
      credentials: true
    }
  })


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



// socket logic 


io.on('connect', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
      let { error, user,userChanged,msg } = addUser({ id: socket.id, name, room });

      console.log('join',socket.id)


      if(msg && userChanged){
        socket.leave(userChanged.room)
        userChanged.room=room
        user=userChanged
        socket.join(room);
        console.log('case 1',user)
      }else if(user){
        socket.join(user.room);
        console.log('case 2',user)
      }else if(error){
        return callback(error);
      }
  
      

      // emit a message 
  
      socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});

      // broadcat to everyone except that socket
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
  
      // this to display users to a connected one
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
  
      callback();
    });
  
    socket.on('sendMessage', (message,name, callback) => {
      console.log(name)
      const user = getUser(name);

      console.log('user',user)
      console.log('socketid',socket.id)
  
      io.to(user.room).emit('message', { user: user.name, text: message });
  
      callback();
    });
  
    socket.on('disconnect', () => {
      const user = removeUser(socket.id);
  
      if(user) {
        io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
      }
    })

    // socket.on('logout', (room,callback) => {
    //   const user = removeUser(socket.id);
    //   console.log(user)
    //   if(user){
    //     socket.leave(room)
    //   }

    //   callback()
    // })



  });



  server.listen(PORT,()=>{
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})