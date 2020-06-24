// base state object
// -----------------


export interface RootState {
  baseContainerID: string
  fillContainer: FillContainerState
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
}

export interface ContainerModules {
  [index: string]: ContainerModule
}

export interface FillContainerState {
  id: string
  isExpanded: boolean
}

// control related state
// ---------------------

export interface Control {

}

export interface Controls {
  [index: string]: Control
}