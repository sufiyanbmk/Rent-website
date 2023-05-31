/* eslint-disable */
import { RESET_AUDIO_CALL_QUEUE, PUSH_TO_AUDIO_CALL_QUEUE, UPDATE_CALL_DIALOG } from '../constants/actionTypes'
import { socket } from '../../utils/socket';

const initialState = {
  open_audio_dialog: false,
  open_audio_notification_dialog: false,
  call_queue: [], // can have max 1 call at any point of time
  incoming: false,
};

const audioCallReducer = (state = initialState , action) => {
  switch(action.type){
    case RESET_AUDIO_CALL_QUEUE:
      return{
        ...state,
        call_queue : [],
        open_audio_notification_dialog : false,
        incoming : false
      }
    case PUSH_TO_AUDIO_CALL_QUEUE: {
      alert('hiii')
        // console.log(action.payload)
      if (state.call_queue.length === 0) {    
          state.call_queue.push(action.payload.call);
          if (action.payload.incoming) {
            state.open_audio_notification_dialog = true; // this will open up the call dialog
            state.incoming = true;
          } else {
            state.open_audio_dialog = true;
            state.incoming = false;
          }
        } else {
          // if queue is not empty then emit user_is_busy => in turn server will send this event to sender of call
          socket.emit("user_is_busy_audio_call", { ...action.payload });
        }
        return { ...state };
      }
    case UPDATE_CALL_DIALOG:
      alert('action,',action.payload.state)
      return{
        ...state,
        open_audio_dialog : action.payload,
        open_audio_notification_dialog : false,
      } 

    default:
      return state;

  }
}

export default audioCallReducer;