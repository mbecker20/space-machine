import { 
  ADD_CONTAINER,
  REMOVE_CONTAINER, 
} from './cmActionTypes'

export const addContainer = (id: string, parentID: string, row: number, col: number) => {
  return {
    type: ADD_CONTAINER,
    id,
    row,
    col,
    parentID,
  }
}

export const removeContainer = (id: string) => {
  return {
    type: REMOVE_CONTAINER,
    id,
  }
}