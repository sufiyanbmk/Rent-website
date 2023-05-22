/* eslint-disable */
import React, { useState, createRef, useEffect } from 'react'
import Picker from "emoji-picker-react";
import {
  Camera,
  File,
  Image,
  LinkSimple,
  PaperPlaneTilt,
  Smiley,
  Sticker,
  User,
} from "phosphor-react";
import { socket } from '../../../utils/socket'
import { useDispatch,useSelector } from 'react-redux';
import { typingStart } from '../../../redux/actions/conversation';

const ChatInput = ({ showEmojiPicker, setShowEmojiPicker, value, setValue }) => {
  const {room_id,typing } = useSelector((state) => state.conversation)
  const { current_conversation } = useSelector(
    (state) => state.conversation.direct_chat
  );
  const { authData } = useSelector((state) => state.userLogin)
  const [showFileInput, setShowFileInput] = useState(false);
  const dispatch = useDispatch()

  const typingHandler = (e) => {
    setValue(e.target.value);
    if (!socket) return;

    if (!typing) {
      dispatch(typingStart(true))
      socket.emit("typing", { to: current_conversation.user_id });
    }
    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", { to: current_conversation.user_id });
        dispatch(typingStart(false))
      }
    }, timerLength);
  };
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      alert("Please select an image or video file.");
      return;
    }
  
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const fileBuffer = reader.result;
      const fileData = {
        name: file.name,
        type: file.type,
        size: file.size,
        fileBuffer,
      };
      socket.emit("file_message",{message: fileData,
      conversation_id: room_id,
      from: authData._id,
      to: current_conversation.user_id,
      type: "File",})
    setShowFileInput(false)
  }
}

  return (
    <div className="w-full flex flex-col md:flex-row">
      <input
        className="w-full rounded-full border-gray-300 shadow-sm py-2 px-4 bg-white dark:bg-gray-900 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        value={value}
        onChange={typingHandler}
        placeholder="Write a message..."
        // inputRef={inputRef}
      />
      <div className="flex justify-end">
        <div>
        <button onClick={() => setShowFileInput(true)}
            className={`h-8 w-8 rounded-full focus:outline-none `}
          >
            <LinkSimple className="h-5 w-5" />
          </button>
          <input type="file" style={{ display: showFileInput ? 'block' : 'none' }}  onChange={handleFileInputChange} />
        </div>
        <div className="relative inline-block">
          <button
            onClick={() => {
              setShowEmojiPicker(!showEmojiPicker);
            }}
            className="h-8 w-8 rounded-full focus:outline-none"
          >
            <Smiley className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

function linkify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(
    urlRegex,
    (url) => `<a href="${url}" target="_blank">${url}</a>`
  );
}

function containsUrl(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return urlRegex.test(text);
}

function Bottom() {
  // const inputRef = createRef();
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { room_id } = useSelector((state) => state.conversation)
  const { authData } = useSelector((state) => state.userLogin)
  const { current_conversation } = useSelector(
    (state) => state.conversation.direct_chat
  );

  // console.log(current_conversation,'current')
  // useEffect(() => {
  //   inputRef.current?.scrollIntoView();
  // }, [showEmojiPicker]);


  function handleEmojiClick(emoji) {
    console.log(emoji)
    setValue(
      prevInput => prevInput + emoji.emoji
    );
    setShowEmojiPicker(false)
  }
  return (
    <div className="p-1 md:p-2 w-full dark:bg-gray-800 shadow-lg md:mb-20">
      <div className=" flex items-center space-x-3 md:space-x-4 w-full">
        {/* <div className="w-full" > */}

            <ChatInput
              // inputRef={inputRef}
              value={value}
              setValue={setValue}
              showEmojiPicker={showEmojiPicker}
              setShowEmojiPicker={setShowEmojiPicker}
            />
            {showEmojiPicker && (
               <div className="absolute">
               <Picker
                 className="dark:bg-gray-900 z-10"
                 onEmojiClick={handleEmojiClick}
               />
             </div>
            )}
        {/* </div> */}
        <div className="h-12 w-12 bg-primary-main rounded-1.5">
          <div className="h-full flex items-center justify-center">
            <button
              onClick={() => {
                socket.emit("text_message", {
                  message: linkify(value),
                  conversation_id: room_id,
                  from: authData._id,
                  to: current_conversation.user_id,
                  type: containsUrl(value) ? "Link" : "Text",
                });
                setValue('')
              }}
            >
              <PaperPlaneTilt color="#ffffff" />
            </button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Bottom;