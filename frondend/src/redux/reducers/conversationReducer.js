/* eslint-disable */
import {
  SETTING_TAB,
  GETTING_ALREDY_CHATTED_USER,
  UPDATE_DIRECT_CONVERSATION,
  ADD_DIRECT_CONVERSATION,
  ADD_DIRECT_MESSAGE,
  SELECT_CONVERSATION,
  FETCH_CURRENT_MESSAGES,
  SET_CURRENT_CONVERSATION,
} from "../constants/actionTypes";

const initialState = {
  tab: 0,
  chat_type: null,
  room_id: null,
  direct_chat: {
    conversations: [],
    current_conversation: null,
    current_messages: [],
  },
  group_chat: {},
};


const conversationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETTING_TAB:
      return {
        ...state,
        tab: action.payload.tab,
      };
    case GETTING_ALREDY_CHATTED_USER:
      const list = action.payload.conversations?.map((el) => {
        const user = el.participants.find(
          (elm) => elm._id.toString() !== action.payload.user_id
        );

        return {
          id: el._id,
          user_id: user?._id,
          name: `${user?.username}`,
          online: user?.status === "Online",
          img: ``,
          msg: el.messages?.slice(-1)[0]?.text,
          time: "9:36",
          unread: 0,
          about: user?.about,
        };
      });
      return {
        ...state,
        direct_chat: {
          ...state.direct_chat,
          conversations: list,
        },
      };
    case SELECT_CONVERSATION:
      console.log(action.payload,'select')
      return {
        ...state,
        chat_type: "individual",
        room_id: action.payload,
      };
    case UPDATE_DIRECT_CONVERSATION:
      console.log(action.payload)
      const thisConversation = action.payload.conversation
      console.log(thisConversation)
      const updatedConversations = state.direct_chat.conversations.map(
        (conversation) => {
          console.log(thisConversation._id._id)
          if (conversation.id !== thisConversation._id) {
            return conversation;
          }
          const user = thisConversation.participants.find(
            (participant) => participant._id.toString() !== action.payload.user_id
          );

          return {
            id: thisConversation._id._id,
            user_id: user?._id,
            name: `${user.username}`,
            online: user.status === "Online",
            // img: faker.image.avatar(),
            // msg: faker.music.songName(),
            time: "9:36",
            unread: 0,
          };
        }
      );
      return {
        ...state,
        direct_chat: {
          ...state.direct_chat,
          conversations: updatedConversations,
        },
      };
    case ADD_DIRECT_CONVERSATION:
      const newConversation = action.payload.conversation;
      const newConversationUser = newConversation.participants.find(
        (elm) => elm._id.toString() !== user_id
      );
      const newConversations = [
        ...state.direct_chat.conversations.filter(
          (el) => el?.id !== newConversation._id
        ),
        {
          id: newConversation._id._id,
          user_id: newConversationUser?._id,
          name: `${newConversationUser?.firstName} ${newConversationUser?.lastName}`,
          online: newConversationUser?.status === "Online",
          img: faker.image.avatar(),
          msg: faker.music.songName(),
          time: "9:36",
          unread: 0,
          pinned: false,
        },
      ];
      return {
        ...state,
        direct_chat: {
          ...state.direct_chat,
          conversations: newConversations,
        },
      };
    case ADD_DIRECT_MESSAGE:
      console.log(action.payload,'add direct')
      return {
        ...state,
        direct_chat: {
          ...state.direct_chat,
          current_messages: [
            ...state.direct_chat.current_messages,
            action.payload,
          ],
        },
      };
    case FETCH_CURRENT_MESSAGES:
      const messages = action.payload?.messages;
      const formatted_messages = messages?.map((el) => ({
        id: el._id,
        type: "msg",
        subtype: el.type,
        message: el.text,
        incoming: el.to === action.payload.user_id,
        outgoing: el.from === action.payload?.user_id,
      }));
      return {
        ...state,
        direct_chat: {
          ...state.direct_chat,
          current_messages: formatted_messages,
        },
      };
    case SET_CURRENT_CONVERSATION:
      return {
        ...state,
        direct_chat: {
          ...state.direct_chat,
          current_conversation: action.payload,
        },
      };
    default:
      return state;
  }
};

export default conversationReducer;
