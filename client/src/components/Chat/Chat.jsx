import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';


const Chat = ( ) => {
  const location = useLocation();
  // console.log(location)

  useEffect(() => {
    const data = queryString.parse(location.search);

    console.log(data);
  })
  return (
    <div>Chat</div>
  )
}

export default Chat;