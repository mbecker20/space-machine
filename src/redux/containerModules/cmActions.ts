import { 
  ADD_CONTAINER,
  REMOVE_CONTAINER,
  MOVE_CONTAINER, 
  RENAME_CONTAINER,
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

export const moveContainer = (id: string, newRow: number, newCol: number) => {
  return {
    type: MOVE_CONTAINER,
    id,
    newRow,
    newCol,
  }
}

export const renameContainer = (id: string, newID: string) => {
  return {
    type: RENAME_CONTAINER,
    id,
    newID,
  }
}