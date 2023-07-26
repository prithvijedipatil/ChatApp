const express = require('express');
const app = express();



const cors = require('cors');
app.use(cors({
    origin: '*'
}));


const io = require('socket.io')(3000);

let users = {};

io.on('connection', (socket) => {
  socket.on('user-joined', (nam) => {
    console.log(`${nam} has joined`);
    users[socket.id] = nam;
    socket.broadcast.emit('join', nam);
  });

  socket.on('send', (message) => {
    console.log("send working");
    socket.broadcast.emit('receive', {
      message: message,
      name: users[socket.id],
    });
  });

  socket.on('disconnect', (message) => {
    console.log("disconnect working");
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id];
  });
});
