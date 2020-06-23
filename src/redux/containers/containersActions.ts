import { ADD_CHILD } from './containersActionTypes'

export const addChild = (col: number, row: number) => {
  return {
    type: ADD_CHILD,
    col: col,
    row: row,
  }
}