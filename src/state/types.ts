// base state object
// -----------------


export interface State {
  baseModule: Module
}


// Module related state
// --------------------


export interface Module {
  id: string
  inputs: string
  outputs: string
  parent: Module | null
  children: ModuleChildren
  controls: Controls
}

export interface ModuleChildren {
  columns: Module[][]
  maxRow: number
}


// control related state
// ---------------------


export interface Control {

}

export interface Controls {
  [index: string]: Control
}