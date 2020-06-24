import { ContainerModule, ContainerModules } from "../stateTSTypes"
import { ADD_CONTAINER } from './cmActionTypes'
import { CMAction, AddContainerAction } from './cmTSTypes'
import addContainer from './reducers/addContainer'

const initBaseCM: ContainerModule = { // this is the target. will be deleted
  id: '0',
  row: 0,
  col: 0,
  inputs: null,
  outputs: null,
  parent: null,
  childContainers: [],
  childModules: [],
  controls: {},
}

const initState: ContainerModules = {
  '0': initBaseCM
}

const cmReducer = (state = initState, action: CMAction) => {
  switch (action.type) {
    case ADD_CONTAINER: return addContainer(state, action as AddContainerAction)
    default: return state
  }
}

export default cmReducer