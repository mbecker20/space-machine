import { Modules } from "../../stateTSTypes";
import { RemoveConnectionAction } from "../moduleTSTypes";

const removeConnection = (state: Modules, { fromID, toID, connectionID }: RemoveConnectionAction) => {
  const { param, containerInputChildID, containerOutputChildID } = state[toID].inputs.filter(inputData => inputData.connectionID === connectionID)[0]
  return Object.assign({}, state, {
    [toID]: {
      ...state[toID],
      inputs: state[toID].inputs.filter(inputData => inputData.connectionID !== connectionID)
    },
    [fromID]: {
      ...state[fromID],
      outputs: state[fromID].outputs.filter(outputData => outputData.connectionID !== connectionID)
    },
  }, containerInputChildID && containerInputChildID.length !== 0 ? {
    [containerInputChildID]: {
      ...state[containerInputChildID],
      inputs: state[containerInputChildID].inputs.filter(inputData => )
    }
  } : {}, )
}

export default removeConnection