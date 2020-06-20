import { State, Module } from './types'


// base state creation
// --------------


export default function makeState() {
  const state: State = {
    baseModule: makeEmptyModule(),
  }
  return state
}


// module related state
// --------------------


function makeEmptyModule() {
  const mod: Module = {
    inputs: '',
    outputs: '',
    parent: null,
    children: {
      columns: [],
      maxRow: 0,
    },
    controls: {},
  }
  return mod
}