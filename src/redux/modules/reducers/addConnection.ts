import { Modules } from "../../stateTSTypes";
import { AddConnectionAction } from "../moduleTSTypes"

function getConnectionID(fromID: string, toID: string, param: string, outputIndex: number, inputIndex: number, containerOutputChildID = '', containerInputChildID = '') {
  return fromID + toID + param + outputIndex + inputIndex + containerOutputChildID + containerInputChildID
}

const addConnection = (state: Modules, { fromID, toID, param, outputIndex, inputIndex, containerOutputChildID, containerInputChildID }: AddConnectionAction) => {
  const connectionID = getConnectionID(fromID, toID, param, outputIndex, inputIndex, containerOutputChildID, containerInputChildID)
  return Object.assign({}, state, {
    [toID]: {
      ...state[toID],
      inputs: [
        ...state[toID].inputs,
        {
          connectionID,
          connectedID: fromID,
          param,
          outputIndex,
          inputIndex,
          containerOutputChildID,
          containerInputChildID,
        },
      ],
    },
    [fromID]: {
      ...state[fromID],
      outputs: [
        ...state[fromID].outputs,
        {
          connectionID,
          connectedID: toID,
          param,
          outputIndex,
          inputIndex,
          containerOutputChildID,
          containerInputChildID,
        },
      ],
    }
  }, containerInputChildID && containerInputChildID.length !== 0 ? {
    [containerInputChildID]: {
      ...state[containerInputChildID],
      inputs: [
        ...state[containerInputChildID].inputs,
        {
          connectionID,
          connectedID: fromID,
          param,
          outputIndex,
          inputIndex,
          containerOutputChildID,
          undefined,
        }
      ]
    }
  } : {})
}

export default addConnection