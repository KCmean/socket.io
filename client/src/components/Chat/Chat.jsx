import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css'


const Chat = () => {
  const location = useLocation();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const ENDPOINT = 'localhost:5000';

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

  useEffect(() => {
    const socket = io(ENDPOINT, {
      transports: ['websocket']
    },)
    socket.on('message', (message) => {
      setMessages([...messages, message])

    }, [messages])
  })


  //function for sending messages
  const sendMessage = (event) => {
    event.preventDefault();
    const socket = io(ENDPOINT, {
      transports: ['websocket']
    },)
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  console.log(message, messages);

  return (
    <div className='outerContainer'>
      <div className='container'>
        <input
          value={message}
          type="text"
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' ? sendMessage(event) : null}

        />
      </div>
    </div>
  )
}

export default Chat;