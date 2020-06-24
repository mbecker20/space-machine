import { FCIDAction } from "./fcidTSTypes";
import { CHANGE_FILL_CONTAINER } from "./fcidActionTypes";

const fcidReducer = (state = '0', action: FCIDAction) => {
  switch (action.type) {
    case CHANGE_FILL_CONTAINER: return action.newID
    default: return state
  }
}

export default fcidReducer