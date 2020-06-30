import { ContainerModule, Modules } from "../stateTSTypes"
import { ADD_MODULE, REMOVE_MODULE, MOVE_MODULE, RENAME_MODULE, ADD_CONNECTION, REMOVE_CONNECTION } from './moduleActionTypes'
import { ModuleAction, AddModuleAction, RemoveModuleAction, MoveModuleAction, RenameModuleAction, AddConnectionAction, RemoveConnectionAction } from './moduleTSTypes'
import { removeModuleReducer, addModuleReducer, moveModuleReducer, renameModuleReducer, addConnectionReducer, removeConnectionReducer } from "./reducers/allModuleReducers"
import { CONTAINER } from "../../audioModules/moduleTypes"

const initBaseCM: ContainerModule = {
  id: 'project',
  row: 0,
  col: 0,
  moduleType: CONTAINER,
  inputs: [],
  outputs: [],
  parentID: null,
  childModules: [],
  controls: {},
  isBaseContainer: true
}

const initState: Modules = {
  'project': initBaseCM
}

const moduleReducer = (state = initState, action: ModuleAction) => {
  switch (action.type) {
    case ADD_MODULE: return addModuleReducer(state, action as AddModuleAction)
    case REMOVE_MODULE: return removeModuleReducer(state, action as RemoveModuleAction)
    case MOVE_MODULE: return moveModuleReducer(state, action as MoveModuleAction)
    case RENAME_MODULE: return renameModuleReducer(state, action as RenameModuleAction)
    case ADD_CONNECTION: return addConnectionReducer(state, action as AddConnectionAction)
    case REMOVE_CONNECTION: return removeConnectionReducer(state, action as RemoveConnectionAction)
    default: return state
  }
}

export default moduleReducer