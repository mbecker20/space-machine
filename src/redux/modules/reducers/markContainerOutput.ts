import { Modules } from "../../stateTSTypes";
import { MarkContainerIOAction } from "../moduleTSTypes";

const markContainerOutput = (state: Modules, { id }: MarkContainerIOAction): Modules => {
  const parentID = state[id].parentID as string
  return Object.assign({}, state, {
    [id]: {
      ...state[id],
      isContainerOutput: true,
    },
    [parentID]: {
      ...state[parentID],
      connectionOutputs: [ ...state[parentID].connectionOutputs, id ],
    }
  })
}

export default markContainerOutput