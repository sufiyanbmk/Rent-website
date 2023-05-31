/* eslint-disable */
import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import {
  ChatCircleDots,
  Phone,
  Users,
} from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateTab,
  UpdateDirectConversation,
  AddDirectConversation,
  SelectConversation,
  AddDirectMessage,
  typingStart,
  clearRedux
} from '../../redux/actions/conversation';
import { UpdateAudioCallDialog, PushToAudioCallQueue } from '../../redux/actions/audioCall'
import Chats from './Chats'
import { socket, connectSocket } from '../../utils/socket';
import Call from './Call'
import CallNotification from './Call/callNoltification';
import toast from 'react-hot-toast'

function Conversation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authData } = useSelector((state) => state.userLogin)
  const { tab } = useSelector((state) => state.conversation)
  const { conversations, current_conversation } = useSelector(
    (state) => state.conversation?.direct_chat
  );
  const { open_audio_notification_dialog,open_audio_dialog } = useSelector((state) => state.call)
  const selectedTab = tab;
  const handleCloseAudioDialog = () => {
    dispatch(UpdateAudioCallDialog({ state: false }));
  };
  const handleNotification = (id) => {
    dispatch(SelectConversation({ room_id: id }));
  }
  function removeSocketEventListeners() {
    socket?.off("start_chat");
    socket?.off("new_message");
    socket?.off("typing");
    socket?.off("stop typing");
  }
  // alert(socket?.connected )
  useEffect(() => {
    if (!socket) {
      connectSocket(authData.token)
    }

    socket.on("audio_call_notification", (data) => {
      dispatch(PushToAudioCallQueue(data));
    });

    socket.on("typing", () =>  dispatch(typingStart(true)));
    socket.on("stop typing", () =>  dispatch(typingStart(false)));

    socket?.on("new_message", (data) => {
      const message = data.message;
      if (current_conversation?.id === data.message.conversation_id) {
        dispatch(
          AddDirectMessage({
            id: message._id,
            type: "msg",
            subtype: message.type,
            message: message.text,
            time:message.created_at,
            incoming: message.to === authData.id,
            outgoing: message.from === authData.id,
          })
        );
      }else{
        if(message.type === "Text"){
          toast((t) => (
            <div className="bg-blue-500 text-white p-4 rounded-lg w-16">
            <b>{message.text}</b>
            <button onClick={() => handleNotification(data.message.conversation_id)} className="ml-2 bg-white text-blue-500 px-2 py-1 rounded">
              Show Message
            </button>
            <button onClick={() => toast.dismiss(t.id)} className="ml-2 bg-white text-red-500 px-2 py-1 rounded">
              Show Message
            </button>
          </div>
          ));
        }
      }
    });

    socket.on("start_chat", (data) => {
      alert(data)
      console.log(data, 'start chat');
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
  }, [socket, current_conversation])
  return (
    <>
      <div className='mt-22 h-full'>
        {selectedTab === 0 && <Chats />}
      </div>
      {open_audio_notification_dialog && (
        <CallNotification open={open_audio_notification_dialog} />
      )}
      {open_audio_dialog && (
        <Call
          open={open_audio_dialog}
          handleClose={handleCloseAudioDialog}
        />
      )}
    </>
  )
}

export default Conversation