export interface Down1BaseAction {
  type: string
  newID: string
}

export interface ChangeBaseAction {
  type: string
  newID: string
}

export type BCIDAction = Down1BaseAction | ChangeBaseAction