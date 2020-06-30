import { ContainerModules } from "../../stateTSTypes";
import { MoveContainerAction } from "../moduleTSTypes";

const moveContainer = (state: ContainerModules, { id, newRow, newCol }: MoveContainerAction) => {
  return Object.assign({}, state, {
    [id]: {
      ...state[id],
      row: newRow,
      col: newCol,
    }
  })
}

export default moveContainer