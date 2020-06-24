import { BCIDAction } from "./bcidTSTypes"
import { DOWN_1_BASE } from "./bcidActionTypes"

const bcidReducer = (state = '0', action: BCIDAction) => {
  switch (action.type) {
    case DOWN_1_BASE: return action.newID
    default: return state
  }
}

export default bcidReducer