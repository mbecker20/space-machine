import { Modules } from "../../stateTSTypes"
import { UpdateControlRangeAction } from "../moduleTSTypes"
import { clamp } from "../../../helpers/genFuncs"

const updateControlRange = (state: Modules, { modID, controlID, newRange }: UpdateControlRangeAction): Modules => {
  return Object.assign({}, state, {
    [modID]: {
      controlData: {
        ...state[modID].controlData,
        range: newRange,
        value: clamp(state[modID].controlData[controlID].value as number, newRange)
      }
    }
  })
}

export default updateControlRange