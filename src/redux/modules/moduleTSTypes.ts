export interface AddModuleAction {
  type: string
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

export type CMAction = AddModuleAction | RemoveModuleAction | MoveModuleAction | RenameModuleAction