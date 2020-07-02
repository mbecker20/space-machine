import { Modules } from "../../stateTSTypes";
import { AddConnectionAction } from "../moduleTSTypes";

const addConnection = (state: Modules, { fromID, toID, param }: AddConnectionAction) => {
  return Object.assign({}, state, {
    [toID]: {
      ...state[toID],
      inputs: [
        ...state[toID].inputs,
        [fromID, param]
      ],
    },
    [fromID]: {
      ...state[fromID],
      outputs: [
        ...state[fromID].inputs,
        [toID, param],
      ],
    }
  })
}

export default addConnection