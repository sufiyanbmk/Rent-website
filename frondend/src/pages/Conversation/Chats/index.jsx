/* eslint-disable */
import React from 'react'
import Chatters from './chatters'
import { useSelector } from "react-redux";
import NoChat from "../../../assets/illustration/NoChat";
import { Link, useSearchParams } from "react-router-dom";
import Messagebox from './messagebox';

function Chats() {
  const { room_id, chat_type,} = useSelector((state) => state.conversation);

  return (
    <div className="flex w-full pt-20">
      <div className="w-1/4">
        <Chatters />
      </div>
      <div className='w-3/4'>
      {/* <Messagebox /> */}

        {chat_type === "individual" && room_id !== null ? (
          <Messagebox />
        ) : (
          <div className=" flex flex-col justify-center items-center">
            <NoChat />
            <p className="text-sm">
              Select a conversation or start a{" "}
              <Link className="text-blue-500 underline" to="/">
                new one
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Chats