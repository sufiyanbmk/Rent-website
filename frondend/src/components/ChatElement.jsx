/* eslint-disable */
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { SelectConversation } from '../redux/actions/conversation'
import image from '../assets/images/profileAvator.jpg';
import TimeAgo from 'react-timeago'

function ChatElement({ img, name, msg, time, unread, online, id }) {
  const dispatch = useDispatch();
  const { room_id } = useSelector((state) => state.conversation);
  const selectedChatId = room_id?.toString();
  const isSelected = !!selectedChatId && selectedChatId === id.toString();
  function truncateText(text, maxLength) {
    if (text?.length > maxLength) {
      return text.slice(0, maxLength - 3) + '...';
    } else {
      return text;
    }
  }
  return (
    <div
      className={`w-full p-2 rounded-md ${isSelected ? 'bg-white' : ''} `}
      onClick={() => {
        dispatch(SelectConversation({ room_id: id }));
      }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {online ? (
            <div className="avatar online">
              <div className="w-12 rounded-full">
                <img src={img || image} />
              </div>
            </div>
          ) : (
            <div className="avatar offline">
              <div className="w-12 rounded-full">
                <img src={img || image} />
              </div>
            </div>
          )}
          <div className="flex flex-col">
            <p variant="subtitle2" className='text-black'>{name}</p>
            <p variant="caption">
          {truncateText(msg, 20)}
        </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <p
            sx={{ fontWeight: 600 }}
            variant="caption"
            className="whitespace-nowrap text-black"
          >
          <TimeAgo date={time} />
          </p>
          {/* <div className="badge badge-primary">{unread}</div> */}
        </div>
      </div>
    </div>
  )
}

export default ChatElement;