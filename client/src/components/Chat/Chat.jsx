import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css'
import Infobar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket;

const Chat = () => {
  const location = useLocation();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const ENDPOINT = 'ws://localhost:3000';

  // console.log(location)


  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    const socket = io(ENDPOINT, {
      transports: ['websocket']
    },)
    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, ({ error }) => {
      alert(error);
    });

    console.log(socket);

    return () => {
      socket.emit('disconnect')

      socket.off();
    }
  }, [ENDPOINT, location.search]);

  // useEffect(() => {
  //   socket.on('message', (message) => {
  //     setMessages([...messages, message])

  //   }, [messages])
  // })


  //function for sending messages
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  console.log(message, messages);

  return (
    <div className='outerContainer'>
      <div className='container'>
        <Infobar room={room} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessag={setMessage} sendMessage={sendMessage}/>
      </div>
    </div>
  )
}

export default Chat;