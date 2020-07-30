import { ContainerModule, Modules } from "../stateTSTypes"
import { 
  ADD_MODULE,
  MOVE_MODULE, 
  RENAME_MODULE, 
  MARK_CONTAINER_INPUT,
  UNMARK_CONTAINER_INPUT,
  MARK_CONTAINER_OUTPUT,
  UNMARK_CONTAINER_OUTPUT,
  MARK_CONTAINER_CONTROL,
  UNMARK_CONTAINER_CONTROL,
} from './moduleActionTypes'
import { 
  ModuleAction, 
  AddModuleAction, 
  MoveModuleAction, 
  RenameModuleAction, 
  MarkContainerIOAction,
  MarkContainerControlAction,
} from './moduleTSTypes'
import { 
  addModuleReducer, 
  moveModuleReducer, 
  renameModuleReducer, 
  markContainerInputReducer,
  unmarkContainerInputReducer,
  markContainerOutputReducer,
  unmarkContainerOutputReducer,
  markContainerControlReducer,
  unmarkContainerControlReducer,
} from "./reducers/allModuleReducers"
import { CONTAINER } from "../../audioModules/moduleTypes"

const initBaseCM: ContainerModule = {
  id: 'project',
  name: 'project',
  row: 0,
  col: 0,
  moduleType: CONTAINER,
  connectionInputs: [],
  connectionOutputs: [],
  toContainerControls: [],
  inputs: [],
  outputs: [],
  parentID: null,
  childModules: [],
  isBaseContainer: true,
  isContainerInput: false,
  isContainerOutput: false,
  containerControls: [],
}

const initState: Modules = {
  'project': initBaseCM
}

const moduleReducer = (state = initState, action?: ModuleAction) => {
  if (action) {
    switch (action.type) {
      case ADD_MODULE: return addModuleReducer(state, action as AddModuleAction)
      case MOVE_MODULE: return moveModuleReducer(state, action as MoveModuleAction)
      case RENAME_MODULE: return renameModuleReducer(state, action as RenameModuleAction)
      case MARK_CONTAINER_INPUT: return markContainerInputReducer(state, action as MarkContainerIOAction)
      case UNMARK_CONTAINER_INPUT: return unmarkContainerInputReducer(state, action as MarkContainerIOAction)
      case MARK_CONTAINER_OUTPUT: return markContainerOutputReducer(state, action as MarkContainerIOAction)
      case UNMARK_CONTAINER_OUTPUT: return unmarkContainerOutputReducer(state, action as MarkContainerIOAction)
      case MARK_CONTAINER_CONTROL: return markContainerControlReducer(state, action as MarkContainerControlAction)
      case UNMARK_CONTAINER_CONTROL: return unmarkContainerControlReducer(state, action as MarkContainerControlAction)
      default: return state
    }
  } else {
    return state
  }
}

export default moduleReducer