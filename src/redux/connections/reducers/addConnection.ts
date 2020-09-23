import { Modules, Connections } from "../../stateTSTypes"
import { AddConnectionAction, ConnectionReducerReturn } from "../connectionTSTypes"
import genRandomID from "../../idGen"

const addConnection = (modules: Modules, connections: Connections, { fromID, toID, param, outputIndex, inputIndex, containerOutputChildID, containerInputChildID }: AddConnectionAction): ConnectionReducerReturn => {
  const connectionID = genRandomID(0, Object.keys(connections).length)
  return {
    newModules: Object.assign({}, modules, {
      [fromID]: {
        ...modules[fromID],
        outputs: [
          ...modules[fromID].outputs,
          connectionID
        ]
      },
      [toID]: {
        ...modules[toID],
        inputs: [
          ...modules[toID].inputs,
          connectionID
        ]
      }
    }),
    newConnections: {
      ...connections,
      [connectionID]: {
        connectionID,
        fromID,
        toID,
        param,
        outputIndex,
        inputIndex,
        actualOutputID: containerOutputChildID,
        actualInputID: containerInputChildID,
      },
    },
  }
}

export default addConnection