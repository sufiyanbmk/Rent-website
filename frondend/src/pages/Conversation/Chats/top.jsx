/* eslint-disable */
import React from 'react'
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from "phosphor-react";
import { useDispatch, useSelector } from 'react-redux';
import { StartAudioCall } from '../../../redux/actions/audioCall'

function Top() {
  const dispatch = useDispatch()
  const { current_conversation } = useSelector((state) => state.conversation.direct_chat);
  const { authData } = useSelector((state) => state.userLogin)
  return (
    <>
      <div className="p-2 w-full bg-white dark:bg-gray-800 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => dispatch(ToggleSidebar())}>
            <div className="relative">
              <div class="avatar">
                <div class="w-12 rounded-full">
                  <img src={current_conversation?.img} />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <p variant="subtitle2" className="text-gray-800 dark:text-gray-200">{current_conversation?.name}</p>
              <p variant="caption" className="text-gray-500 dark:text-gray-400">{current_conversation?.online ? 'Online' : 'Offline'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {/* <button onClick={() => dispatch(StartVideoCall(current_conversation.user_id))}>
              <VideoCamera />
            </button> */}
            <button onClick={() => dispatch(StartAudioCall({ to: current_conversation.user_id, from: authData._id }))}>
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