import { FCAction, ChangeFillContainerAction } from "./fcTSTypes";
import { CHANGE_FILL_CONTAINER } from "./fcActionTypes"
import { FillContainerState } from "../stateTSTypes";

const initState: FillContainerState = {
  id: '0',
}

const fcReducer = (state = initState, action: FCAction) => {
  switch (action.type) {
    case CHANGE_FILL_CONTAINER: return Object.assign({}, state, { id: (action as ChangeFillContainerAction).newID })
    default: return state
  }
}

export default fcReducer