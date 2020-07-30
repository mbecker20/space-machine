import { Modules, Connections } from "../stateTSTypes"
import { ConnectionAction } from "./connectionTSTypes"

const addConnection = (modules: Modules, connections: Connections, action: ConnectionAction) => {
  return {
    newModules: {
      ...modules
    },
    newConnections: {
      ...connections
    },
  }
}

export default addConnection