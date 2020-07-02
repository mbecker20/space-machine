import { 
  ADD_MODULE,
  REMOVE_MODULE,
  MOVE_MODULE, 
  RENAME_MODULE,
  ADD_CONNECTION,
  REMOVE_CONNECTION
} from './moduleActionTypes'
import { ModuleType } from '../../audioModules/moduleTypes'

export const addModule = (id: string, moduleType: ModuleType, parentID: string, row: number, col: number) => {
  return {
    type: ADD_MODULE,
    moduleType,
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

export const renameModule = (id: string, newName: string) => {
  return {
    type: RENAME_MODULE,
    id,
    newName,
  }
}

export const addConnection = (fromID: string, toID: string, prop = '') => {
  return {
    type: ADD_CONNECTION,
    fromID,
    toID,
    prop,
  }
}

export const removeConnection = (fromID: string, toID: string, prop = '') => {
  return {
    type: REMOVE_CONNECTION,
    fromID,
    toID,
    prop,
  }
}