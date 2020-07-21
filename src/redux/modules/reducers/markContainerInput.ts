import { Modules } from "../../stateTSTypes";
import { MarkContainerIOAction } from "../moduleTSTypes";

const markContainerInput = (state: Modules, { id }: MarkContainerIOAction): Modules => {
  const parentID = state[id].parentID as string
  return Object.assign({}, state, {
    [id]: {
      ...state[id],
      isContainerInput: true,
    },
    [parentID]: {
      ...state[parentID],
      connectionInputs: [ ...state[parentID].connectionInputs, id ],
    }
  })
}

export default markContainerInput