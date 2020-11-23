import moduleReducer from './modules/moduleReducer'
import bcidReducer from './baseContainerID/bcidReducer'
import connectionReducer from './connections/connectionReducer'
import { RootState } from './stateTSTypes'
import { ModuleAction } from './modules/moduleTSTypes'
import { BCIDAction } from './baseContainerID/bcidTSTypes'
import { ConnectionAction } from './connections/connectionTSTypes'
import { ADD_CONNECTION, REMOVE_CONNECTION, REMOVE_MODULE, MERGE_CONTAINER } from './connections/connectionActionTypes'
import { RESTORE_FROM_STATE } from './root/rootActionTypes'
import { RootAction } from './root/rootActionTSTypes'
import restoreAMFromState from '../audioModules/restoreAMFromState'

export function createInitState(forceNew?: boolean) {
  const savedState = forceNew ? 'undefined' : window.localStorage.getItem('spaceState')
  if (savedState && savedState !== 'undefined') {
    const restoredState = JSON.parse(savedState as string)
    restoreAMFromState({}, restoredState)
    return restoredState
  } else {
    window.audioModules = {}
    return {
      modules: moduleReducer(),
      connections: {},
      baseContainerID: bcidReducer(),
    }
  }
}

const initState = createInitState()

function combinedModuleConnectionReducer(state: RootState, action: ModuleAction | ConnectionAction) {
  if (action.type === ADD_CONNECTION || action.type === REMOVE_CONNECTION || action.type === REMOVE_MODULE || action.type === MERGE_CONTAINER) {
    return connectionReducer(state.modules, state.connections, action as ConnectionAction)
  } else {
    return {
      newModules: moduleReducer(state.modules, action as ModuleAction),
      newConnections: state.connections,
    }
  }
}

const rootReducer = (state = initState, action: ModuleAction | BCIDAction | ConnectionAction | RootAction): RootState => {
  if (action.type === RESTORE_FROM_STATE) {
    const newState = (action as RootAction).state
    const fullNewState = Object.assign(newState, newState.connections ? {} : {
      connections: {}
    })
    window.localStorage.setItem('spaceState', JSON.stringify(fullNewState))
    return fullNewState
  } else {
    const { newModules, newConnections } = combinedModuleConnectionReducer(state, action as ModuleAction | ConnectionAction)
    const newState = {
      modules: newModules,
      connections: newConnections,
      baseContainerID: bcidReducer(state.baseContainerID, action as BCIDAction),
    }
    window.localStorage.setItem('spaceState', JSON.stringify(newState))
    return newState
  }
}

export default rootReducer
