import { ContainerModule, Modules } from "../stateTSTypes"
import { ADD_MODULE, REMOVE_MODULE, MOVE_MODULE, RENAME_MODULE, ADD_CONNECTION, REMOVE_CONNECTION, CONNECT_INPUT_MODULE, DISCONNECT_INPUT_MODULE, CONNECT_OUTPUT_MODULE, DISCONNECT_OUTPUT_MODULE } from './moduleActionTypes'
import { 
  ModuleAction, 
  AddModuleAction, 
  RemoveModuleAction, 
  MoveModuleAction, 
  RenameModuleAction, 
  AddConnectionAction, 
  RemoveConnectionAction,
  ConnectInputModuleAction,
  ConnectOutputModuleAction,
} from './moduleTSTypes'
import { 
  removeModuleReducer, 
  addModuleReducer, 
  moveModuleReducer, 
  renameModuleReducer, 
  addConnectionReducer, 
  removeConnectionReducer,
  connectInputModuleReducer,
  disconnectInputModuleReducer,
  connectOutputModuleReducer,
  disconnectOutputModuleReducer,
} from "./reducers/allModuleReducers"
import { CONTAINER } from "../../audioModules/moduleTypes"

const initBaseCM: ContainerModule = {
  id: 'project',
  name: 'project',
  row: 0,
  col: 0,
  moduleType: CONTAINER,
  inputs: [],
  outputs: [],
  parentID: null,
  childModules: [],
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
    case CONNECT_INPUT_MODULE: return connectInputModuleReducer(state, action as ConnectInputModuleAction)
    case DISCONNECT_INPUT_MODULE: return disconnectInputModuleReducer(state)
    case CONNECT_OUTPUT_MODULE: return connectOutputModuleReducer(state, action as ConnectOutputModuleAction)
    case DISCONNECT_OUTPUT_MODULE: return disconnectOutputModuleReducer(state)
    default: return state
  }
}

export default moduleReducer