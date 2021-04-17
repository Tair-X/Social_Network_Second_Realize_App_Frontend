import {chatApi} from "../api/chatApi";


let initialState = {
    messages: []
}
const chatReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }


        default:
            return state;
    }
}

export const actions = {
    messagesReceived: (messages) => ({type: 'MESSAGES_RECEIVED', payload: {messages}})
}

let _newMessagesHandler = null


const newMessagesHandlerCreator = (dispatch) => {
    if (_newMessagesHandler === null) {
        _newMessagesHandler = (messages) => {

            dispatch(actions.messagesReceived(messages))

        }
    }


    return _newMessagesHandler

}




export const startMessagesListening = () => async (dispatch) => {
    chatApi.start();
    chatApi.subscribe(newMessagesHandlerCreator(dispatch))

}


export const stopMessagesListening = () => async (dispatch) => {
    chatApi.unsubscribe(newMessagesHandlerCreator(dispatch))
    chatApi.stop();
}

export const sendMessage = (message) => async (dispatch) => {
    chatApi.sendMessages(message)
}


export default chatReducer;