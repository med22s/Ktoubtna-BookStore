const express       = require('express');
const path          = require('path');
const morgan        = require('morgan');
const cookieParser  = require('cookie-parser');
const cors          = require('cors');
const { Server }    = require('socket.io');
const {createServer}= require('http');
const indexRoute    = require( '../routes/index');
const error         = require('../middlewares/error.js');
const notfound      = require( '../middlewares/notfound');
/*
* utils
*/
const { addUser,removeUser,getUser,getUsersInRoom } = require('../utils/socket/users');


/*
* config
*/
const config = require("./config");
/**
* Express instance
* @public
*/
const app = express();

/*
* config socket.io
*/
const server = createServer(app); 
const io = new Server(server,{
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
})


app.use(cookieParser());
// parse body params and attache them to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/images',express.static(path.join(__dirname,'..','public','images')));

app.use(morgan('tiny'));

// lets you use HTTP verbs such as PUT or DELETE
// enable CORS - Cross Origin Resource Sharin  g

if (config.nodeEnv !== "production") {
    app.use(cors());
}
app.use('/api',indexRoute)

app.use(notfound)
app.use(error)


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


module.exports = server;