/* eslint-disable */
import io from "socket.io-client";

let socket;

const connectSocket = (user_id) => {
  console.log(user_id,'user[id[')
  socket = io("http://localhost:8000", {
    query: `user_id=${user_id}`,
  });

  socket.on("connection _error", (err) => {
    console.log(err)
    if (err.message === "invalid username") {
      console.log("ERROR");
    }
  });
  // socket.on('disconnect', function() {
  //   console.log('disconnected')
  //   socket.emit("end", 'offline');
  // });
} 

export {socket, connectSocket};