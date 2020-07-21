// base state object
// -----------------


export interface RootState {
  baseContainerID: string
  modules: Modules
}


// Module related state
// --------------------


export type ConnectionData = [string, string]

export interface Module { // the base of the Module types
  id: string
  name: string
  moduleType: string
  row: number // modules row/col relative to parent container
  col: number
  inputs: ConnectionData[]
  outputs: ConnectionData[]
  connectionInputs: string[]
  connectionOutputs: string[]
  isContainerInput: boolean
  isContainerOutput: boolean
  parentID: string | null // id of parent ContainerModule
}

export interface ContainerModule extends Module { // modules composing other modules in tree structure 
  childModules: string[]
  isBaseContainer: boolean
  inputModuleID?: string
  outputModuleID?: string
}

export interface Modules {
  [index: string]: Module | ContainerModule
}