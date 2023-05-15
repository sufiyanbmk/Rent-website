/* eslint-disable */
import React from 'react'
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from "phosphor-react";
import { useSelector } from 'react-redux';

function Top() {
  const {current_conversation} = useSelector((state) => state.conversation.direct_chat);
  console.log(current_conversation,'current conversation')
  return (
    <>
      <div className="p-2 w-full bg-white dark:bg-gray-800 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => dispatch(ToggleSidebar())}>
            <div className="relative">
              {/* <StyledBadge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot">
                <Avatar alt={current_conversation?.name} src={current_conversation?.img} />
              </StyledBadge> */}
            </div>
            <div className="flex flex-col">
              <p variant="subtitle2" className="text-gray-800 dark:text-gray-200">sufiyan</p>
              <p variant="caption" className="text-gray-500 dark:text-gray-400">Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={() => dispatch(StartVideoCall(current_conversation.user_id))}>
              <VideoCamera />
            </button>
            <button onClick={() => dispatch(StartAudioCall(current_conversation.user_id))}>
              <Phone />
            </button>
            <div className="border-r border-gray-400 h-4"></div>
            {/* <button id="conversation-positioned-button" aria-controls={openConversationMenu ? "conversation-positioned-menu" : undefined} aria-haspopup="true" aria-expanded={openConversationMenu ? "true" : undefined} onClick={handleClickConversationMenu}>
              <CaretDown />
            </button> */}
            {/* <Menu MenuListProps={{ "aria-labelledby": "fade-button" }} TransitionComponent={Fade} id="conversation-positioned-menu" aria-labelledby="conversation-positioned-button" anchorEl={conversationMenuAnchorEl} open={openConversationMenu} onClose={handleCloseConversationMenu} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} transformOrigin={{ vertical: "top", horizontal: "right" }}>
              <div className="p-1">
                <div className="space-y-1">
                  {Conversation_Menu.map((el) => (
                    <MenuItem onClick={handleCloseConversationMenu}>
                      <div className="flex items-center justify-between w-full min-w-100">
                        <span>{el.title}</span>
                      </div>{" "}
                    </MenuItem>
                  ))}
                </div>
              </div>
            </Menu> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Top