import * as Action from '../constants/ActionTypes'

export function openLoginModal () {
  return {
    type: Action.OPEN_LOGIN_MODAL,
    isModalOpen: true
  }
}

export function closeLoginModal () {
  return {
    type: Action.CLOSE_LOGIN_MODAL,
    isModalOpen: false
  }
}
