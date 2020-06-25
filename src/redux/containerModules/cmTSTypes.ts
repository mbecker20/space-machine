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

export type CMAction = AddContainerAction | RemoveContainerAction