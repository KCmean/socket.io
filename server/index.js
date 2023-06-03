const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT  = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
// const io = socketio(server);
// const io = require("socket.io")(server, { 
//     cors: {
//       origin: "localhost:3000",
//       credentials: true
//     }
//   });

// const io = require("socket.io")(httpServer, {
//     allowRequest: (req, callback) => {54n l;'

//       const noOriginHeader = req.headers.origin === undefined;
//       callback(null, noOriginHeader);
//     }
//   });

const io = require("socket.io")(server, {
    cors: {
      origin: "localhost:3000",
    }
  });

io.on('connection', (socket) => {
    console.log('We have a new connection!!!');

    socket.on('disconnect', () => {
        console.log('User had left!!! :(');
    })
})

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));