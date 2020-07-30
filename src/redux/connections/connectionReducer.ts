import { Modules, Connections } from "../stateTSTypes"
import { ConnectionAction, ConnectionReducerReturn, RemoveConnectionAction, AddConnectionAction, RemoveModuleAction } from "./connectionTSTypes"
import { ADD_CONNECTION, REMOVE_CONNECTION, REMOVE_MODULE } from "./connectionActionTypes"
import addConnection from "./reducers/addConnection"
import removeConnection from "./reducers/removeConnection"
import removeModule from './reducers/removeModule'

const connectionReducer = (modules: Modules, connections: Connections, action?: ConnectionAction): ConnectionReducerReturn => {
  if (action) {
    switch (action.type) {
      case ADD_CONNECTION: return addConnection(modules, connections, action as AddConnectionAction)
      case REMOVE_CONNECTION: return removeConnection(modules, connections, action as RemoveConnectionAction)
      case REMOVE_MODULE: return removeModule(modules, connections, action as RemoveModuleAction)
      default: return { newModules: modules, newConnections: connections }
    }
  } else {
    return { newModules: modules, newConnections: connections }
  }
}

export default connectionReducer