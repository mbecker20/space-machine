import { ContainerModule, ContainerModules } from "../stateTSTypes"
import { ADD_CONTAINER, REMOVE_CONTAINER } from './cmActionTypes'
import { CMAction, AddContainerAction, RemoveContainerAction } from './cmTSTypes'
import addContainer from './reducers/addContainer'
import { removeContainerReducer } from "./reducers/allCMReducers"

const initBaseCM: ContainerModule = { // this is the target. will be deleted
  id: '0',
  row: 0,
  col: 0,
  inputs: null,
  outputs: null,
  parentID: null,
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
    case REMOVE_CONTAINER: return removeContainerReducer(state, action as RemoveContainerAction)
    default: return state
  }
}

export default cmReducer