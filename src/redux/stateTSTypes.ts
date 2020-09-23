import { ControlData } from "../audioModules/moduleTypes";

// base state object
// -----------------


export interface RootState {
  modules: Modules
  connections: Connections
  baseContainerID: string
}


// Module related state
// --------------------

export interface Module { // the base of the Module types
  id: string
  name: string
  moduleType: string
  row: number // modules row/col relative to parent container
  col: number
  inputs: string[]
  outputs: string[]
  controlData: ControlData
  connectionInputs: string[] // these are the audionode i/o ports/channels, or in the case of containers, ids referencing 
  connectionOutputs: string[]
  isContainerInput: boolean
  isContainerOutput: boolean
  parentID: string | null // id of parent ContainerModule
}

export interface ContainerControl {
  modID: string
  controlID: string
  actualModID: string
  name?: string
  markedToContainer: boolean
}

export interface ContainerModule extends Module { // modules composing other modules in tree structure 
  childModules: string[]
  isBaseContainer: boolean
  containerControls: ContainerControl[]
}

export interface Modules {
  [index: string]: Module | ContainerModule
}

// connection related state

export interface ConnectionData {
  connectionID: string // stored on both from and to modules
  fromID: string
  toID: string
  param: string
  outputIndex: number
  inputIndex: number
  actualOutputID?: string // this is the actual module id
  actualInputID?: string
}

export interface Connections {
  [connectionID: string]: ConnectionData
}