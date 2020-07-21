import { Modules } from "../../stateTSTypes";
import { MarkContainerIOAction } from "../moduleTSTypes";

const unmarkContainerOutput = (state: Modules, { id }: MarkContainerIOAction): Modules => {
  const parentID = state[id].parentID as string
  return Object.assign({}, state, {
    [id]: {
      ...state[id],
      isContainerInput: false,
    },
    [parentID]: {
      ...state[parentID],
      connectionOutputs: state[parentID].connectionOutputs.filter(outputID => outputID !== id),
    }
  })
}

export default unmarkContainerOutput