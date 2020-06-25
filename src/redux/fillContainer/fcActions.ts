import { CHANGE_FILL_CONTAINER } from './fcActionTypes'

export const changeFillContainer = (newID: string) => {
  return {
    type: CHANGE_FILL_CONTAINER,
    newID
  }
}