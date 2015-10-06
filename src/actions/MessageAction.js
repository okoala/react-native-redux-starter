import * as Action from '../constants/ActionTypes'

function getMessages (messages) {
  return {
    type: Action.GET_MESSAGES,
    hasRead: messages.has_read_messages,
    hasNotRead: messages.hasnot_read_messages,
    isLoading: true
  }
}

function fetchMessagesRequest () {
  return {
    type: Action.FETCH_MESSAGES_REQUEST,
    isLoading: true
  }
}

function fetchMessagesSuccess (messages) {
  return {
    type: Action.FETCH_MESSAGES_SUCCESS
  }
}
