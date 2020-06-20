// base state object
// -----------------


export interface State {
  baseModule: Module
}


// Module related state
// --------------------


export interface Module {
  inputs: string
  outputs: string
  parent: Module | null
  children: ModuleChildren
  controls: Controls
  left: number // how far left in parent container component is. (the column index). 0 is most left
  top: number // how far down... 0 is most top
}

export interface ModuleChildren {
  [index: string]: Module
}


// control related state
// ---------------------


export interface Control {

}

export interface Controls {
  [index: string]: Control
}