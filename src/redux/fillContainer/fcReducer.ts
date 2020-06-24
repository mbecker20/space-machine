import { FCAction, ChangeFillContainerAction, SetIsExpandedAction } from "./fcTSTypes";
import { CHANGE_FILL_CONTAINER, SET_IS_EXPANDED } from "./fcActionTypes"
import { FillContainerState } from "../stateTSTypes";

const initState: FillContainerState = {
  id: '0',
  isExpanded: false,
}

const fcReducer = (state = initState, action: FCAction) => {
  switch (action.type) {
    case CHANGE_FILL_CONTAINER: return Object.assign({}, state, { id: (action as ChangeFillContainerAction).newID })
    case SET_IS_EXPANDED: return Object.assign({}, state, { isExpanded: (action as SetIsExpandedAction).isExpanded })
    default: return state
  }
}

export default fcReducer