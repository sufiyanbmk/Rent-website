/* eslint-disable */
import Bottom from "../Conversation/Chats/bottom"
import MessageShowing from "../../components/MessageShowing"

export default function ChatWithSocket() {
  return (
    <div className="artboard phone-1 border border-green-400 flex flex-col">
      <MessageShowing />
        <Bottom />
    </div>
  )

}