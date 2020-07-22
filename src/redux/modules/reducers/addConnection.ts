import { Modules } from "../../stateTSTypes";
import { AddConnectionAction } from "../moduleTSTypes";

const addConnection = (state: Modules, { fromID, toID, param, outputIndex, inputIndex, containerOutputChildID, containerInputChildID }: AddConnectionAction) => {
  return Object.assign({}, state, {
    [toID]: {
      ...state[toID],
      inputs: [
        ...state[toID].inputs,
        {
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
          connectedID: toID,
          param,
          outputIndex,
          inputIndex,
          containerOutputChildID,
          containerInputChildID,
        },
      ],
    }
  })
}

export default addConnection