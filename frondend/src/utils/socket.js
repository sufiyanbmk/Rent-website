/* eslint-disable */
import io from "socket.io-client";

let socket;

const connectSocket = (token) => {
  socket = io("http://localhost:7000", {
    query: {token},
  });

  socket.on('disconnect', function() {
    alert('disconnected')
    socket.emit("end", 'offline');
  });

} 

export {socket, connectSocket};