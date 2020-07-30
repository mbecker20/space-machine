import { Modules, Connections } from "../../stateTSTypes"
import { AddConnectionAction } from "../connectionTSTypes"

const addConnection = (modules: Modules, connections: Connections, { fromID, toID, param, outputIndex, inputIndex, containerOutputChildID, containerInputChildID }: AddConnectionAction) => {
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