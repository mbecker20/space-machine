import { 
  ADD_CONTAINER,
  //UPDATE_CONTAINER_MAXROW,
  //UPDATE_CONTAINER_MAXCOL, 
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