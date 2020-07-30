import { ADD_CONNECTION, REMOVE_CONNECTION } from "./connectionActionTypes"
import { AddConnectionAction, RemoveConnectionAction } from "./connectionTSTypes"

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

export const removeConnection = (fromID: string, toID: string, connectionID: string): RemoveConnectionAction => {
  return {
    type: REMOVE_CONNECTION,
    fromID,
    toID,
    connectionID,
  }
}