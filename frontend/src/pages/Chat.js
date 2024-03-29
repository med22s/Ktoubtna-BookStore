import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../components/TextContainer';
import Messages from '../components/Messages';
import InfoBar from '../components/InfoBar';
import Input from '../components/Input';
import {useSelector,useDispatch} from 'react-redux'
import { USER_LOGOUT } from "../Types/userTypes";
import {bookDetails} from '../actions/bookActions'



let socket;

const Chat = ({history,location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const {book}=useSelector(state=>state.bookDetails)
  const {user}=useSelector(state=>state.userLogin)
  const dispatch=useDispatch()
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  // const [bookId, setBookId] = useState('');
  const [messages, setMessages] = useState([]);
  //const [book, setBook] = useState(null);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    // if(book && !book.name){
    //   console.log('im here')
    //   dispatch(bookDetails(bookId))
    // } 


    if(!book || !book.name){
      dispatch(bookDetails(room))
    }


    if(!user || !user.name){
      dispatch({type:USER_LOGOUT})
      history.push('/')
    }else {
      const connectionOptions =  {
        "force new connection" : true,
        "reconnectionAttempts": "Infinity",
        "timeout" : 10000,
        "transports" : ["websocket"]
    };



    socket = io.connect('http://localhost:5000',connectionOptions);

    setRoom(room)
    setName(name)


    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
        // socket.emit('logout',{room},(error)=>{
        //   console.error(error)
        // })
      }
    });

  }
    

    

  
    
    
  }, [location.search,book,user]);
  





















  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);















  const sendMessage = (e) => {
    e.preventDefault();

    if(message) {
      socket.emit('sendMessage', message,name.trim().toLowerCase(), () => setMessage(''));
    }
  }














  return (
    <div className="outerContainer">
      <div className="mycontainer">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer book={book} users={users}/>
    </div>
  );
}

export default Chat;