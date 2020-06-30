import { Modules } from "../../stateTSTypes";
import { RemoveConnectionAction } from "../moduleTSTypes";

const removeConnection = (state: Modules, { fromID, toID }: RemoveConnectionAction) => {
  return Object.assign({}, state, {
    [toID]: {
      ...state[toID],
      inputs: state[toID].inputs.filter(inputID => inputID !== fromID)
    },
    [fromID]: {
      ...state[fromID],
      outputs: state[fromID].outputs.filter(outputID => outputID !== toID)
    },
  })
}

export default removeConnection