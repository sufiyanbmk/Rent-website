import { updateStatusAndSocketId, getUsersAleredyChated, textMessge,getMessages,
  checkExistConversation,
  createNewChat,
} from "../helpers/client/chatHelper.js";

export default function (io){
  io.on("connection",async (socket) => { 
    const user_id = socket.handshake.query["user_id"];
    if (user_id != null && Boolean(user_id)){
      console.log(user_id,'userId');
      const status = "Online"
     updateStatusAndSocketId(user_id,socket.id,status)
    }

    socket.on("get_direct_conversations", async ({ user_id }, callback) => {
      console.log(user_id,'hiii')
      const existing_conversations = await getUsersAleredyChated(user_id)
      // db.books.find({ authors: { $elemMatch: { name: "John Smith" } } })
      // console.log(existing_conversations,'get direct conver')
      callback(existing_conversations);
    });

    socket.on("start_conversation", async (data) => {
      // data: {to: from:}
      // check if there is any existing conversation
      
      const existing_conversations = await checkExistConversation(data);
      // console.log(existing_conversations,'start conversation,existing')
  
      // if no => create a new OneToOneMessage doc & emit event "start_chat" & send conversation details as payload
      if (existing_conversations.length === 0) {
        const new_chat = await createNewChat(data);
        // console.log(new_chat,'start conversation')
        socket.emit("start_chat", new_chat);
      }
      // if yes => just emit event "start_chat" & send conversation details as payload
      else {
        socket.emit("start_chat", existing_conversations[0]);
      }
    });

    socket.on("get_messages", async (data, callback) => {
      try {
        const messages = await getMessages(data)
        // console.log(messages,'get message')
        callback(messages);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("text_message", async (data) => {
      // console.log("Received message:", data);
  
      // data: {to, from, text}
      // emit incoming_message -> to user
      const new_message  = await textMessge(data);
      const { message, conversation_id, from, to, type,toUser,fromUser } = new_message;
      io.to(toUser?.socket_id).emit("new_message", {
        message: new_message,
      });
      // emit outgoing_message -> from user
      io.to(fromUser?.socket_id).emit("new_message", {
        message: new_message,
      });
    });

    // socket.on("end", async (data) => {
    //   // Find user by ID and set status as offline
    //   const status = "Offline"
    //   updateStatusAndSocketId(user_id,socket.id,status)
    //   // broadcast to all conversation rooms of this user that this user is offline (disconnected)
  
    //   console.log("closing connection");
    //   socket.disconnect(0);
    // });

  })
}