// base state object
// -----------------


export interface State {
  baseContainerID: string
  fillContainerID: string
  containerModules: ContainerModules
  //modules: Modules
}


// Module related state
// --------------------


export interface Module { // the base of the Module types
  id: string // can contain info about nesting level
  row: number // modules row/col relative to parent container
  col: number
  inputs: null
  outputs: null
  parent: string | null // id of parent ContainerModule
  controls: Controls
}

export interface Modules {
  [index: string]: Module
}

export interface ContainerModule extends Module { // modules composing other modules in tree structure
  childContainers: string[] 
  childModules: string[] 
  maxRow: number // used for creating grid for when container is filling
  maxCol: number
}

export interface ContainerModules {
  [index: string]: ContainerModule
}

// control related state
// ---------------------

export interface Control {

}

export interface Controls {
  [index: string]: Control
}