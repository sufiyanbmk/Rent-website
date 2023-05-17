import User from "../../models/userSchema.js";
import AudioCall from '../../models/callSchema.js';

export const callNOtPicked = async(data)=>{
  return new Promise(async(resolve,reject) =>{
    const { to, from } = data;
    try{
      const to_user = await User.findById(to);
  
      await AudioCall.findOneAndUpdate(
        {
          participants: { $size: 2, $all: [to, from] },
        },
        { verdict: "Missed", status: "Ended", endedAt: Date.now() }
      );
        resolve(to_user)
    }catch(err){
      reject(err)
    }
  })
}

export const startAudioCall = async(data) => {
  const { from, to } = data;
  return new Promise(async(resolve,reject) =>{
    try{
      const to_user = await User.findById(to);
      const from_user = await User.findById(from);

      resolve({to_user,from_user})
    }catch(err){
      reject(err)
    }
  })
}

export const callAccepted = async(data) => {
  return new Promise(async(resolve,reject) => {
    try{
      const { to, from } = data;
  
      const from_user = await User.findById(from);
      
      // find and update call record
      await AudioCall.findOneAndUpdate(
        {
          participants: { $size: 2, $all: [to, from] },
        },
        { verdict: "Accepted" }
      );
      resolve(from_user)
    }catch(err){
      reject(err)
    } 
  })
}

export const callDenied = async(data) =>{
  return new Promise(async(resolve,reject) => {
    const { to, from } = data;
    try{
      await AudioCall.findOneAndUpdate(
        {
          participants: { $size: 2, $all: [to, from] },
        },
        { verdict: "Denied", status: "Ended", endedAt: Date.now() }
      );
  
      const from_user = await User.findById(from);
      resolve(from_user)
    }catch(err){
      reject(err)
    }
  })
}

export const userIsBusy =async (data) => {
  return new Promise(async(resolve,reject) => {
    const { to, from } = data;
    try{

      await AudioCall.findOneAndUpdate(
        {
          participants: { $size: 2, $all: [to, from] },
        },
        { verdict: "Busy", status: "Ended", endedAt: Date.now() }
      );
  
      const from_user = await User.findById(from);
      resolve(from_user)
    }catch(err){
      reject(err)
    }
  })
}