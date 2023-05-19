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
  function removeSocketEventListeners() {
    socket?.off("start_chat");
    socket?.off("new_message");
    socket?.off("typing");
    socket?.off("stop typing");
  }
  // alert(socket?.connected )
  useEffect(() => {
    console.log(socket, 'sokssee')
    if (!socket) {
      connectSocket(authData._id)
      console.log(socket, 'sdsdfssfddssdsdfffdsdfsdsdfdfdsfssdfdffdfddsfssdfsfsdfdsfssfdfsfs')
    }

    socket.on("audio_call_notification", (data) => {
      // TODO => dispatch an action to add this in call_queue
      dispatch(PushToAudioCallQueue(data));
    });

    socket.on("typing", () =>  dispatch(typingStart(true)));
    socket.on("stop typing", () =>  dispatch(typingStart(false)));

    socket?.on("new_message", (data) => {
      const message = data.message;
      // console.log(message, 'hllmessagsdfsdfe');
      // check if msg we got is from currently selected conversation
      console.log(current_conversation, data.message.conversation_id, 'check')
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