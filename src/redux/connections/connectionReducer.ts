import { Modules, Connections } from "../stateTSTypes";
import { ConnectionAction } from "./connectionTSTypes";

const connectionReducer = (modules: Modules, connections: Connections, action?: ConnectionAction) => {
  return {
    newModules: {
      ...modules
    },
    newConnections: {
      ...connections
    }
  }
}

export default connectionReducer