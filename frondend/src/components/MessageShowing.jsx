/* eslint-disable */
import { FetchCurrentMessages, SetCurrentConversation, } from '../redux/actions/conversation'
import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect } from 'react';
import { TextMsg,MediaMsg } from './MessageElements'
import { socket } from '../utils/socket'

// import TypingDot from '../assets/illustration/dots_2.gif'

export default function MessageShowing() {
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const { conversations, current_messages } = useSelector(
    (state) => state.conversation?.direct_chat
  );
  // console.log(current_messages,'currennt')
  const { authData } = useSelector((state) => state.userLogin)
  const { room_id,typing } = useSelector((state) => state.conversation)
  useEffect(() => {
    const current = conversations?.find((el) => el?.id === room_id);
    // console.log(current,'cusrrentttsdfdsdfsfsdsdfssdfsdfsdff')
    socket?.emit("get_messages", { conversation_id: current?.id }, (data) => {
      // console.log(data,'ttttttttttttttttttttttttti')
      // data => list of messages
      dispatch(FetchCurrentMessages({ messages: data , user_id:authData.id}));
    });

    dispatch(SetCurrentConversation(current));
  },[room_id]);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [current_messages]);
  return(
    <div className="flex-grow p-6
        h-70vh w-full bg-ccd5cc 
        overflow-x-hidden h-60 overflow-y-scroll scrollbar-thin 
        scrollbar-track-gray-100 scrollbar-thumb-gray-500 
        hover:scrollbar-thumb-gray-600
       bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700" ref={scrollRef}>

        {/* <div
          className="
        "
        > */}
          {/* <ul className="space-y-2"> */}
            {current_messages?.map((el, idx) => {
              switch (el.type) {
                case "divider":
                  return (
                    // Timeline
                    <Timeline el={el} />
                  );

                case "msg":
                  switch (el.subtype) {
                    case "File":
                      return (
                        // Media Message
                        <MediaMsg el={el} />
                      );

                    case "doc":
                      return (
                        // Doc Message
                        <DocMsg el={el} menu={menu} />
                      );
                    case "Link":
                      return (
                        //  Link Message
                        <LinkMsg el={el} menu={menu} />
                      );


                    default:
                      return (
                        // Text Message
                        <TextMsg el={el}/>
                      );
                  }

                default:
                  return <></>;
              }
            })}
          {typing ? 'typing ...' : ''}

        {/* </div> */}
      </div>
  )
}