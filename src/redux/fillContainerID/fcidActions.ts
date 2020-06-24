import { CHANGE_FILL_CONTAINER } from './fcidActionTypes'

export const changeFillContainer = (newID: string) => {
  return {
    type: CHANGE_FILL_CONTAINER,
    newID
  }
}