import { ModuleType } from "../../audioModules/moduleTypes";

export interface AddModuleAction {
  type: string
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
  newID: string
}

export type ModuleAction = AddModuleAction | RemoveModuleAction | MoveModuleAction | RenameModuleAction