import { BCIDAction } from "./bcidTSTypes"
import { DOWN_1_BASE, CHANGE_BASE } from "./bcidActionTypes"

const bcidReducer = (state = 'project', action?: BCIDAction) => {
  if (action) {
    switch (action.type) {
      case DOWN_1_BASE: return action.newID
      case CHANGE_BASE: return action.newID
      default: return state
    }
  } else {
    return state
  }
}

export default bcidReducer