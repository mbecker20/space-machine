import { Modules } from "../../stateTSTypes";
import { MoveModuleAction } from "../moduleTSTypes";

const moveModule = (state: Modules, { id, newRow, newCol }: MoveModuleAction) => {
  return Object.assign({}, state, {
    [id]: {
      ...state[id],
      row: newRow,
      col: newCol,
    }
  })
}

export default moveModule