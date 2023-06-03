import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'


import { ToastContainer, toast } from 'react-toastify';

import "./Join.css";

const Join = () => {


  const toastOptions = {
    position: "bottom-right", 
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };


  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <>
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="name"
            className="joinInput"
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <div>
          <input
            placeholder="room"
            className="joinInput mt-20"
            type="text"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
        </div>
        <Link onClick={(event) => {if(!name && !room) {
          event.preventDefault();
          console.log("Name and Room are needed");
          toast.error(
            "Name and Room are needed",
            toastOptions
          );
        }
        else{
          return null;
        }}} to={`/chat?name=${name}&room=${room}`} >
          <button className="button mt-20" type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
    <ToastContainer />
    </>
  );
};

export default Join;
