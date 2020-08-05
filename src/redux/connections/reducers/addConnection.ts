import { Modules, Connections } from "../../stateTSTypes"
import { AddConnectionAction, ConnectionReducerReturn } from "../connectionTSTypes"

let connectionNumber = 0

const addConnection = (modules: Modules, connections: Connections, { fromID, toID, param, outputIndex, inputIndex, containerOutputChildID, containerInputChildID }: AddConnectionAction): ConnectionReducerReturn => {
  const connectionID = `${fromID} ${toID} ${connectionNumber}`
  connectionNumber++
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