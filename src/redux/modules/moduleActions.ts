import { 
  ADD_MODULE,
  REMOVE_MODULE,
  MOVE_MODULE, 
  RENAME_MODULE,
  ADD_CONNECTION,
  REMOVE_CONNECTION,
  MARK_CONTAINER_INPUT,
  UNMARK_CONTAINER_INPUT,
  MARK_CONTAINER_OUTPUT,
  UNMARK_CONTAINER_OUTPUT,
} from './moduleActionTypes'
import { ModuleType } from '../../audioModules/moduleTypes'

export const addModule = (id: string, name: string, moduleType: ModuleType, parentID: string, row: number, col: number) => {
  return {
    type: ADD_MODULE,
    moduleType,
    id,
    name,
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

export const addConnection = (fromID: string, toID: string, param = '') => {
  return {
    type: ADD_CONNECTION,
    fromID,
    toID,
    param,
  }
}

export const removeConnection = (fromID: string, toID: string, param = '') => {
  return {
    type: REMOVE_CONNECTION,
    fromID,
    toID,
    param,
  }
}

export const markContainerInput = (id: string) => {
  return {
    type: MARK_CONTAINER_INPUT,
    id,
  }
}

export const unmarkContainerInput = (id: string) => {
  return {
    type: UNMARK_CONTAINER_INPUT,
    id,
  }
}
export const markContainerOutput = (id: string) => {
  return {
    type: MARK_CONTAINER_OUTPUT,
    id,
  }
}

export const unmarkContainerOutput = (id: string) => {
  return {
    type: UNMARK_CONTAINER_OUTPUT,
    id,
  }
}