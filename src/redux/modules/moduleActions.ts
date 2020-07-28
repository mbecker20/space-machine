import { 
  ADD_MODULE,
  REMOVE_MODULE,
  MOVE_MODULE, 
  RENAME_MODULE,
  ADD_CONNECTION,
  REMOVE_CONNECTION,
  MARK_CONTAINER_INPUT,
  UNMARK_CONTAINER_INPUT,
  MARK_CONTAINER_OUTPUT,
  UNMARK_CONTAINER_OUTPUT,
  MARK_CONTAINER_CONTROL,
  UNMARK_CONTAINER_CONTROL,
} from './moduleActionTypes'
import { ModuleType } from '../../audioModules/moduleTypes'
import { AddModuleAction, RemoveModuleAction, MoveModuleAction, RenameModuleAction, AddConnectionAction, RemoveConnectionAction, MarkContainerIOAction, MarkContainerControlAction } from './moduleTSTypes'

export const addModule = (id: string, name: string, moduleType: ModuleType, parentID: string, row: number, col: number, connectionInputs: string[], connectionOutputs: string[]): AddModuleAction => {
  return {
    type: ADD_MODULE,
    moduleType,
    id,
    name,
    row,
    col,
    parentID,
    connectionInputs,
    connectionOutputs,
  }
}

export const removeModule = (id: string): RemoveModuleAction => {
  return {
    type: REMOVE_MODULE,
    id,
  }
}

export const moveModule = (id: string, newRow: number, newCol: number): MoveModuleAction => {
  return {
    type: MOVE_MODULE,
    id,
    newRow,
    newCol,
  }
}

export const renameModule = (id: string, newName: string): RenameModuleAction => {
  return {
    type: RENAME_MODULE,
    id,
    newName,
  }
}

export const addConnection = (fromID: string, toID: string, param: string, outputIndex: number, inputIndex: number, containerOutputChildID?: string, containerInputChildID?: string): AddConnectionAction => {
  return {
    type: ADD_CONNECTION,
    fromID,
    toID,
    param,
    outputIndex,
    inputIndex,
    containerOutputChildID,
    containerInputChildID,
  }
}

export const removeConnection = (fromID: string, toID: string, connectionID: string): RemoveConnectionAction => {
  return {
    type: REMOVE_CONNECTION,
    fromID,
    toID,
    connectionID,
  }
}

export const markContainerInput = (id: string): MarkContainerIOAction => {
  return {
    type: MARK_CONTAINER_INPUT,
    id,
  }
}

export const unmarkContainerInput = (id: string): MarkContainerIOAction => {
  return {
    type: UNMARK_CONTAINER_INPUT,
    id,
  }
}
export const markContainerOutput = (id: string): MarkContainerIOAction => {
  return {
    type: MARK_CONTAINER_OUTPUT,
    id,
  }
}

export const unmarkContainerOutput = (id: string): MarkContainerIOAction => {
  return {
    type: UNMARK_CONTAINER_OUTPUT,
    id,
  }
}

export const markContainerControl = (modID: string, controlID: string): MarkContainerControlAction => {
  return {
    type: MARK_CONTAINER_CONTROL,
    modID,
    controlID,
  }
}

export const unmarkContainerControl = (modID: string, controlID: string): MarkContainerControlAction => {
  return {
    type: UNMARK_CONTAINER_CONTROL,
    modID,
    controlID,
  }
}