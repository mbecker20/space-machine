import { Modules, Connections } from "../stateTSTypes";

export interface AddConnectionAction {
  type: string
  fromID: string
  toID: string
  param: string
  outputIndex: number // audioNode i/o index (audioNode.connect(otherAudioNode, outputIndex))
  inputIndex: number
  containerOutputChildID?: string
  containerInputChildID?: string
}

export interface RemoveConnectionAction {
  type: string
  connectionID: string
}

export interface RemoveModuleAction {
  type: string
  id: string
}

export interface ConnectionReducerReturn {
  newModules: Modules
  newConnections: Connections
}

export type ConnectionAction = AddConnectionAction | RemoveConnectionAction | RemoveModuleAction