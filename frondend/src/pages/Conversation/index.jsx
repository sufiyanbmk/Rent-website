/* eslint-disable */
import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import {
  ChatCircleDots,
  Phone,
  Users,
} from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateTab, 
  UpdateDirectConversation,
  AddDirectConversation,
  SelectConversation,
  AddDirectMessage, } from '../../redux/actions/conversation';
import Chats from './Chats'
import { socket, connectSocket } from '../../utils/socket';

function Conversation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {authData} = useSelector((state) => state.userLogin)
  const { tab } = useSelector((state) => state.conversation)
  const { conversations, current_conversation } = useSelector(
    (state) => state.conversation?.direct_chat
  );
  const selectedTab = tab;
  function removeSocketEventListeners() {
    socket?.off("start_chat");
    socket?.off("new_message");
  }
  alert(socket?.connected)
  useEffect(() => {
    console.log(socket,'sokee')
    if(!socket){
      connectSocket(authData._id)
      console.log(socket,'sdsdfssfddsfdsdfdsfssdfdffdfddsfssdfsfsdfdsfssfdfsfs')
    } 
    socket?.on("new_message", (data) => {
      const message = data.message;
      // console.log(message, 'hllmessagsdfsdfe');
      // check if msg we got is from currently selected conversation
      console.log(current_conversation,data.message.conversation_id,'check')
      if (current_conversation?.id === data.message.conversation_id) {
        dispatch(
          AddDirectMessage({
            id: message._id,
            type: "msg",
            subtype: message.type,
            message: message.text,
            incoming: message.to === authData._id,
            outgoing: message.from === authData._id,
          })
        );
      }
    });

    socket?.on("start_chat", (data) => {
      console.log(data,'start chat');
      // add / update to conversation list
      const existing_conversation = conversations.find(
        (el) => el?.id === data._id
      );
      if (existing_conversation) {
        // update direct conversation
        dispatch(UpdateDirectConversation({ conversation: data }));
      } else {
        // add direct conversation
        dispatch(AddDirectConversation({ conversation: data }));
      }
      dispatch(SelectConversation({ room_id: data._id }));
    });

    return () => {
      removeSocketEventListeners()
    };
  },[socket,current_conversation])


  return (
    <div className='mt-22 h-full'>
    {selectedTab === 0 && <Chats />}
    </div>
  )
}

export default Conversation