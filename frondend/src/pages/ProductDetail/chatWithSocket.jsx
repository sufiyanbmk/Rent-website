/* eslint-disable */
import Bottom from "../Conversation/Chats/bottom"
import MessageShowing from "../../components/MessageShowing"

export default function ChatWithSocket() {
  return (
    <div className=" flex flex-col">
      <MessageShowing />
        <Bottom />
    </div>
  )

}