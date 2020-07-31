import { Modules } from "../../stateTSTypes";
import { UpdateControlValueAction } from "../moduleTSTypes";

const updateControlValue = (state: Modules, { modID, controlID, newValue }: UpdateControlValueAction) => {
  return Object.assign({}, state, {
    [modID]: {
      ...state[modID],
      controlData: {
        ...state[modID].controlData,
        [controlID]: {
          ...state[modID].controlData[controlID],
          value: newValue
        }
      }
    }
  })
}

export default updateControlValue