/* eslint-disable */
const TextMsg = ({el}) =>{
  return(
    <div className={`chat ${el.incoming ? "chat-start" : "chat-end"}`} >
    {/* <div className="chat-image avatar">
      <div className="w-10 rounded-full">
        <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
      </div>
    </div> */}
    <div className="chat-header">
      
      <time className="text-xs opacity-50">12:45</time>
    </div>
    <div className={`chat-bubble ${el.incoming?"bg-red-200 text-black":"bg-yellow-300 text-black"}`}>{el?.message}</div>
    <div className="chat-footer opacity-50">
      Delivered
    </div>
  </div>
  )
}

const MediaMsg = ({el}) => {
  return(
    <div className={`chat ${el.incoming ? "chat-start" : "chat-end"}`} >
  {/* <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
    </div>
  </div> */}
  <div className="chat-header">
    <time className="text-xs opacity-50">12:45</time>
  </div>
  {el?.subtype === "File" ? (
    <div className="chat-bubble">
      <img src={el?.message} alt='image expired' />
    </div>
  ) : (
    <div className="chat-bubble">This Image is expired</div>
  )}
  <div className="chat-footer opacity-50">
    Delivered
  </div>
</div>
  )
}

export {TextMsg,MediaMsg}