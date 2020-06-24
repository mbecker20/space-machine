export interface AddContainerAction {
  type: string
  id: string
  parentID: string
  row: number
  col: number
}

export type CMAction = AddContainerAction // or ...