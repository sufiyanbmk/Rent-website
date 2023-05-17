import User from "../../models/userSchema.js";
import Message from "../../models/messageSchema.js";
import { uploadFile, getObjectSignedUrl, deleteFile } from '../../services/awsS3.js'
import path from 'path'
import crypto from 'crypto'
const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

export const updateStatusAndSocketId = async (user_id, socket_id,status) => {
  try {
      await User.findByIdAndUpdate(user_id, {
        socket_id: socket_id,
        status: status,
      }).then((res)=>{
        console.log(res,'ressssssssssssssssssssssssssssss')
      })
  } catch (e) {
    console.log(e, "eeeeeeeeeeeeeeee");
  }
};

export const getUsersAleredyChated = async(user_id) => {
  return new Promise(async(resolve,reject) => {
    try{
      const existing_conversations = await Message.find({participants: { $all: [user_id] },
      }).populate({
        path: 'participants',
        select: 'username profileImage _id email status'
      });
      //  console.log(existing_conversations[0].participants.profileImage)
      const participantsWithImageUrls = await Promise.all(
        existing_conversations[0].participants.map(async (x) => {
          x.profileImage = await getObjectSignedUrl(x.profileImage);
          return x;
        })
      );
       resolve(existing_conversations)
    }catch(err){
      reject(err)
    }
  })
}

export const getMessages = (data) => {
  console.log(data,'dataaaaaaaaaaaa')
  return new Promise( async(resolve,reject) => {
    await Message.findById( data.conversation_id
      ).select("messages").then((res)=>{
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}

export const textMessge = (data) => {
  const { message, conversation_id, from, to, type } = data;
  return new Promise(async (resolve,reject) => {
    try{
      const toUser = await User.findById(to);
      const fromUser = await User.findById(from);
  
      // message => {to, from, type, created_at, text, file}
  
      const new_message = {
        to: to,
        from: from,
        type: type,
        created_at: Date.now(),
        text: message,
        toUser,
        fromUser,
        conversation_id
      };
      // fetch OneToOneMessage Doc & push a new message to existing conversation
      const chat = await Message.findById(conversation_id);
      chat.messages.push(new_message);
      // save to db`
      await chat.save({ new: true, validateModifiedOnly: true });
      resolve(new_message)
    }catch(err){
      reject(err)
    }
  })
}

export const fileMessage = (data) => {
  const { message, conversation_id, from, to, type } = data;
  return new Promise(async (resolve,reject) => {
    try{
      const toUser = await User.findById(to);
      const fromUser = await User.findById(from);
    // const fileExtension = path.extname(message.name);
    // const filename = `${Date.now()}_${Math.floor(
    //   Math.random() * 10000
    // )}${fileExtension}`;
    const filename = generateFileName()
    const fileBuffer = message.fileBuffer;
    await uploadFile(fileBuffer, filename, type)
    const imgLInk = await getObjectSignedUrl(filename)
    const Media = type;
      const new_message = {
        to: to,
        from: from,
        type: Media,
        created_at: Date.now(),
        text: imgLInk,
        toUser,
        fromUser,
        conversation_id
      };
      // fetch OneToOneMessage Doc & push a new message to existing conversation
      const chat = await Message.findById(conversation_id);
      chat.messages.push(new_message);
      // save to db`
      await chat.save({ new: true, validateModifiedOnly: true });
      resolve(new_message)
    }catch(err){
      reject(err)
    }
  })
}

export const checkExistConversation = (data) =>{
  return new Promise(async(resolve,reject) => {
    const { to, from } = data;
    try{
      const existing_conversations = await Message.find({
        participants: { $size: 2, $all: [to, from] },
      }).populate("participants", "username _id email status");
      resolve(existing_conversations)
    }catch(err){
      reject(err)
    }
  })
}

export const createNewChat = (data) =>{
  return new Promise(async(resolve,reject) => {
    const { to, from } = data;
    try{
      let new_chat = await Message.create({
        participants: [to, from],
      });

      new_chat = await Message.findById(new_chat).populate(
        "participants",
        "username _id email status"
      );

      console.log(new_chat);
        resolve(new_chat)
    }catch(err){
      reject(err)
    }
  })
}

export const findUser = async(to) => {
  return new Promise (async(resolve,reject) => {
    try{

      const toUser = await User.findById(to);
      resolve(toUser)
    }catch(err){
      reject(err)
    }
  })
}