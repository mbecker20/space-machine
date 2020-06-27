import { ContainerModule, ContainerModules } from "../stateTSTypes"
import { ADD_CONTAINER, REMOVE_CONTAINER, MOVE_CONTAINER, RENAME_CONTAINER } from './cmActionTypes'
import { CMAction, AddContainerAction, RemoveContainerAction, MoveContainerAction, RenameContainerAction } from './cmTSTypes'
import { removeContainerReducer, addContainerReducer, moveContainerReducer, renameContainerReducer } from "./reducers/allCMReducers"

const initBaseCM: ContainerModule = {
  id: '0',
  row: 0,
  col: 0,
  inputs: null,
  outputs: null,
  parentID: null,
  childContainers: [],
  childModules: [],
  controls: {},
  isBaseContainer: true
}

const initState: ContainerModules = {
  '0': initBaseCM
}

const cmReducer = (state = initState, action: CMAction) => {
  switch (action.type) {
    case ADD_CONTAINER: return addContainerReducer(state, action as AddContainerAction)
    case REMOVE_CONTAINER: return removeContainerReducer(state, action as RemoveContainerAction)
    case MOVE_CONTAINER: return moveContainerReducer(state, action as MoveContainerAction)
    case RENAME_CONTAINER: return renameContainerReducer(state, action as RenameContainerAction)
    default: return state
  }
}

export default cmReducer