import { Modules } from "../../stateTSTypes";
import { AddConnectionAction } from "../moduleTSTypes";

const addConnection = (state: Modules, { fromID, toID }: AddConnectionAction) => {
  return Object.assign({}, state, {
    [toID]: {
      ...state[toID],
      inputs: [
        ...state[toID].inputs,
        fromID
      ],
    },
    [fromID]: {
      ...state[toID],
      inputs: [
        ...state[fromID].inputs,
        toID,
      ],
    }
  })
}

export default addConnection