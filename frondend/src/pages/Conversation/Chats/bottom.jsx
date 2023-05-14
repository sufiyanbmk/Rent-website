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
import { useSelector } from 'react-redux';

const ChatInput = ({ showEmojiPicker, setShowEmojiPicker, value, setValue, inputRef }) => {
  const [openActions, setOpenActions] = useState(false);


  const Actions = [
    {
      color: "#4da5fe",
      icon: <Image size={24} />,
      y: 48,
      title: "Photo/Video",
    },
    {
      color: "#1b8cfe",
      icon: <Sticker size={24} />,
      y: 60,
      title: "Stickers",
    },
    // {
    //   color: "#0172e4",
    //   icon: <Camera size={24} />,
    //   y: 80,
    //   title: "Image",
    // },
    // {
    //   color: "#0159b2",
    //   icon: <File size={24} />,
    //   y: 312,
    //   title: "Document",
    // },
  ];
  return (
    <div className="w-full flex flex-col md:flex-row">
      <input
        className="w-full rounded-full border-gray-300 shadow-sm py-2 px-4 bg-white dark:bg-gray-900 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        placeholder="Write a message..."
        inputRef={inputRef}
      />
      <div className="flex justify-end">
        <div className={` ${openActions ? "inline-block" : "none"}`}>
          {Actions.map((el) => (
            <div
              key={el.title}
              className={`${openActions ? "inline-block" : "hidden"
                } absolute transform translate-x-1/2 -mt-${el.y}  `}
            >
              <button
                key={el.title}
                className={`absolute top-[102px] bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none`}
              >
                {el.icon}
                <span className="ml-2 text-sm font-medium">{el.title}</span>
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              setOpenActions(!openActions);
            }}
            className={`h-8 w-8 rounded-full focus:outline-none ${openActions ? "bg-gray-200" : ""
              }`}
          >
            <LinkSimple className="h-5 w-5" />
          </button>
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
  const inputRef = createRef();
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
              inputRef={inputRef}
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