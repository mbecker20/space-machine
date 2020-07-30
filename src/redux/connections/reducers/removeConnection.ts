import { Modules, Connections } from "../stateTSTypes"
import { RemoveConnectionAction } from "../connectionTSTypes"

const removeConnection = (modules: Modules, connections: Connections, action: RemoveConnectionAction) => {
  return {
    newModules: {
      ...modules
    },
    newConnections: {
      ...connections
    }
  }
}

export default removeConnection