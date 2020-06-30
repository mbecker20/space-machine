// base state object
// -----------------


export interface RootState {
  baseContainerID: string
  modules: Modules
}


// Module related state
// --------------------


export interface Module { // the base of the Module types
  id: string // can contain info about nesting level
  type: string
  row: number // modules row/col relative to parent container
  col: number
  inputs: null
  outputs: null
  parentID: string | null // id of parent ContainerModule
  controls: Controls
}

export interface ContainerModule extends Module { // modules composing other modules in tree structure
  childContainers: string[] 
  childModules: string[]
  isBaseContainer: boolean
}

export interface Modules {
  [index: string]: Module | ContainerModule
}

// control related state
// ---------------------

export interface Control {
  
}

export interface Controls {
  [index: string]: Control
}