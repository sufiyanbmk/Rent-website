/* eslint-disable */
import io from "socket.io-client";

let socket;

const connectSocket = (user_id) => {
  console.log(user_id,'user[id[')
  socket = io("http://localhost:8000", {
    query: `user_id=${user_id}`,
  });

  socket.on('disconnect', function() {
    alert('disconnected')
    console.log('hiiiiiiiii')
    socket.emit("end", 'offline');
  });

} 

export {socket, connectSocket};