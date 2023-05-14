/* eslint-disable */
const TextMsg = ({el}) =>{
  // console.log(el)
  return(
    <div className={`chat ${el.incoming ? "chat-start" : "chat-end"}`} >
    <div className="chat-image avatar">
      <div className="w-10 rounded-full">
        <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
      </div>
    </div>
    <div className="chat-header">
      Obi-Wan Kenobi
      <time className="text-xs opacity-50">12:45</time>
    </div>
    <div className="chat-bubble">{el?.message}</div>
    <div className="chat-footer opacity-50">
      Delivered
    </div>
  </div>
  )
 
}

export {TextMsg}