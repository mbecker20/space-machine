import { Modules } from "../../stateTSTypes";
import { MarkContainerIOAction } from "../moduleTSTypes";

const unmarkContainerInput = (state: Modules, { id }: MarkContainerIOAction): Modules => {
  const parentID = state[id].parentID as string
  return Object.assign({}, state, {
    [id]: {
      ...state[id],
      isContainerInput: false,
    },
    [parentID]: {
      ...state[parentID],
      connectionInputs: state[parentID].connectionInputs.filter( inputID => inputID !== id ),
    }
  })
}

export default unmarkContainerInput