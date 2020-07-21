import { 
  ADD_MODULE,
  REMOVE_MODULE,
  MOVE_MODULE, 
  RENAME_MODULE,
  ADD_CONNECTION,
  REMOVE_CONNECTION,
  CONNECT_INPUT_MODULE,
  DISCONNECT_INPUT_MODULE,
  DISCONNECT_OUTPUT_MODULE,
  CONNECT_OUTPUT_MODULE
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

export const MarkContainerInput = (id: string) => {
  return {
    type: MARK_CONTAINER_INPUT,
    id,
  }
}

export const disconnectInputModule = () => {
  return {
    type: DISCONNECT_INPUT_MODULE,
  }
}

export const connectOutputModule = (id: string) => {
  return {
    type: CONNECT_OUTPUT_MODULE,
    id
  }
}

export const disconnectOutputModule = () => {
  return {
    type: DISCONNECT_OUTPUT_MODULE,
  }
}