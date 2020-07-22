import { Modules } from "../../stateTSTypes";
import { RemoveConnectionAction } from "../moduleTSTypes";

const removeConnection = (state: Modules, { fromID, toID, connectionID }: RemoveConnectionAction) => {
  return Object.assign({}, state, {
    [toID]: {
      ...state[toID],
      inputs: state[toID].inputs.filter(inputData => inputData.connectionID !== connectionID)
    },
    [fromID]: {
      ...state[fromID],
      outputs: state[fromID].outputs.filter(outputData => outputData.connectionID !== connectionID)
    },
  })
}

export default removeConnection