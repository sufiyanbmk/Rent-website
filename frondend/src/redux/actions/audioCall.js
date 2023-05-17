/* eslint-disable */
import { RESET_AUDIO_CALL_QUEUE,PUSH_TO_AUDIO_CALL_QUEUE, UPDATE_CALL_DIALOG ,RESETCALLQUEUE} from '../constants/actionTypes'
import { startAudioCall } from '../../api/api'

export const StartAudioCall = ({to,from}) => async (dispatch) => {
  dispatch({type: RESET_AUDIO_CALL_QUEUE})
  startAudioCall(to,from).then((res) =>{
    dispatch({type: PUSH_TO_AUDIO_CALL_QUEUE,payload:{call:res.data.data,incoming:false}})
  }).catch((err)=>{
    console.log(err)
  })
}

export const PushToAudioCallQueue =(call) => ({
  type:PUSH_TO_AUDIO_CALL_QUEUE,
  payload:({call,incoming:true})
})

export const UpdateAudioCallDialog = ({state}) => ({
  type:UPDATE_CALL_DIALOG,
  payload:state
})

export const ResetAudioCallQueue = () =>({
  type: RESET_AUDIO_CALL_QUEUE,
  payload:''
})