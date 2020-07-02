import { Modules } from "../../stateTSTypes";
import { AddConnectionAction } from "../moduleTSTypes";

const addConnection = (state: Modules, { fromID, toID, prop }: AddConnectionAction) => {
  return Object.assign({}, state, {
    [toID]: {
      ...state[toID],
      inputs: [
        ...state[toID].inputs,
        [fromID, prop]
      ],
    },
    [fromID]: {
      ...state[fromID],
      outputs: [
        ...state[fromID].inputs,
        [toID, prop],
      ],
    }
  })
}

export default addConnection