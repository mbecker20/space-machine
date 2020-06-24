export interface ChangeFillContainerAction {
  type: string
  newID: string
}

export interface SetIsExpandedAction {
  type: string
  isExpanded: boolean
}

export type FCAction = ChangeFillContainerAction | SetIsExpandedAction