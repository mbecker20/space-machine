import { ADD_CONNECTION, REMOVE_CONNECTION, REMOVE_MODULE, MERGE_CONTAINER } from "./connectionActionTypes"
import { AddConnectionAction, RemoveConnectionAction, RemoveModuleAction, MergeContainerAction } from "./connectionTSTypes"
import { Modules, Connections } from "../stateTSTypes"

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

export const mergeContainer = (newModules: Modules, newConnections: Connections): MergeContainerAction => {
  return {
    type: MERGE_CONTAINER,
    newModules,
    newConnections,
  }
}