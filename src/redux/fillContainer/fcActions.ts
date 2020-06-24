import { CHANGE_FILL_CONTAINER, SET_IS_EXPANDED } from './fcActionTypes'

export const changeFillContainer = (newID: string) => {
  return {
    type: CHANGE_FILL_CONTAINER,
    newID
  }
}

export const setIsExpanded = (isExpanded: boolean) => {
  return {
    type: SET_IS_EXPANDED,
    isExpanded,
  }
}