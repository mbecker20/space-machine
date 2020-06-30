import { 
  ADD_MODULE,
  REMOVE_MODULE,
  MOVE_MODULE, 
  RENAME_MODULE,
} from './moduleActionTypes'

export const addModule = (id: string, type: , parentID: string, row: number, col: number) => {
  return {
    type: ADD_MODULE,
    id,
    row,
    col,
    parentID,
  }
}

export const removeModule = (id: string) => {
  return {
    type: REMOVE_MODULE,
    id,
  }
}

export const moveModule = (id: string, newRow: number, newCol: number) => {
  return {
    type: MOVE_MODULE,
    id,
    newRow,
    newCol,
  }
}

export const renameModule = (id: string, newID: string) => {
  return {
    type: RENAME_MODULE,
    id,
    newID,
  }
}