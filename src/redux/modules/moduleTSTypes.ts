import { ModuleType, ControlData, Value, Range } from "../../audioModules/moduleTypes";

export interface AddModuleAction {
  type: string
  name: string
  moduleType: ModuleType
  controlData: ControlData
  id: string
  parentID: string
  row: number
  col: number
  connectionInputs: string[]
  connectionOutputs: string[]
}

export interface MoveModuleAction {
  type: string
  id: string
  newRow: number
  newCol: number
}

export interface RenameModuleAction {
  type: string
  id: string
  newName: string
}

export interface MarkContainerIOAction {
  type: string
  id: string
}

export interface MarkContainerControlAction {
  type: string
  modID: string
  controlID: string
  actualModID: string
}

export interface UpdateControlValueAction {
  type: string
  modID: string
  controlID: string
  newValue: Value
}

export interface UpdateControlRangeAction {
  type: string
  modID: string
  controlID: string
  newRange: Range
}

export type ModuleAction = AddModuleAction | MoveModuleAction | 
RenameModuleAction | MarkContainerIOAction | MarkContainerControlAction |
UpdateControlValueAction | UpdateControlRangeAction