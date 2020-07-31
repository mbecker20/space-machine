import { ADD_CONNECTION, REMOVE_CONNECTION, REMOVE_MODULE } from "./connectionActionTypes"
import { AddConnectionAction, RemoveConnectionAction, RemoveModuleAction } from "./connectionTSTypes"

export const addConnection = (fromID: string, toID: string, param: string, outputIndex: number, inputIndex: number, containerOutputChildID?: string, containerInputChildID?: string): AddConnectionAction => {
  return {
    type: ADD_CONNECTION,
    fromID,
    toID,
    param,
    outputIndex,
    inputIndex,
    containerOutputChildID,
    containerInputChildID,
  }
}

export const removeConnection = (connectionID: string): RemoveConnectionAction => {
  return {
    type: REMOVE_CONNECTION,
    connectionID,
  }
}

export const removeModule = (id: string): RemoveModuleAction => {
  return {
    type: REMOVE_MODULE,
    id,
  }
}