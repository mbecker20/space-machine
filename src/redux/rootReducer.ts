import moduleReducer from './modules/moduleReducer'
import bcidReducer from './baseContainerID/bcidReducer'
import connectionReducer from './connections/connectionReducer'
import { RootState } from './stateTSTypes'
import { ModuleAction } from './modules/moduleTSTypes'
import { BCIDAction } from './baseContainerID/bcidTSTypes'
import { ConnectionAction } from './connections/connectionTSTypes'
import { ADD_CONNECTION, REMOVE_CONNECTION } from './connections/connectionActionTypes'

const initState = {
  modules: moduleReducer(),
  connections: {},
  baseContainerID: bcidReducer(),
}

function combinedModuleConnectionReducer(state: RootState, action: ModuleAction | ConnectionAction) {
  if (action.type === ADD_CONNECTION || action.type === REMOVE_CONNECTION) {
    return connectionReducer(state.modules, state.connections, action as ConnectionAction)
  } else {
    return {
      newModules: moduleReducer(state.modules, action as ModuleAction),
      newConnections: state.connections,
    }
  }
}

const rootReducer = (state = initState, action: ModuleAction | BCIDAction | ConnectionAction): RootState => {
  const { newModules, newConnections } = combinedModuleConnectionReducer(state, action as ModuleAction | ConnectionAction)
  return {
    modules: newModules,
    connections: newConnections,
    baseContainerID: bcidReducer(state.baseContainerID, action as BCIDAction),
  }
}

export default rootReducer
