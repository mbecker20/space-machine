export interface AddContainerAction {
  type: string
  id: string
  parentID: string
  row: number
  col: number
}

export interface RemoveContainerAction {
  type: string
  id: string
}

export interface MoveContainerAction {
  type: string
  id: string
  newRow: number
  newCol: number
}

export interface RenameContainerAction {
  type: string
  id: string
  newID: string
}

export type CMAction = AddContainerAction | RemoveContainerAction | MoveContainerAction | RenameContainerAction