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
  UPDATE_CONTROL_VALUE,
  UPDATE_CONTROL_RANGE,
  RENAME_CONTAINER_CONTROL,
} from './moduleActionTypes'
import { ModuleType, ControlData, Range, Value } from '../../audioModules/moduleTypes'
import { AddModuleAction, MoveModuleAction, RenameModuleAction, MarkContainerIOAction, MarkContainerControlAction, UpdateControlValueAction, UpdateControlRangeAction, RenameContainerControlAction } from './moduleTSTypes'

export const addModule = (id: string, name: string, moduleType: ModuleType, controlData: ControlData, parentID: string, row: number, col: number, connectionInputs: string[], connectionOutputs: string[]): AddModuleAction => {
  return {
    type: ADD_MODULE,
    moduleType,
    id,
    name,
    controlData,
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

export const markContainerControl = (modID: string, controlID: string, actualModID: string, name?: string): MarkContainerControlAction => {
  return {
    type: MARK_CONTAINER_CONTROL,
    modID,
    controlID,
    actualModID,
    name,
  }
}

export const renameContainerControl = (name: string, parentModID: string, modID: string, controlID: string, actualModID: string): RenameContainerControlAction => {
  return {
    type: RENAME_CONTAINER_CONTROL,
    name,
    parentModID,
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

export const updateControlValue = (modID: string, controlID: string, newValue: Value): UpdateControlValueAction => {
  return {
    type: UPDATE_CONTROL_VALUE,
    modID,
    controlID,
    newValue,
  }
}

export const updateControlRange = (modID: string, controlID: string, newRange: Range): UpdateControlRangeAction => {
  return {
    type: UPDATE_CONTROL_RANGE,
    modID,
    controlID,
    newRange,
  }
}