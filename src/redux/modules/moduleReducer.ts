import { ContainerModule, ContainerModules } from "../stateTSTypes"
import { ADD_CONTAINER, REMOVE_CONTAINER, MOVE_CONTAINER, RENAME_CONTAINER } from './moduleActionTypes'
import { CMAction, AddContainerAction, RemoveContainerAction, MoveContainerAction, RenameContainerAction } from './moduleTSTypes'
import { removeContainerReducer, addContainerReducer, moveContainerReducer, renameContainerReducer } from "./reducers/allModuleReducers"
import { CONTAINER } from "../../modules/moduleTypes"

const initBaseCM: ContainerModule = {
  id: 'project',
  row: 0,
  col: 0,
  type: CONTAINER,
  inputs: null,
  outputs: null,
  parentID: null,
  childContainers: [],
  childModules: [],
  controls: {},
  isBaseContainer: true
}

const initState: ContainerModules = {
  'project': initBaseCM
}

const moduleReducer = (state = initState, action: CMAction) => {
  switch (action.type) {
    case ADD_CONTAINER: return addContainerReducer(state, action as AddContainerAction)
    case REMOVE_CONTAINER: return removeContainerReducer(state, action as RemoveContainerAction)
    case MOVE_CONTAINER: return moveContainerReducer(state, action as MoveContainerAction)
    case RENAME_CONTAINER: return renameContainerReducer(state, action as RenameContainerAction)
    default: return state
  }
}

export default moduleReducer