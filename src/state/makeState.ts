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
    children: {},
    controls: {},
    left: 0,
    top: 0,
  }
  return mod
}