import { Module, ModuleAction } from "../stateTSTypes"
import { ADD_CHILD } from './moduleTypes'

const initState: Module = {
  id: 'empty',
  inputs: '',
  outputs: '',
  parent: null,
  children: {
    columns: [],
    maxRow: 0,
  },
  controls: {},
}

const moduleReducer = (state = initState, action: ModuleAction) => {
  switch(action.type) {
    case ADD_CHILD: return {
      ...state,

    }
    default: return state
  }
}

export default moduleReducer