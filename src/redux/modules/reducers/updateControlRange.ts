import { Modules } from "../../stateTSTypes"
import { UpdateControlRangeAction } from "../moduleTSTypes"

const updateControlRange = (state: Modules, { modID, controlID, newRange }: UpdateControlRangeAction): Modules => {
  return Object.assign({}, state, {
    [modID]: {
      controlData: {
        ...state[modID].controlData,
        range: newRange
      }
    }
  })
}

export default updateControlRange