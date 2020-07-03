import { ModuleType } from "../../audioModules/moduleTypes";

export interface AddModuleAction {
  type: string
  name: string
  moduleType: ModuleType
  id: string
  parentID: string
  row: number
  col: number
}

export interface RemoveModuleAction {
  type: string
  id: string
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

export interface AddConnectionAction {
  type: string
  fromID: string
  toID: string
  param: string
}

export interface RemoveConnectionAction {
  type: string
  fromID: string
  toID: string
  param: string
}

export type ModuleAction = AddModuleAction | RemoveModuleAction | MoveModuleAction | RenameModuleAction | AddConnectionAction | RemoveConnectionAction