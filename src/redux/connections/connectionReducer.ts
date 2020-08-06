import { Modules, Connections } from "../stateTSTypes"
import { ConnectionAction, ConnectionReducerReturn, RemoveConnectionAction, AddConnectionAction, RemoveModuleAction, MergeContainerAction } from "./connectionTSTypes"
import { ADD_CONNECTION, REMOVE_CONNECTION, REMOVE_MODULE, MERGE_CONTAINER } from "./connectionActionTypes"
import addConnection from "./reducers/addConnection"
import removeConnection from "./reducers/removeConnection"
import removeModule from './reducers/removeModule'
import mergeContainer from './reducers/mergeContainer'

const connectionReducer = (modules: Modules, connections: Connections, action: ConnectionAction): ConnectionReducerReturn => {
  switch (action.type) {
    case ADD_CONNECTION: return addConnection(modules, connections, action as AddConnectionAction)
    case REMOVE_CONNECTION: return removeConnection(modules, connections, action as RemoveConnectionAction)
    case REMOVE_MODULE: return removeModule(modules, connections, action as RemoveModuleAction)
    case MERGE_CONTAINER: return mergeContainer(modules, connections, action as MergeContainerAction)
    default: return { newModules: modules, newConnections: connections }
  }
}

export default connectionReducer