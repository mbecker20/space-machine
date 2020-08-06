import { Modules, Connections } from "../../stateTSTypes"
import { MergeContainerAction, ConnectionReducerReturn } from "../connectionTSTypes"

const mergeContainer = (modules: Modules, connections: Connections, { newModules, newConnections }: MergeContainerAction): ConnectionReducerReturn => {
  return {
    newModules: Object.assign({}, modules, newModules),
    newConnections: Object.assign({}, connections, newConnections)
  }
}

export default mergeContainer