import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';


const Chat = () => {
  const location = useLocation();
  const [name, setName] = useState("");
  const [room, setRoom]  = useState("");
  const ENDPOINT = 'localhost:5000';

  // console.log(location)


  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    // const socket = io(ENDPOINT);

    // const socket = io(ENDPOINT, {
    //   transports: ['websocket', 'polling', 'flashsocket']
    // });
    const socket = io(ENDPOINT, {
      transports: ['websocket']
    },  )

    // socket.on('fromServer', (data) => {
    //   setName(name);
    //   setRoom(room);
    // });
    setName(name);
    setRoom(room);

    socket.emit('join', { name , room }, ({ error }) => {
      alert(error); 
    });

    console.log(socket);

    return () => {
      socket.emit('disconnect')

        socket.off();
    }
  }, [ENDPOINT, location.search])


  return (
    <div>Chat</div>
  )
}

export default Chat;