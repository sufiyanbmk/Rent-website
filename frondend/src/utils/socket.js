/* eslint-disable */
import io from "socket.io-client";

let socket;

const connectSocket = (token) => {
  socket = io("https://api.rentit.fun", {
    path:'/api/socket.io/',
    query: {token},
  });

  socket.on('disconnect', function() {
    socket.emit("end", 'offline');
  });

} 

export {socket, connectSocket};