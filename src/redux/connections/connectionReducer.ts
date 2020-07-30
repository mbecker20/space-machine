import { Modules, Connections } from "../stateTSTypes"
import { ConnectionAction, ConnectionReducerReturn, RemoveConnectionAction, AddConnectionAction } from "./connectionTSTypes"
import { ADD_CONNECTION, REMOVE_CONNECTION } from "./connectionActionTypes"
import addConnection from "./reducers/addConnection"
import removeConnection from "./reducers/removeConnection"

const connectionReducer = (modules: Modules, connections: Connections, action?: ConnectionAction): ConnectionReducerReturn => {
  if (action) {
    switch (action.type) {
      case ADD_CONNECTION: return addConnection(modules, connections, action as AddConnectionAction)
      case REMOVE_CONNECTION: return removeConnection(modules, connections, action as RemoveConnectionAction)
      default: return { newModules: modules, newConnections: connections }
    }
  } else {
    return { newModules: modules, newConnections: connections }
  }
}

export default connectionReducer