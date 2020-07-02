import { Modules } from "../../stateTSTypes";
import { RemoveConnectionAction } from "../moduleTSTypes";

const removeConnection = (state: Modules, { fromID, toID, param }: RemoveConnectionAction) => {
  return Object.assign({}, state, {
    [toID]: {
      ...state[toID],
      inputs: state[toID].inputs.filter(inputData => inputData[0] !== fromID || inputData[1] !== param)
    },
    [fromID]: {
      ...state[fromID],
      outputs: state[fromID].outputs.filter(outputData => outputData[0] !== toID || outputData[1] !== param)
    },
  })
}

export default removeConnection