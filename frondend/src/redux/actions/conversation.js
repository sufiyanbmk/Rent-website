/* eslint-disable */
import { SETTING_TAB,GETTING_ALREDY_CHATTED_USER, UPDATE_DIRECT_CONVERSATION, ADD_DIRECT_CONVERSATION, ADD_DIRECT_MESSAGE, SELECT_CONVERSATION,
  FETCH_CURRENT_MESSAGES,SET_CURRENT_CONVERSATION,TYPING_STATUS,CLEAR
} from "../constants/actionTypes";

export const UpdateTab = (tab) => ({
  type: SETTING_TAB,
  payload: tab,
});

export const FetchDirectConversations = (data) => ({
  type: GETTING_ALREDY_CHATTED_USER,
  payload:data
})

export const UpdateDirectConversation = ({ conversation,user_id}) => ({
  type: UPDATE_DIRECT_CONVERSATION,
  payload:{conversation,user_id}
})

export const AddDirectConversation = ({conversation,user_id}) => ({
  type: ADD_DIRECT_CONVERSATION,
  payload:{conversation,user_id}
})

export const AddDirectMessage = (message) => ({
  type:ADD_DIRECT_MESSAGE,
  payload:message
})

export const SelectConversation = ({ room_id }) => ({
  type:SELECT_CONVERSATION,
  payload:room_id
})

export const FetchCurrentMessages = ({messages,user_id}) => ({
  type:FETCH_CURRENT_MESSAGES,
  payload:{messages:messages?.messages,user_id}
})

export const SetCurrentConversation = (current_conversation) => ({
  type:SET_CURRENT_CONVERSATION,
  payload:current_conversation
})

export const typingStart = (status) =>({
  type:TYPING_STATUS,
  payload:status
})

export const clearRedux = () => ({
  type: CLEAR,
})