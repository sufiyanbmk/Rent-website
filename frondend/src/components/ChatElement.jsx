/* eslint-disable */
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import {  SelectConversation } from '../redux/actions/conversation'

function ChatElement({ img, name, msg, time, unread, online, id }) {
  const dispatch = useDispatch();
  const {room_id} = useSelector((state) => state.conversation);
  const selectedChatId = room_id?.toString();
  const isSelected = !!selectedChatId && selectedChatId === id.toString();
  return (
    <div 
  className={`w-full p-2 rounded-md ${ isSelected ? 'bg-white' : ''} `}
  onClick={() => {
    dispatch(SelectConversation({ room_id: id }));
  }}
>
  <div className="flex justify-between items-center">
    <div className="flex items-center space-x-2">
      {/* {online ? (
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar alt={name} src={img} />
        </StyledBadge>
      ) : (
        <Avatar alt={name} src={img} />
      )} */}
      <div className="flex flex-col">
        <p variant="subtitle2">{name}</p>
        {/* <p variant="caption">
          {truncateText(msg, 20)}
        </p> */}
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <p
        sx={{ fontWeight: 600 }}
        variant="caption"
        className="whitespace-nowrap"
      >
        {time}
      </p>
      {/* <Badge
        className="unread-count"
        color="primary"
        badgeContent={unread}
      /> */}
    </div>
  </div>
</div>
  )
}

export default ChatElement;