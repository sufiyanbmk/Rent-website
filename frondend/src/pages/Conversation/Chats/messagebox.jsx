/* eslint-disable */
import { useEffect,useRef } from 'react'
import Bottom from './bottom'
import Top from './top'
import { socket } from '../../../utils/socket'
import { FetchCurrentMessages, SetCurrentConversation, } from '../../../redux/actions/conversation'
import { useDispatch, useSelector } from "react-redux";
import { TextMsg } from '../../../components/MessageElements'
import MessageShowing from '../../../components/MessageShowing'

function Messagebox() {
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const { conversations, current_messages } = useSelector(
    (state) => state.conversation?.direct_chat
  );
  // console.log(current_messages,'currennt')
  const { authData } = useSelector((state) => state.userLogin)
  const { room_id } = useSelector((state) => state.conversation)
  useEffect(() => {
    const current = conversations?.find((el) => el?.id === room_id);
    console.log(current,'cusrrentttsdfdsdfsfsdsdfssdfsdfsdff')
    socket?.emit("get_messages", { conversation_id: current?.id }, (data) => {
      console.log(data,'ttttttttttttttttttttttttti')
      // data => list of messages
      dispatch(FetchCurrentMessages({ messages: data , user_id:authData._id}));
    });

    dispatch(SetCurrentConversation(current));
  },[room_id]);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [current_messages]);
  return (
    <div className='w-full h-full flex flex-col'>
      <Top />
      <div>
        
      </div>
      <MessageShowing />

      <Bottom className="sticky bottom-0" />
        {/* </div> */}
    </div>
  )
}

export default Messagebox