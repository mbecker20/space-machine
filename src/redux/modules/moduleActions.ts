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
import { ModuleType } from '../../audioModules/moduleTypes'
import { AddModuleAction, MoveModuleAction, RenameModuleAction, MarkContainerIOAction, MarkContainerControlAction } from './moduleTSTypes'

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

export const markContainerControl = (modID: string, controlID: string, actualModID: string): MarkContainerControlAction => {
  return {
    type: MARK_CONTAINER_CONTROL,
    modID,
    controlID,
    actualModID,
  }
}

export const unmarkContainerControl = (modID: string, controlID: string, actualModID: string): MarkContainerControlAction => {
  return {
    type: UNMARK_CONTAINER_CONTROL,
    modID,
    controlID,
    actualModID,
  }
}