/* eslint-disable */
import { useEffect } from 'react'
import {
  ArchiveBox,
  CircleDashed,
  MagnifyingGlass,
  Users,
} from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { FetchDirectConversations } from '../../../redux/actions/conversation'
import { socket } from '../../../utils/socket'
import ChatElement from '../../../components/ChatElement';
import { useNavigate } from 'react-router-dom';


function Chatters() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {authData} = useSelector((state) => state.userLogin)
  const {conversations} = useSelector((state) => state.conversation?.direct_chat);
  const user_id = authData.id
  useEffect(() => {
    console.log(socket,'socket')
    setTimeout(() => {     
      socket?.emit("get_direct_conversations", (data) => {
        console.log(data,'data')
        dispatch(FetchDirectConversations({ conversations: data,user_id }));
      });
    }, 2000);
  },[]);
  return (
    <>
  <div className="relative h-screen dark:bg-gray-900 shadow-md">

    <div className="p-3 space-y-2 max-h-full overflow-y-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-white">Chats</h2>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => {
              socket.emit("end", 'offline');
              navigate('/')
            }}
            className="p-1 rounded-full bg-blue-500 text-white focus:outline-none"
          >
            BACK TO HOME PAGE
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="relative text-gray-600 focus-within:text-gray-400">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <MagnifyingGlass className="h-5 w-5 text-blue-500" />
          </span>
          <input
            className="block w-full border-gray-300 dark:border-gray-700 rounded-lg pl-10 pr-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="Search…"
            aria-label="Search"
          />
        </div>
      </div>

      {/* <div className="space-y-1">
        <div className="flex items-center space-x-1.5">
          <ArchiveBox className="h-6 w-6 text-gray-400" />
          <button className="text-blue-500 font-medium focus:outline-none">Archive</button>
        </div>
        <hr className="border-gray-300 dark:border-gray-700" />
      </div> */}

      <div className="flex-grow overflow-y-auto">
        <div className="space-y-2.4">
          {/* <Typography variant="subtitle2" sx={{ color: "#676667" }}>
            Pinned
          </Typography> */}
          {/* Chat List */}
          {/* {ChatList.filter((el) => el.pinned).map((el, idx) => {
            return <ChatElement {...el} />;
          })} */}
          <h6 className="text-sm font-medium text-gray-500 dark:text-gray-400">All Chats</h6>
          {/* Chat List */}
          {conversations?.map((el, idx) => {
            return <ChatElement {...el} key={idx} />;
          })}
        </div>
      </div>
    </div>
  </div>
  {/* {openDialog && <Friends open={openDialog} handleClose={handleCloseDialog} />} */}
</>
  )
}

export default Chatters